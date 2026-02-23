<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '@/stores/exam'

const router = useRouter()
const store  = useExamStore()
const starting = ref(false)

async function begin() {
  starting.value = true
  await store.startExam()
  if (!store.error) router.push('/exam')
  else starting.value = false
}

const chapters = [
  { n: 1, title: 'Fundamentals of Testing',       q: 10, pct: 26 },
  { n: 2, title: 'Testing Throughout the SDLC',   q: 7,  pct: 17 },
  { n: 3, title: 'Static Testing',                 q: 4,  pct: 11 },
  { n: 4, title: 'Test Analysis & Design',          q: 8,  pct: 21 },
  { n: 5, title: 'Managing the Test Activities',   q: 7,  pct: 17 },
  { n: 6, title: 'Test Tools',                     q: 4,  pct:  8 },
]

const certLevels = [
  {
    label: 'Foundation',
    color: 'green',
    certs: [
      { name: 'CTFL v4.0', full: 'Certified Tester Foundation Level', note: 'This exam — prerequisite for all advanced certs' },
      { name: 'CTFL-AT',   full: 'Foundation Level Agile Tester',     note: 'Agile stream add-on' },
    ],
  },
  {
    label: 'Advanced',
    color: 'blue',
    certs: [
      { name: 'CTAL-TA',  full: 'Advanced Level Test Analyst v4.0',           note: '' },
      { name: 'CTAL-TTA', full: 'Advanced Level Technical Test Analyst',       note: '' },
      { name: 'CTAL-TM',  full: 'Advanced Level Test Manager',                note: '' },
      { name: 'CTAL-TAE', full: 'Advanced Level Test Automation Engineering',  note: '' },
    ],
  },
  {
    label: 'Specialist',
    color: 'purple',
    certs: [
      { name: 'CT-AI',     full: 'AI Testing',                    note: '' },
      { name: 'CT-GenAI',  full: 'Testing with Generative AI',    note: 'New 2024' },
      { name: 'CT-TAE',    full: 'Test Automation Engineering',   note: '' },
      { name: 'CT-PT',     full: 'Performance Testing',           note: '' },
      { name: 'CT-SEC',    full: 'Security Tester',               note: '' },
      { name: 'CT-MBT',    full: 'Model-Based Tester',            note: '' },
      { name: 'CT-MAT',    full: 'Mobile Application Testing',    note: '' },
      { name: 'CT-AcT',    full: 'Acceptance Testing',            note: '' },
    ],
  },
  {
    label: 'Expert',
    color: 'gold',
    certs: [
      { name: 'CTEL-TM',  full: 'Expert Level Test Management',               note: '3-part exam' },
      { name: 'CTEL-ITP', full: 'Expert Level Improving the Test Process',    note: '2-part exam' },
    ],
  },
]
</script>

