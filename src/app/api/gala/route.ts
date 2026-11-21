import { NextResponse } from "next/server";
import { fetchFromDatabase, logAudit } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthenticated, getLeadSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get("entity");
    const db = await fetchFromDatabase();
    const isAdmin = await isAuthenticated();
    const leadSession = await getLeadSession();

    // Check if lead portal query
    if (entity === "lead-portal") {
      if (!leadSession && !isAdmin) {
        return NextResponse.json({ error: "Unauthorized access: Lead login required" }, { status: 401 });
      }

      const currentLeadId = leadSession ? leadSession.leadId : db.leads[0]?.id;
      const currentLead = db.leads.find((l) => l.id === currentLeadId);
      const mySports = db.sports.filter((s) => s.leadIds?.includes(currentLeadId));
      const mySportIds = mySports.map((s) => s.id);

      const myCompetitions = db.competitions.filter((c) => mySportIds.includes(c.sport_id));
      const myRegistrations = db.registrations.filter((r) => mySportIds.includes(r.sport_id));
      const myRules = db.rules.filter((r) => r.sport_id && mySportIds.includes(r.sport_id));

      return NextResponse.json({
        lead: currentLead,
        sports: mySports,
        competitions: myCompetitions,
        registrations: myRegistrations,
        rules: myRules,
      });
    }

    // Protect private lead details (account numbers) for non-authenticated public users
    const safeLeads = db.leads.map((l) => {
      if (isAdmin) return l;
      return {
        id: l.id,
        name: l.name,
        phone: l.is_contact_public ? l.phone : undefined,
        email: l.is_contact_public ? l.email : undefined,
        is_contact_public: l.is_contact_public,
      };
    });

    if (entity === "sports") return NextResponse.json(db.sports.filter(s => isAdmin || s.is_published));
    if (entity === "leads") return NextResponse.json(safeLeads);
    if (entity === "sessions") return NextResponse.json(db.sessions);
    if (entity === "rules") return NextResponse.json(db.rules.filter(r => isAdmin || r.is_published));
    if (entity === "competitions") return NextResponse.json(db.competitions);
    if (entity === "announcements") return NextResponse.json(db.announcements);
    if (entity === "leaderboards") return NextResponse.json(db.leaderboards);
    if (entity === "gallery") return NextResponse.json(db.gallery || []);
    if (entity === "eventSettings") {
      const s = { ...db.eventSettings };
      if (!isAdmin) delete s.admin_account_notes;
      return NextResponse.json(s);
    }
    if (entity === "scoringSettings") return NextResponse.json(db.scoringSettings);
    if (entity === "forms") return NextResponse.json(db.forms.filter(f => isAdmin || f.is_active));

    // Admin protected entities
    if (entity === "registrations" || entity === "auditLogs") {
      if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
      }
      return NextResponse.json(db[entity]);
    }

    // Return public bundle directly from live database
    return NextResponse.json({
      sessions: db.sessions,
      sports: db.sports.filter(s => isAdmin || s.is_published),
      leads: safeLeads,
      rules: db.rules.filter(r => isAdmin || r.is_published),
      competitions: db.competitions,
      announcements: db.announcements,
      leaderboards: db.leaderboards,
      gallery: db.gallery || [],
      eventSettings: {
        ...db.eventSettings,
        admin_account_notes: isAdmin ? db.eventSettings.admin_account_notes : undefined,
      },
      scoringSettings: db.scoringSettings,
      forms: db.forms.filter(f => isAdmin || f.is_active),
    });
  } catch (error) {
    console.error("Fetch data error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await isAuthenticated();
    const leadSession = await getLeadSession();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const db = await fetchFromDatabase();

    // 1. Public Registration Submission
    if (action === "submit-registration") {
      const body = await request.json();
      if (!body.captain_name || !body.captain_reg_no || !body.sport_id) {
        return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
      }

      const activeSession = db.sessions.find(s => s.is_active) || db.sessions[0];
      const newReg = {
        id: `reg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        form_id: body.form_id || "default",
        session_id: activeSession ? activeSession.id : "s-fall-2026",
        sport_id: body.sport_id,
        team_name: body.team_name || "Individual",
        captain_name: body.captain_name,
        captain_reg_no: body.captain_reg_no,
        department: body.department || "Computer Science",
        semester: body.semester || "1st",
        contact_number: body.contact_number || "",
        email: body.email || "",
        status: "Pending",
        submitted_at: new Date().toISOString(),
      };

      const { error: insErr } = await supabaseAdmin.from("registrations").insert(newReg);
      if (insErr) {
        console.error("Insert registration error", insErr);
        return NextResponse.json({ error: insErr.message }, { status: 500 });
      }

      logAudit("NEW_REGISTRATION", "REGISTRATION", `New registration submitted for ${newReg.team_name} in sport ${body.sport_id}`, newReg.id);

      return NextResponse.json({ success: true, registration: newReg });
    }

    // 2. LEAD ACTIONS (Authorized either by Admin OR Lead assigned to that sport)
    if (action === "lead-update-score") {
      if (!isAdmin && !leadSession) {
        return NextResponse.json({ error: "Unauthorized access: Lead or Admin login required" }, { status: 401 });
      }

      const { competitionId, score_a, score_b, status, commentary, winner } = await request.json();
      const comp = db.competitions.find((c) => c.id === competitionId);
      if (!comp) {
        return NextResponse.json({ error: "Competition not found" }, { status: 404 });
      }

      // Check lead ownership if not admin
      if (!isAdmin && leadSession) {
        const sportObj = db.sports.find((s) => s.id === comp.sport_id);
        if (!sportObj?.leadIds?.includes(leadSession.leadId)) {
          return NextResponse.json({ error: "You are not an assigned lead for this sport." }, { status: 403 });
        }
      }

      const updates: any = {
        score_a,
        score_b,
        status,
      };
      if (winner) {
        updates.result_details = `Winner: ${winner}`;
      }

      const { error: compErr } = await supabaseAdmin.from("competitions").update(updates).eq("id", competitionId);
      if (compErr) {
        return NextResponse.json({ error: compErr.message }, { status: 500 });
      }

      const operatorName = isAdmin ? "Administrator" : `Lead ${leadSession?.leadName}`;
      logAudit("SCORE_UPDATED", "COMPETITION", `${operatorName} updated score for ${comp.title}: ${score_a} - ${score_b} (${status})`, comp.id);

      return NextResponse.json({ success: true });
    }

    if (action === "lead-update-registration") {
      if (!isAdmin && !leadSession) {
        return NextResponse.json({ error: "Unauthorized access: Lead or Admin login required" }, { status: 401 });
      }

      const { registrationId, status } = await request.json();
      const reg = db.registrations.find((r) => r.id === registrationId);
      if (!reg) {
        return NextResponse.json({ error: "Registration not found" }, { status: 404 });
      }

      if (!isAdmin && leadSession) {
        const sportObj = db.sports.find((s) => s.id === reg.sport_id);
        if (!sportObj?.leadIds?.includes(leadSession.leadId)) {
          return NextResponse.json({ error: "You are not an assigned lead for this sport." }, { status: 403 });
        }
      }

      await supabaseAdmin.from("registrations").update({ status }).eq("id", registrationId);
      const operatorName = isAdmin ? "Administrator" : `Lead ${leadSession?.leadName}`;
      logAudit("REGISTRATION_VERIFIED", "REGISTRATION", `${operatorName} marked registration ${reg.team_name} as ${status}`, reg.id);

      return NextResponse.json({ success: true });
    }

    // 3. ADMIN-ONLY OPERATIONS
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized access: Admin authentication required" }, { status: 401 });
    }

    const { entity, data } = await request.json();

    if (action === "update-sport") {
      const { leadIds, ...sportPayload } = data;
      await supabaseAdmin.from("sports").upsert(sportPayload);
      if (Array.isArray(leadIds)) {
        await supabaseAdmin.from("sport_leads").delete().eq("sport_id", data.id);
        for (const lId of leadIds) {
          await supabaseAdmin.from("sport_leads").insert({
            id: `sl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            sport_id: data.id,
            lead_id: lId,
          });
        }
      }
      logAudit("UPDATE_SPORT", "SPORT", `Updated sport: ${data.name}`, data.id);
      return NextResponse.json({ success: true });
    }

    if (action === "delete-sport") {
      await supabaseAdmin.from("sports").delete().eq("id", data.id);
      logAudit("DELETE_SPORT", "SPORT", `Deleted sport ID: ${data.id}`, data.id);
      return NextResponse.json({ success: true });
    }

    if (action === "update-lead") {
      await supabaseAdmin.from("leads").upsert(data);
      logAudit("UPDATE_LEAD", "LEAD", `Updated lead: ${data.name}`, data.id);
      return NextResponse.json({ success: true });
    }

    if (action === "delete-lead") {
      await supabaseAdmin.from("leads").delete().eq("id", data.id);
      logAudit("DELETE_LEAD", "LEAD", `Deleted lead ID: ${data.id}`, data.id);
      return NextResponse.json({ success: true });
    }

    if (action === "update-rule") {
      await supabaseAdmin.from("rules").upsert(data);
      logAudit("UPDATE_RULE", "RULE", `Updated rule: ${data.title}`, data.id);
      return NextResponse.json({ success: true });
    }

    if (action === "delete-rule") {
      await supabaseAdmin.from("rules").delete().eq("id", data.id);
      logAudit("DELETE_RULE", "RULE", `Deleted rule ID: ${data.id}`, data.id);
      return NextResponse.json({ success: true });
    }

    if (action === "update-competition") {
      await supabaseAdmin.from("competitions").upsert(data);
      logAudit("UPDATE_COMPETITION", "COMPETITION", `Updated competition: ${data.title} (${data.status})`, data.id);
      return NextResponse.json({ success: true });
    }

    if (action === "update-registration-status") {
      await supabaseAdmin.from("registrations").update({ status: data.status }).eq("id", data.id);
      logAudit("REGISTRATION_STATUS_CHANGED", "REGISTRATION", `Marked registration ${data.id} as ${data.status}`, data.id);
      return NextResponse.json({ success: true });
    }

    if (action === "update-settings") {
      await supabaseAdmin.from("event_settings").upsert({ id: "main", ...data });
      logAudit("UPDATE_EVENT_SETTINGS", "SETTINGS", "Updated global event branding and settings");
      return NextResponse.json({ success: true });
    }

    if (action === "create-session") {
      const newSession = {
        ...data,
        id: `s-${Date.now()}`,
        slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      };
      await supabaseAdmin.from("sessions").insert(newSession);
      logAudit("CREATE_SESSION", "SESSION", `Created new sports gala edition: ${newSession.name}`, newSession.id);
      return NextResponse.json({ success: true, session: newSession });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Mutation error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
