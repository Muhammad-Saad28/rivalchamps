export interface Session {
  id: string;
  name: string;
  slug: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_historical: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  account_no?: string; // Sensitive/Private
  is_contact_public: boolean;
  access_code?: string; // Secret portal code for the Lead to log into their specific sport dashboard
}

export interface SportLead {
  sport_id: string;
  lead_id: string;
}

export interface Sport {
  id: string;
  name: string;
  slug: string;
  category: "Male" | "Female" | "Mixed" | "Open";
  description: string;
  venue: string;
  rules_summary?: string;
  image_url?: string;
  is_published: boolean;
  participation_limit: number;
}

export interface Rule {
  id: string;
  sport_id: string | null; // null = General Event Rules
  title: string;
  category: "General" | "Male" | "Female" | "Eligibility" | "Penalties" | "Scoring";
  content: string;
  order_index: number;
  is_published: boolean;
}

export interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "email" | "tel" | "select" | "checkbox";
  options?: string[];
  required: boolean;
}

export interface DynamicForm {
  id: string;
  sport_id: string;
  title: string;
  description: string;
  is_active: boolean;
  deadline?: string;
  fields: FormField[];
  version: number;
}

export interface Registration {
  id: string;
  form_id: string;
  session_id: string;
  sport_id: string;
  team_name?: string;
  captain_name: string;
  captain_reg_no: string;
  department: string;
  semester: string;
  contact_number: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
  submitted_at: string;
  answers?: Record<string, string>;
}

export interface Competition {
  id: string;
  session_id: string;
  sport_id: string;
  category: string;
  title: string;
  round?: "Quarter Final" | "Semi Final" | "Final" | "Group Stage" | "Round 1";
  match_date: string;
  venue: string;
  status: "Upcoming" | "Live" | "Completed" | "Postponed" | "Cancelled";
  team_a?: string;
  team_b?: string;
  score_a?: string;
  score_b?: string;
  result_details?: string;
  live_commentary?: string[];
}

export interface CompetitionResult {
  id: string;
  competition_id: string;
  session_id: string;
  sport_id: string;
  first_place: string;
  second_place?: string;
  third_place?: string;
  metric_type: "Points" | "Goals" | "Time" | "Distance";
  metric_value?: string;
  is_published: boolean;
  published_at?: string;
}

export interface LeaderboardEntry {
  id: string;
  session_id: string;
  competitor_name: string;
  department: string;
  total_points: number;
  gold_count: number;
  silver_count: number;
  bronze_count: number;
  matches_played: number;
  wins: number;
}

export interface ScoringSettings {
  gold_points: number;
  silver_points: number;
  bronze_points: number;
  participation_points: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  tag: "General" | "Urgent" | "Schedule" | "Results" | "Registration";
  is_pinned: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details: string;
  created_at: string;
}

export interface EventSettings {
  event_name: string;
  primary_tagline: string;
  supporting_tagline: string;
  event_dates: string;
  venue: string;
  is_registration_open: boolean;
  admin_account_notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  sport_id?: string;
  session_name: string;
  image_url: string;
  category: string;
}