<template>
  <div class="home">

    <!-- Hero -->
    <div class="hero">
      <p class="label">ISTQB · CTFL v4.0 · Foundation Level</p>
      <h1>Mock Exam</h1>
      <p class="sub">
        Simulate the real exam experience with questions aligned to the official
        ISTQB CTFL v4.0 syllabus. 40 questions, 60 minutes, instant results
        with full explanations.
      </p>

      <div class="stats-row">
        <div class="stat">
          <span class="stat-val">40</span>
          <span class="stat-key">Questions</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-val">60</span>
          <span class="stat-key">Minutes</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-val">26/40</span>
          <span class="stat-key">Pass mark</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-val">65%</span>
          <span class="stat-key">Pass %</span>
        </div>
        <div class="stat-divider" />
        <div class="stat">
          <span class="stat-val">MCQ</span>
          <span class="stat-key">Format</span>
        </div>
      </div>

      <button class="btn-start" :disabled="starting" @click="begin">
        <span v-if="!starting">Start Exam →</span>
        <span v-else class="loading-dots">Loading exam<span>...</span></span>
      </button>
      <p v-if="store.error" class="error-msg">{{ store.error }}</p>
    </div>

    <!-- Exam breakdown -->
    <div class="breakdown">
      <h2>Exam breakdown</h2>
      <div class="chapter-list">
        <div v-for="ch in chapters" :key="ch.n" class="chapter-row">
          <div class="ch-num">{{ ch.n }}</div>
          <div class="ch-body">
            <div class="ch-header">
              <p class="ch-title">{{ ch.title }}</p>
              <span class="ch-q">{{ ch.q }} questions</span>
            </div>
            <div class="ch-bar-bg">
              <div class="ch-bar-fill" :style="{ width: ch.pct + '%' }" />
            </div>
          </div>
          <span class="ch-pct">{{ ch.pct }}%</span>
        </div>
      </div>
    </div>

    <!-- Before you begin -->
    <div class="rules">
      <h2>Before you begin</h2>
      <ul>
        <li>The timer starts immediately when you click <strong>Start Exam</strong>.</li>
        <li>You can navigate freely between questions at any time.</li>
        <li>Flag questions you want to revisit — they appear in the question nav panel.</li>
        <li>The exam <strong>auto-submits</strong> when the timer reaches 00:00.</li>
        <li>After submission, every question shows the correct answer and full explanation.</li>
        <li>Each question is worth <strong>1 point</strong>. No negative marking.</li>
      </ul>
    </div>

    <!-- ISTQB Certification Pathway -->
    <div class="pathway-section">
      <div class="pathway-header">
        <h2>ISTQB Certification Pathway</h2>
        <a href="https://istqb.org/certifications/" target="_blank" rel="noopener" class="official-link">
          Official ISTQB site ↗
        </a>
      </div>
      <p class="pathway-sub">
        CTFL is the entry-point certification. All advanced, specialist, and expert
        certifications require CTFL as a prerequisite.
      </p>

      <div class="level-grid">
        <div
          v-for="level in certLevels"
          :key="level.label"
          :class="['level-card', `level-${level.color}`]"
        >
          <div class="level-label">{{ level.label }}</div>
          <div class="cert-list">
            <div v-for="cert in level.certs" :key="cert.name" class="cert-item">
              <span class="cert-badge">{{ cert.name }}</span>
              <span class="cert-full">{{ cert.full }}</span>
              <span v-if="cert.note" class="cert-note">{{ cert.note }}</span>
            </div>
          </div>
        </div>
      </div>

      <p class="pathway-note">
        This platform currently covers <strong>CTFL v4.0</strong> (Foundation Level).
        Advanced and Specialist mock exams are planned for future phases.
      </p>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <span>ISTQB® is a registered trademark of the International Software Testing Qualifications Board.</span>
      <span>Questions on this platform are for practice purposes only and are not official ISTQB material.</span>
      <a href="https://istqb.org" target="_blank" rel="noopener">istqb.org ↗</a>
    </footer>
  </div>
</template>

<style scoped>
.home {
  max-width: 860px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

/* ── Hero ───────────────────────────────────────────────────────────────────── */
.hero {
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 1rem;
}

.label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.2rem;
}

h1 {
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 1.2rem;
}

.sub {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.75;
  max-width: 540px;
  margin: 0 auto 2.5rem;
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.stat { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }
.stat-val { font-size: 1.4rem; font-weight: 700; }
.stat-key { font-size: 0.68rem; color: var(--text-dim); letter-spacing: 0.08em; text-transform: uppercase; }
.stat-divider { width: 1px; height: 28px; background: var(--border); }

.btn-start {
  background: var(--accent);
  color: #fff;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.9rem 3rem;
  border-radius: var(--radius);
  transition: opacity 0.2s, transform 0.2s;
}
.btn-start:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
.btn-start:disabled { opacity: 0.5; cursor: not-allowed; }

.error-msg { color: var(--red); font-size: 0.85rem; margin-top: 1rem; }

/* ── Breakdown ──────────────────────────────────────────────────────────────── */
.breakdown, .rules { margin-bottom: 3rem; }

h2 { font-size: 1rem; font-weight: 600; margin-bottom: 1.25rem; color: var(--text-muted); }

.chapter-list { display: flex; flex-direction: column; gap: 0.6rem; }

.chapter-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.ch-num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  width: 18px;
  flex-shrink: 0;
}

