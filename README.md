# UET CS Sports Gala 2026 — Central Management & Championship Platform

A modern, production-grade university championship and event management platform built for the **Department of Computer Science, University of Engineering and Technology (UET), Lahore**.

---

## 🏆 Key Features

### 1. Public Championship Experience
- **Cinematic Homepage**: Arena Navy & Championship Blue Modern Arena identity with live countdown clock targeting **December 3–4, 2026**.
- **24 Sports Disciplines Directory**: Dynamic roster featuring official sports, male/female categories, venues, capacity limits, and assigned student coordinators (`/sports`).
- **Database-Driven Rules**: Searchable and filterable athletic guidelines, university eligibility verification bylaws, scoring criteria, and misconduct penalties (`/rules`).
- **Historical Leaderboards & Hall of Fame**:
  - Independent statistical records across **6 editions** (2023, 2024, 2025, Fall 2025, Spring 2026, Fall 2026).
  - Deterministic ranking: Total Points $\rightarrow$ Gold $\rightarrow$ Silver $\rightarrow$ Bronze.
  - Interactive **Session Comparison**: Compare standing differences between any two historical seasons (`/leaderboard`).
- **Schedule & Verified Results**: Real-time fixture tracking with clear state distinction (`Upcoming`, `Live`, `Completed`, `Postponed`, `Cancelled`) (`/schedule`).
- **Dynamic Registration Portal**: Configurable online squad & individual participant enrollment with verification pass IDs (`/registration`).
- **Announcements**: Pinned notices, captain meeting alerts, and schedule changes broadcast on the homepage and across the site.

---

### 2. Private Administrator Control Panel (`/admin/dashboard`)
Accessible via the **Admin Panel** button in the main navigation.

- **Authentication**: Single-admin server-side session authentication with JWT and bcrypt password verification (`/admin/login`).
- **Sports Management**: Add, edit, or archive sports; reassign venues, participation caps, and categories.
- **Centralized Lead Directory**: Central management of student leads and marshals.
  - Supports assigning leads to multiple sports.
  - Visibility controls: sensitive bank/account numbers remain strictly confidential.
- **Rule Editor**: Draft and publish rules categorized into General, Male, Female, Eligibility, Penalties, and Scoring.
- **Registrations Review**: Inspect submitted squad credentials, approve/reject participants, and track team status.
- **Match Fixtures & Live Scores**: Enter team scores, live status, and final outcomes.
- **Session Manager**: Initialize future sports gala editions (e.g. Spring 2027) without code modifications.
- **Medal Points Multipliers**: Configurable points system (Gold: 10, Silver: 6, Bronze: 4, Participation: 0) with automatic leaderboard recalculation.
- **Immutable Audit Trail**: Chronological event logs tracking every administrative mutation.

---

## 🛠 Technology Stack
- **Framework**: Next.js (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS (Modern Arena hybrid design)
- **Icons**: Lucide React
- **Database**: File-persisted PostgreSQL-compatible schema (`data/db.json` & `src/lib/schema.sql` for Supabase)
- **Security**: `jose` (JWT) & `bcryptjs`

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Default Administrator Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@uetcs.edu.pk`
- **Password**: `adminPassword2026!`
