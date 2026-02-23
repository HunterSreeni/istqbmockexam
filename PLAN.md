# ISTQB Mock Exam Platform — Roadmap

## What's Been Built

| Feature | Status |
|---|---|
| 292 questions in Supabase (140 custom + 152 official) | ✅ Done |
| Random exam mode — 40 Qs, proportional chapter quota, 60 min, 65% pass | ✅ Done |
| Dark / light theme toggle | ✅ Done |
| Auto-submit on timer expiry | ✅ Done |
| Mobile responsive drawer nav | ✅ Done |
| Results page with chapter breakdown and full review | ✅ Done |
| Official exam modes A, B, C, D — fixed order, 40 Qs each | ✅ Done |
| Multi-answer (select TWO) support — all 7 questions inserted, all-or-nothing scoring | ✅ Done |
| DB schema: `exam_set`, `exam_position`, widened `answer` to `text` | ✅ Done |

---

## Phase 5 — User Auth & Exam History

**Goal:** Let users sign in with Google or GitHub so their exam results are saved across sessions.

- Supabase Auth — Google OAuth + GitHub OAuth providers
- Add `user_id` FK to `exam_sessions`; RLS policies scoped to authenticated users
- "Sign in to save results" prompt on HomeView for anonymous users
- Per-user exam history list on a `/history` route

---

## Phase 6 — History Dashboard

**Goal:** Show progress over time so users can track improvement.

- Timeline of past results (score, pass/fail, date, exam mode)
- Streak tracker (days studied consecutively)
- Chapter weak-spot heatmap — highlight chapters with sub-70% average score
- Personal bests per exam set (A/B/C/D) and random mode

---

## Phase 7 — Custom Practice Mode

**Goal:** Let users target specific areas rather than always doing a full 40-question exam.

- Filter questions by chapter (1–6), bloom level (K1/K2/K3), exam set, or any combo
- Choose question count (10, 20, 40, or custom)
- No time pressure option (untimed mode)
- Show only questions never answered correctly (weakness drill)

---

## Phase 8 — Timed Chapter Quizzes

**Goal:** Short focused drills for quick chapter-level practice.

- 10-question quizzes per chapter drawn from the full bank
- Shorter timer (15 min default)
- Immediate feedback after each answer (instant mode) vs submit-all (exam mode)
- Chapter quiz results tracked separately from full exam history

---

## Phase 9 — Knowledge Orbit Blog

**Goal:** A separate public blog site for QA and SecOps articles.

- Vue 3 + Vite + Supabase (separate project)
- TipTap WYSIWYG editor for authoring posts
- Google/GitHub SSO for admin dashboard
- Hosted at knowledge-orbit domain
- Tag-based filtering, search, RSS feed

---

## Phase 10 — PWA + Offline Mode

**Goal:** Make the app installable and usable without internet.

- Vite PWA plugin — service worker, app manifest
- Offline question cache (pre-cache all 299+ questions on first load)
- IndexedDB for offline answer persistence; sync to Supabase when back online
- Installable on Android and iOS home screen
- Push notification for daily practice reminder (opt-in)
