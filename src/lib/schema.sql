-- Supabase PostgreSQL Schema for UET CS Sports Gala 2026 Management Platform
-- Run in Supabase SQL Editor if connecting directly to Supabase

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    is_historical BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    account_no TEXT, -- Private event administration details
    is_contact_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sports (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'Mixed', -- Male, Female, Mixed, Open
    venue TEXT,
    rules_summary TEXT,
    image_url TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    participation_limit INT DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sport_leads (
    id TEXT PRIMARY KEY,
    sport_id TEXT REFERENCES sports(id) ON DELETE CASCADE,
    lead_id TEXT REFERENCES leads(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'Lead'
);

CREATE TABLE IF NOT EXISTS rules (
    id TEXT PRIMARY KEY,
    sport_id TEXT REFERENCES sports(id) ON DELETE SET NULL, -- NULL = General competition rules
    title TEXT NOT NULL,
    category TEXT DEFAULT 'General', -- General, Male, Female, Eligibility, Penalties
    content TEXT NOT NULL,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forms (
    id TEXT PRIMARY KEY,
    sport_id TEXT REFERENCES sports(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    deadline TIMESTAMP WITH TIME ZONE,
    version INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS form_fields (
    id TEXT PRIMARY KEY,
    form_id TEXT REFERENCES forms(id) ON DELETE CASCADE,
    field_label TEXT NOT NULL,
    field_type TEXT NOT NULL, -- text, email, tel, number, select, checkbox
    options JSONB, -- For select/radio dropdown items
    is_required BOOLEAN DEFAULT TRUE,
    order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS registrations (
    id TEXT PRIMARY KEY,
    form_id TEXT REFERENCES forms(id) ON DELETE CASCADE,
    session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE,
    sport_id TEXT REFERENCES sports(id) ON DELETE CASCADE,
    team_name TEXT,
    captain_name TEXT NOT NULL,
    captain_reg_no TEXT NOT NULL,
    department TEXT NOT NULL DEFAULT 'Computer Science',
    semester TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    email TEXT NOT NULL,
    status TEXT DEFAULT 'Pending', -- Pending, Approved, Rejected
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS registration_answers (
    id TEXT PRIMARY KEY,
    registration_id TEXT REFERENCES registrations(id) ON DELETE CASCADE,
    field_id TEXT REFERENCES form_fields(id) ON DELETE CASCADE,
    answer TEXT
);

CREATE TABLE IF NOT EXISTS competitions (
    id TEXT PRIMARY KEY,
    session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE,
    sport_id TEXT REFERENCES sports(id) ON DELETE CASCADE,
    category TEXT DEFAULT 'Open',
    title TEXT NOT NULL,
    match_date TIMESTAMP WITH TIME ZONE,
    venue TEXT,
    status TEXT DEFAULT 'Upcoming', -- Upcoming, Live, Completed, Postponed, Cancelled
    team_a TEXT,
    team_b TEXT,
    score_a TEXT,
    score_b TEXT,
    result_details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS results (
    id TEXT PRIMARY KEY,
    competition_id TEXT REFERENCES competitions(id) ON DELETE CASCADE,
    session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE,
    sport_id TEXT REFERENCES sports(id) ON DELETE CASCADE,
    first_place TEXT,
    second_place TEXT,
    third_place TEXT,
    metric_type TEXT DEFAULT 'Points', -- Points, Goals, Time, Distance
    metric_value TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS scoring_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    gold_points INT DEFAULT 10,
    silver_points INT DEFAULT 6,
    bronze_points INT DEFAULT 4,
    participation_points INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leaderboard_entries (
    id TEXT PRIMARY KEY,
    session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE,
    competitor_name TEXT NOT NULL,
    department TEXT DEFAULT 'Computer Science',
    total_points INT DEFAULT 0,
    gold_count INT DEFAULT 0,
    silver_count INT DEFAULT 0,
    bronze_count INT DEFAULT 0,
    matches_played INT DEFAULT 0,
    wins INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS announcements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tag TEXT DEFAULT 'General',
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_settings (
    id TEXT PRIMARY KEY DEFAULT 'main',
    event_name TEXT DEFAULT 'UET CS Sports Gala 2026',
    primary_tagline TEXT DEFAULT 'BUILT TO COMPETE. BORN TO WIN.',
    supporting_tagline TEXT DEFAULT 'ONE CAMPUS. COUNTLESS COMPETITORS. ONE CHAMPIONSHIP.',
    event_dates TEXT DEFAULT 'December 3–4, 2026',
    venue TEXT DEFAULT 'UET Main Sports Complex, Lahore',
    is_registration_open BOOLEAN DEFAULT TRUE,
    admin_account_notes TEXT, -- Confidential admin notes / account numbers
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
