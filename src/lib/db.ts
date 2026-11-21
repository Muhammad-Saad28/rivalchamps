import { supabaseAdmin, supabasePublic } from "@/lib/supabase";
import { 
  Session, 
  Lead, 
  Sport, 
  Rule, 
  Competition, 
  LeaderboardEntry, 
  Announcement, 
  EventSettings, 
  ScoringSettings, 
  DynamicForm, 
  Registration, 
  AuditLog, 
  GalleryItem 
} from "@/types";

export interface DBStore {
  sessions: Session[];
  leads: Lead[];
  sports: (Sport & { leadIds: string[] })[];
  rules: Rule[];
  competitions: Competition[];
  leaderboards: LeaderboardEntry[];
  announcements: Announcement[];
  eventSettings: EventSettings;
  scoringSettings: ScoringSettings;
  forms: DynamicForm[];
  registrations: Registration[];
  auditLogs: AuditLog[];
  gallery: GalleryItem[];
}

export async function fetchFromDatabase(): Promise<DBStore> {
  try {
    const [
      { data: sportsData },
      { data: leadsData },
      { data: sportLeadsData },
      { data: rulesData },
      { data: sessionsData },
      { data: competitionsData },
      { data: registrationsData },
      { data: settingsData },
      { data: leaderboardsData },
      { data: announcementsData },
      { data: auditLogsData }
    ] = await Promise.all([
      supabaseAdmin.from("sports").select("*"),
      supabaseAdmin.from("leads").select("*"),
      supabaseAdmin.from("sport_leads").select("*"),
      supabaseAdmin.from("rules").select("*"),
      supabaseAdmin.from("sessions").select("*"),
      supabaseAdmin.from("competitions").select("*"),
      supabaseAdmin.from("registrations").select("*"),
      supabaseAdmin.from("event_settings").select("*").limit(1).maybeSingle(),
      supabaseAdmin.from("leaderboard_entries").select("*"),
      supabaseAdmin.from("announcements").select("*"),
      supabaseAdmin.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(200),
    ]);

    // Map sport leads into sport.leadIds
    const mappedSports = (sportsData || []).map((sport) => {
      const assignedLeadIds = (sportLeadsData || [])
        .filter((sl: any) => sl.sport_id === sport.id)
        .map((sl: any) => sl.lead_id);
      return {
        ...sport,
        leadIds: assignedLeadIds,
      };
    });

    const defaultSettings: EventSettings = settingsData || {
      event_name: "UET CS Sports Gala 2026",
      primary_tagline: "BUILT TO COMPETE. BORN TO WIN.",
      supporting_tagline: "ONE CAMPUS. COUNTLESS COMPETITORS. ONE CHAMPIONSHIP.",
      event_dates: "December 3–4, 2026",
      venue: "UET Main Sports Complex, Lahore",
      is_registration_open: true,
    };

    return {
      sports: mappedSports,
      leads: leadsData || [],
      rules: (rulesData || []).sort((a: any, b: any) => a.order_index - b.order_index),
      sessions: sessionsData || [],
      competitions: competitionsData || [],
      registrations: (registrationsData || []).sort((a: any, b: any) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()),
      leaderboards: leaderboardsData || [],
      announcements: announcementsData || [],
      eventSettings: defaultSettings,
      scoringSettings: { gold_points: 10, silver_points: 6, bronze_points: 4, participation_points: 0 },
      forms: [],
      auditLogs: auditLogsData || [],
      gallery: [],
    };
  } catch (error) {
    console.error("Database fetch error:", error);
    return {
      sports: [],
      leads: [],
      rules: [],
      sessions: [],
      competitions: [],
      registrations: [],
      leaderboards: [],
      announcements: [],
      eventSettings: {
        event_name: "UET CS Sports Gala 2026",
        primary_tagline: "BUILT TO COMPETE. BORN TO WIN.",
        supporting_tagline: "ONE CAMPUS. COUNTLESS COMPETITORS. ONE CHAMPIONSHIP.",
        event_dates: "December 3–4, 2026",
        venue: "UET Main Sports Complex, Lahore",
        is_registration_open: true,
      },
      scoringSettings: { gold_points: 10, silver_points: 6, bronze_points: 4, participation_points: 0 },
      forms: [],
      auditLogs: [],
      gallery: [],
    };
  }
}

export async function logAudit(action: string, entity_type: string, details: string, entity_id?: string) {
  try {
    await supabaseAdmin.from("audit_logs").insert({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      action,
      entity_type,
      entity_id,
      details,
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Audit log error:", err);
  }
}
