import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load environment variables
const envPath = path.join(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const envLines = envContent.split(/\r?\n/);
let supabaseUrl = "";
let serviceKey = "";
for (const line of envLines) {
  if (line.startsWith("NEXT_PUBLIC_SUPABASE_URL=")) supabaseUrl = line.split("=")[1].trim();
  if (line.startsWith("SUPABASE_SERVICE_ROLE_KEY=")) serviceKey = line.split("=")[1].trim();
}

const supabase = createClient(supabaseUrl, serviceKey);

// 1. All 24 Sports with male/female categories
const sports = [
  {
    id: "sp-badminton-m",
    name: "Badminton — Male",
    slug: "badminton-male",
    category: "Male",
    venue: "Main Gymnasium Badminton Courts",
    description: "High-paced men's badminton tournament featuring singles and doubles knockout brackets.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] BWF rules apply. 21-point sets, best of 3 games. Feather shuttles provided.",
    is_published: true,
    participation_limit: 32,
  },
  {
    id: "sp-badminton-f",
    name: "Badminton — Female",
    slug: "badminton-female",
    category: "Female",
    venue: "Main Gymnasium Court 2",
    description: "Women's singles and doubles tournament with tactical rallies and sharp net play.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] BWF rules apply. 21-point sets, best of 3 games.",
    is_published: true,
    participation_limit: 24,
  },
  {
    id: "sp-cricket-m",
    name: "Cricket — Male",
    slug: "cricket-male",
    category: "Male",
    venue: "UET Main Cricket Ground",
    description: "Super exciting tape-ball cricket championship under stadium floodlights.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] 8 overs per innings. Max 2 overs per bowler. Tape-ball tournament rules.",
    is_published: true,
    participation_limit: 16,
  },
  {
    id: "sp-cricket-f",
    name: "Cricket — Female",
    slug: "cricket-female",
    category: "Female",
    venue: "Ground B - Turf Pitch",
    description: "Fast-action tape ball female cricket clash.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] 6 overs per innings. Standard collegiate female tape-ball regulations.",
    is_published: true,
    participation_limit: 10,
  },
  {
    id: "sp-football-m",
    name: "Football — Male",
    slug: "football-male",
    category: "Male",
    venue: "UET Football Ground",
    description: "7v7 outdoor football showdown featuring the best department teams.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] 25 minutes per half. Rolling substitutions. Direct knockouts.",
    is_published: true,
    participation_limit: 16,
  },
  {
    id: "sp-football-f",
    name: "Football — Female",
    slug: "football-female",
    category: "Female",
    venue: "Synthetic Turf Court A",
    description: "5v5 Women's football championship played on synthetic turf.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] 15 minutes per half. 5 active players with up to 3 substitutes.",
    is_published: true,
    participation_limit: 8,
  },
  {
    id: "sp-basketball-m",
    name: "Basketball — Male",
    slug: "basketball-male",
    category: "Male",
    venue: "Basketball Court 1",
    description: "Full court competitive basketball tournament.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] 4 quarters of 8 minutes. FIBA standard collegiate rules.",
    is_published: true,
    participation_limit: 12,
  },
  {
    id: "sp-basketball-f",
    name: "Basketball — Female",
    slug: "basketball-female",
    category: "Female",
    venue: "Basketball Court 2",
    description: "Women's 3x3 half-court basketball showdown.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] 10-minute game or first to 21 points. Official 3x3 rules.",
    is_published: true,
    participation_limit: 8,
  },
  {
    id: "sp-table-tennis",
    name: "Table Tennis",
    slug: "table-tennis",
    category: "Mixed",
    venue: "Indoor Hall Table Tennis Arena",
    description: "Singles and doubles lightning-fast rallies on Olympic tables.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Best of 5 sets, 11 points each. ITTF approved bats and balls.",
    is_published: true,
    participation_limit: 32,
  },
  {
    id: "sp-ludo",
    name: "Ludo",
    slug: "ludo",
    category: "Open",
    venue: "Student Activity Center Hall",
    description: "Strategic classic board game battle. 4-player knockout tables.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Standard 4-color board rules. Strictly timed turns (15s).",
    is_published: true,
    participation_limit: 64,
  },
  {
    id: "sp-human-ludo",
    name: "Human Ludo",
    slug: "human-ludo",
    category: "Open",
    venue: "Central Amphitheatre Lawn",
    description: "Giant life-sized board where participants act as the tokens!",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Team coordinates movement on a giant checkered canvas.",
    is_published: true,
    participation_limit: 16,
  },
  {
    id: "sp-chess",
    name: "Chess",
    slug: "chess",
    category: "Open",
    venue: "CS Conference Library Room",
    description: "FIDE rated rapid chess matches with digital clocks.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] 10 min + 5s increment rapid chess. Touch-move strictly enforced.",
    is_published: true,
    participation_limit: 32,
  },
  {
    id: "sp-scavenger-hunt",
    name: "Scavenger Hunt",
    slug: "scavenger-hunt",
    category: "Mixed",
    venue: "Campus Wide & CS Dept Lawns",
    description: "Campus-wide riddle solving, clue tracking, and sprint challenges.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Teams of 4. First team to solve all 10 riddles and return with relics wins.",
    is_published: true,
    participation_limit: 20,
  },
  {
    id: "sp-tennis-ball-throw",
    name: "Tennis Ball Throw",
    slug: "tennis-ball-throw",
    category: "Open",
    venue: "Ground B Outfield",
    description: "Target accuracy and distance arm power challenge.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] 3 attempts per contestant. Distance and designated target hits recorded.",
    is_published: true,
    participation_limit: 40,
  },
  {
    id: "sp-race",
    name: "Race (100m & 200m)",
    slug: "race",
    category: "Mixed",
    venue: "Athletics Running Track",
    description: "Electrifying track sprint heats to find the fastest athlete on campus.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Photo-finish timed. 1 false start allowance before disqualification.",
    is_published: true,
    participation_limit: 50,
  },
  {
    id: "sp-sack-race",
    name: "Sack Race",
    slug: "sack-race",
    category: "Open",
    venue: "Main Athletics Grass Strip",
    description: "Classic sprint in burlap sacks. Pure balance, speed, and hilarity.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Contestants must remain inside the sack waist-high until crossing the line.",
    is_published: true,
    participation_limit: 30,
  },
  {
    id: "sp-arm-wrestling-m",
    name: "Arm Wrestling — Male",
    slug: "arm-wrestling-male",
    category: "Male",
    venue: "Gymnasium Stage",
    description: "Pure bicep, wrist, and forearm clash on an official padded tournament table.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Referees enforce strict wrist positioning and shoulder squareness.",
    is_published: true,
    participation_limit: 32,
  },
  {
    id: "sp-arm-wrestling-f",
    name: "Arm Wrestling — Female",
    slug: "arm-wrestling-female",
    category: "Female",
    venue: "Gymnasium Stage - Table 2",
    description: "Women's arm wrestling championship bracket.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Standard arm-wrestling safety rules apply.",
    is_published: true,
    participation_limit: 20,
  },
  {
    id: "sp-musical-chair",
    name: "Musical Chair",
    slug: "musical-chair",
    category: "Female",
    venue: "Department Courtyard",
    description: "Fast-reaction music stop challenge with eliminate-per-round format.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] No holding or dragging chairs. Unbiased audio control.",
    is_published: true,
    participation_limit: 40,
  },
  {
    id: "sp-weight",
    name: "Min/Max Weight",
    slug: "min-max-weight",
    category: "Open",
    venue: "Indoor Medical / Fitness Center",
    description: "Official weight measurement showcase and fun campus superlatives.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Calibrated digital scales. Certified measurement by sports committee.",
    is_published: true,
    participation_limit: 50,
  },
  {
    id: "sp-height",
    name: "Min/Max Height",
    slug: "min-max-height",
    category: "Open",
    venue: "Indoor Medical / Fitness Center",
    description: "Official stadiometer height measurement showcase.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Barefoot laser stadiometer measurement.",
    is_published: true,
    participation_limit: 50,
  },
  {
    id: "sp-blindfold",
    name: "Blindfold Obstacles",
    slug: "blindfold-obstacles",
    category: "Mixed",
    venue: "Obstacle Turf Arena",
    description: "Two-person team navigation course: one guide, one blindfolded runner.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Voice commands only. Touching obstacles adds 5-second penalties.",
    is_published: true,
    participation_limit: 25,
  },
  {
    id: "sp-tug-of-war-m",
    name: "Tug of War — Male",
    slug: "tug-of-war-male",
    category: "Male",
    venue: "Central Turf Arena",
    description: "Colossal strength battle. 8-member squads pulling on collegiate hemp rope.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] Best of 3 pulls. No cleats allowed. 3-meter line pull to victory.",
    is_published: true,
    participation_limit: 12,
  },
  {
    id: "sp-tug-of-war-f",
    name: "Tug of War — Female",
    slug: "tug-of-war-female",
    category: "Female",
    venue: "Central Turf Arena",
    description: "High-octane women's department tug of war battle.",
    rules_summary: "[NOTE: RN the rules are generic standard collegiate guidelines pending committee ratification.] 8-member squads. Best of 3 pulls.",
    is_published: true,
    participation_limit: 8,
  },
];

// 2. Leads Data with Access Codes
const leads = [
  { id: "l-ahmad", name: "Ahmad", is_contact_public: true, phone: "0300-1110001", email: "ahmad@uetcs.edu.pk" },
  { id: "l-anas-sahi", name: "Anas Sahi", is_contact_public: true, phone: "0300-1110002", email: "anas.sahi@uetcs.edu.pk" },
  { id: "l-huzayfa", name: "Huzayfa", is_contact_public: true, phone: "0300-1110003", email: "huzayfa@uetcs.edu.pk" },
  { id: "l-zainab-batool", name: "Zainab Batool", is_contact_public: true, phone: "0300-1110004", email: "zainab.batool@uetcs.edu.pk" },
  { id: "l-zainab-ishtiaq", name: "Zainab Ishtiaq", is_contact_public: true, phone: "0300-1110005", email: "zainab.ishtiaq@uetcs.edu.pk" },
  { id: "l-asad", name: "Asad", is_contact_public: true, phone: "0300-1110006", email: "asad@uetcs.edu.pk" },
  { id: "l-baksh", name: "Baksh", is_contact_public: true, phone: "0300-1110007", email: "baksh@uetcs.edu.pk" },
  { id: "l-gmd", name: "GMD", is_contact_public: true, phone: "0300-1110008", email: "gmd@uetcs.edu.pk" },
  { id: "l-ayesha-abbas", name: "Ayesha Abbas", is_contact_public: true, phone: "0300-1110009", email: "ayesha.abbas@uetcs.edu.pk" },
  { id: "l-furqan", name: "Furqan", is_contact_public: true, phone: "0300-1110010", email: "furqan@uetcs.edu.pk" },
  { id: "l-ayan", name: "Ayan", is_contact_public: true, phone: "0300-1110011", email: "ayan@uetcs.edu.pk" },
  { id: "l-saad-qaiser", name: "Saad Qaiser", is_contact_public: true, phone: "0300-1110012", email: "saad.qaiser@uetcs.edu.pk" },
  { id: "l-hannan", name: "Hannan", is_contact_public: true, phone: "0300-1110013", email: "hannan@uetcs.edu.pk" },
  { id: "l-ihtsham", name: "Ihtsham", is_contact_public: true, phone: "0300-1110014", email: "ihtsham@uetcs.edu.pk" },
  { id: "l-ahmad-cheema", name: "Ahmad Cheema", is_contact_public: true, phone: "0300-1110015", email: "ahmad.cheema@uetcs.edu.pk" },
  { id: "l-khadija", name: "Khadija", is_contact_public: true, phone: "0300-1110016", email: "khadija@uetcs.edu.pk" },
  { id: "l-amna-attique", name: "Amna Attique", is_contact_public: true, phone: "0300-1110017", email: "amna.attique@uetcs.edu.pk" },
  { id: "l-mateen", name: "Mateen", is_contact_public: true, phone: "0300-1110018", email: "mateen@uetcs.edu.pk" },
  { id: "l-umar", name: "Umar", is_contact_public: true, phone: "0300-1110019", email: "umar@uetcs.edu.pk" },
  { id: "l-essa", name: "Essa", is_contact_public: true, phone: "0300-1110020", email: "essa@uetcs.edu.pk" },
  { id: "l-mazhar", name: "Mazhar", is_contact_public: true, phone: "0300-1110021", email: "mazhar@uetcs.edu.pk" },
  { id: "l-salman-anas", name: "Salman Anas", is_contact_public: true, phone: "0300-1110022", email: "salman.anas@uetcs.edu.pk" },
  { id: "l-ahmed-affendi", name: "Ahmed Affendi", is_contact_public: true, phone: "0300-1110023", email: "ahmed.affendi@uetcs.edu.pk" },
  { id: "l-ali-zahid", name: "Ali Zahid", is_contact_public: true, phone: "0300-1110024", email: "ali.zahid@uetcs.edu.pk" },
  { id: "l-laiba-younas", name: "Laiba Younas", is_contact_public: true, phone: "0300-1110025", email: "laiba.younas@uetcs.edu.pk" },
  { id: "l-mutaf", name: "Mutaf", is_contact_public: true, phone: "0300-1110026", email: "mutaf@uetcs.edu.pk" },
  { id: "l-saad", name: "Saad", is_contact_public: true, phone: "0300-1110027", email: "saad@uetcs.edu.pk" },
  { id: "l-tasawar-ali", name: "Tasawar Ali", is_contact_public: true, phone: "0300-1110028", email: "tasawar.ali@uetcs.edu.pk" },
  { id: "l-laiba", name: "Laiba", is_contact_public: true, phone: "0300-1110029", email: "laiba@uetcs.edu.pk" },
  { id: "l-noor-fatima", name: "Noor Fatima", is_contact_public: true, phone: "0300-1110030", email: "noor.fatima@uetcs.edu.pk" },
  { id: "l-anas-sabir", name: "Anas Sabir", is_contact_public: true, phone: "0300-1110031", email: "anas.sabir@uetcs.edu.pk" },
];

// 3. Sport Leads Mapping
const sportLeads = [
  { id: "sl-1", sport_id: "sp-badminton-m", lead_id: "l-ahmad" },
  { id: "sl-2", sport_id: "sp-badminton-m", lead_id: "l-anas-sahi" },
  { id: "sl-3", sport_id: "sp-badminton-m", lead_id: "l-huzayfa" },
  { id: "sl-4", sport_id: "sp-badminton-f", lead_id: "l-zainab-batool" },
  { id: "sl-5", sport_id: "sp-badminton-f", lead_id: "l-zainab-ishtiaq" },
  { id: "sl-6", sport_id: "sp-cricket-m", lead_id: "l-asad" },
  { id: "sl-7", sport_id: "sp-cricket-m", lead_id: "l-baksh" },
  { id: "sl-8", sport_id: "sp-cricket-m", lead_id: "l-gmd" },
  { id: "sl-9", sport_id: "sp-cricket-f", lead_id: "l-ayesha-abbas" },
  { id: "sl-10", sport_id: "sp-football-m", lead_id: "l-furqan" },
  { id: "sl-11", sport_id: "sp-football-m", lead_id: "l-ayan" },
  { id: "sl-12", sport_id: "sp-football-m", lead_id: "l-saad-qaiser" },
  { id: "sl-13", sport_id: "sp-football-m", lead_id: "l-hannan" },
  { id: "sl-14", sport_id: "sp-football-f", lead_id: "l-zainab-batool" },
  { id: "sl-15", sport_id: "sp-basketball-m", lead_id: "l-ihtsham" },
  { id: "sl-16", sport_id: "sp-basketball-m", lead_id: "l-ahmad-cheema" },
  { id: "sl-17", sport_id: "sp-basketball-f", lead_id: "l-khadija" },
  { id: "sl-18", sport_id: "sp-basketball-f", lead_id: "l-amna-attique" },
  { id: "sl-19", sport_id: "sp-table-tennis", lead_id: "l-mateen" },
  { id: "sl-20", sport_id: "sp-table-tennis", lead_id: "l-umar" },
  { id: "sl-21", sport_id: "sp-ludo", lead_id: "l-essa" },
  { id: "sl-22", sport_id: "sp-human-ludo", lead_id: "l-mazhar" },
  { id: "sl-23", sport_id: "sp-chess", lead_id: "l-salman-anas" },
  { id: "sl-24", sport_id: "sp-chess", lead_id: "l-ahmed-affendi" },
  { id: "sl-25", sport_id: "sp-scavenger-hunt", lead_id: "l-ali-zahid" },
  { id: "sl-26", sport_id: "sp-scavenger-hunt", lead_id: "l-laiba-younas" },
  { id: "sl-27", sport_id: "sp-tennis-ball-throw", lead_id: "l-gmd" },
  { id: "sl-28", sport_id: "sp-race", lead_id: "l-umar" },
  { id: "sl-29", sport_id: "sp-race", lead_id: "l-mutaf" },
  { id: "sl-30", sport_id: "sp-sack-race", lead_id: "l-umar" },
  { id: "sl-31", sport_id: "sp-sack-race", lead_id: "l-saad" },
  { id: "sl-32", sport_id: "sp-arm-wrestling-m", lead_id: "l-tasawar-ali" },
  { id: "sl-33", sport_id: "sp-musical-chair", lead_id: "l-laiba" },
  { id: "sl-34", sport_id: "sp-musical-chair", lead_id: "l-noor-fatima" },
  { id: "sl-35", sport_id: "sp-blindfold", lead_id: "l-laiba" },
  { id: "sl-36", sport_id: "sp-blindfold", lead_id: "l-noor-fatima" },
  { id: "sl-37", sport_id: "sp-tug-of-war-m", lead_id: "l-anas-sabir" },
];

// 4. Clearly designated generic rules
const rules = [
  {
    id: "r-gen-notice",
    sport_id: null,
    title: "[NOTICE] Generic Tournament Rules Status",
    category: "General",
    content: "RN the rules displayed across all disciplines are generic baseline competition standards. Detailed sport-specific guidelines and tie-breaker mechanics are subject to formal ratification during the team captains briefing.",
    order_index: 0,
    is_published: true,
  },
  {
    id: "r-gen-1",
    sport_id: null,
    title: "General Eligibility & University ID Verification",
    category: "Eligibility",
    content: "[NOTE: RN the rules are generic standard collegiate regulations.] All participants must be active students of the University of Engineering & Technology, Lahore. Valid student university registration cards must be produced prior to each fixture.",
    order_index: 1,
    is_published: true,
  },
  {
    id: "r-gen-2",
    sport_id: null,
    title: "Code of Sportsmanship & Fair Play",
    category: "Penalties",
    content: "[NOTE: RN the rules are generic standard collegiate regulations.] Unsportsmanlike conduct, verbal abuse toward referees/marshals, or intentional misconduct will result in immediate match forfeit and referral to the university disciplinary committee.",
    order_index: 2,
    is_published: true,
  },
  {
    id: "r-gen-3",
    sport_id: null,
    title: "Championship Medal Scoring Multipliers",
    category: "Scoring",
    content: "[NOTE: RN the rules are generic standard collegiate regulations.] Points system default: Gold = 10 pts, Silver = 6 pts, Bronze = 4 pts. Leaderboards rank by total points, then gold finishes, silver finishes, and bronze finishes.",
    order_index: 3,
    is_published: true,
  },
  {
    id: "r-cricket-1",
    sport_id: "sp-cricket-m",
    title: "Cricket Tape-Ball Match Guidelines",
    category: "Male",
    content: "[NOTE: RN the rules are generic standard collegiate regulations.] Each team fields 8 players. Matches are 8 overs per side. A maximum of 2 overs per bowler. Leg-before-wicket (LBW) is not applicable; chucking/throwing is strictly penalized.",
    order_index: 4,
    is_published: true,
  },
  {
    id: "r-badminton-1",
    sport_id: "sp-badminton-m",
    title: "Badminton Court Code",
    category: "Male",
    content: "[NOTE: RN the rules are generic standard collegiate regulations.] All matches are played on a rally-point system (21 points, best of 3). Shoes with non-marking soles are mandatory inside the main gymnasium.",
    order_index: 5,
    is_published: true,
  },
];

// 5. Sessions
const sessions = [
  { id: "s-2023", name: "2023", slug: "2023", start_date: "2023-11-15", end_date: "2023-11-17", is_active: false, is_historical: true },
  { id: "s-2024", name: "2024", slug: "2024", start_date: "2024-11-12", end_date: "2024-11-14", is_active: false, is_historical: true },
  { id: "s-2025", name: "2025", slug: "2025", start_date: "2025-02-10", end_date: "2025-02-12", is_active: false, is_historical: true },
  { id: "s-fall-2025", name: "Fall 2025", slug: "fall-2025", start_date: "2025-11-05", end_date: "2025-11-07", is_active: false, is_historical: true },
  { id: "s-spring-2026", name: "Spring 2026", slug: "spring-2026", start_date: "2026-03-18", end_date: "2026-03-20", is_active: false, is_historical: true },
  { id: "s-fall-2026", name: "Fall 2026 (Current)", slug: "fall-2026", start_date: "2026-12-03", end_date: "2026-12-04", is_active: true, is_historical: false },
];

async function seed() {
  console.log("🚀 Seeding Supabase database tables...");

  // Insert/Upsert Sessions
  const { error: errSessions } = await supabase.from("sessions").upsert(sessions);
  if (errSessions) console.error("Error inserting sessions:", errSessions.message);
  else console.log("✓ Sessions seeded successfully (6 sessions).");

  // Insert/Upsert Leads
  const { error: errLeads } = await supabase.from("leads").upsert(leads);
  if (errLeads) console.error("Error inserting leads:", errLeads.message);
  else console.log(`✓ Leads seeded successfully (${leads.length} leads).`);

  // Insert/Upsert Sports
  const { error: errSports } = await supabase.from("sports").upsert(sports);
  if (errSports) console.error("Error inserting sports:", errSports.message);
  else console.log(`✓ Sports seeded successfully (${sports.length} disciplines).`);

  // Insert/Upsert Sport Leads
  const { error: errSportLeads } = await supabase.from("sport_leads").upsert(sportLeads);
  if (errSportLeads) console.error("Error inserting sport_leads:", errSportLeads.message);
  else console.log(`✓ Sport lead assignments seeded (${sportLeads.length} mappings).`);

  // Insert/Upsert Rules (with generic notice)
  const { error: errRules } = await supabase.from("rules").upsert(rules);
  if (errRules) console.error("Error inserting rules:", errRules.message);
  else console.log(`✓ Rules seeded successfully with generic notice (${rules.length} rules).`);

  // Insert Event Settings
  const { error: errSettings } = await supabase.from("event_settings").upsert({
    id: "main",
    event_name: "UET CS Sports Gala 2026",
    primary_tagline: "BUILT TO COMPETE. BORN TO WIN.",
    supporting_tagline: "ONE CAMPUS. COUNTLESS COMPETITORS. ONE CHAMPIONSHIP.",
    event_dates: "December 3–4, 2026",
    venue: "UET Main Sports Complex, Lahore",
    is_registration_open: true,
  });
  if (errSettings) console.error("Error inserting event settings:", errSettings.message);
  else console.log("✓ Event settings seeded successfully.");

  console.log("🎉 All 24 sports, leads, and generic rules successfully entered into Supabase!");
}

seed();