.ch-body { flex: 1; min-width: 0; }
.ch-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; gap: 0.5rem; }
.ch-title { font-size: 0.88rem; font-weight: 500; }
.ch-q { font-size: 0.7rem; color: var(--text-dim); font-family: var(--font-mono); flex-shrink: 0; }

.ch-bar-bg { height: 3px; background: var(--border); border-radius: 2px; }
.ch-bar-fill { height: 3px; background: var(--accent); border-radius: 2px; transition: width 0.6s ease; }
.ch-pct { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-dim); width: 36px; text-align: right; flex-shrink: 0; }

/* ── Rules ──────────────────────────────────────────────────────────────────── */
.rules ul { list-style: none; display: flex; flex-direction: column; gap: 0.55rem; }
.rules li {
  font-size: 0.88rem;
  color: var(--text-muted);
  padding-left: 1.2rem;
  position: relative;
  line-height: 1.6;
}
.rules li::before { content: '·'; position: absolute; left: 0; color: var(--accent); }
.rules strong { color: var(--text); }

/* ── Certification Pathway ──────────────────────────────────────────────────── */
.pathway-section { margin-bottom: 3rem; }

.pathway-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.pathway-header h2 {
  margin-bottom: 0;
}

.official-link {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent);
  border: 1px solid rgba(79,142,247,0.3);
  padding: 0.2rem 0.65rem;
  border-radius: 100px;
  transition: background 0.2s;
  background: var(--accent-dim);
}
.official-link:hover { background: rgba(79,142,247,0.25); }

.pathway-sub {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.65;
}

.level-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.9rem;
  margin-bottom: 1rem;
}

.level-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 1rem 1.1rem;
  border-top-width: 2px;
}

.level-green  { border-top-color: var(--green); }
.level-blue   { border-top-color: var(--accent); }
.level-purple { border-top-color: #a78bfa; }
.level-gold   { border-top-color: var(--yellow); }

.level-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  color: var(--text-dim);
}

.cert-list { display: flex; flex-direction: column; gap: 0.5rem; }

.cert-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cert-badge {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--surface-2);
  border: 1px solid var(--border-2);
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  flex-shrink: 0;
}

/* highlight the current cert */
.level-green .cert-item:first-child .cert-badge {
  color: var(--green);
  border-color: rgba(52,211,153,0.3);
  background: var(--green-dim);
}

.cert-full { font-size: 0.8rem; color: var(--text-muted); }
.cert-note { font-size: 0.68rem; color: var(--accent); font-family: var(--font-mono); }

.pathway-note {
  font-size: 0.8rem;
  color: var(--text-dim);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  line-height: 1.6;
}
.pathway-note strong { color: var(--accent); }

/* ── Footer ─────────────────────────────────────────────────────────────────── */
.footer {
  text-align: center;
  font-size: 0.72rem;
  color: var(--text-dim);
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.footer a { color: var(--accent); }
.footer a:hover { text-decoration: underline; }

/* ── Loading ────────────────────────────────────────────────────────────────── */
.loading-dots span { animation: blink 1s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* ── Responsive ─────────────────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .home { padding: 2.5rem 1.25rem; }
  .hero { padding-top: 2rem; }
  .stats-row { gap: 0.8rem; }
  .stat-val { font-size: 1.15rem; }
  .stat-divider { height: 22px; }
  .btn-start { padding: 0.85rem 2rem; width: 100%; }
  .level-grid { grid-template-columns: 1fr; }
}
</style>
