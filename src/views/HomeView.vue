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
  { n: 1, title: 'Fundamentals of Testing',                    q: 10, pct: 26 },
  { n: 2, title: 'Testing Throughout the SDLC',               q: 7,  pct: 17 },
  { n: 3, title: 'Static Testing',                             q: 4,  pct: 11 },
  { n: 4, title: 'Test Analysis & Design',                     q: 8,  pct: 21 },
  { n: 5, title: 'Managing the Test Activities',               q: 7,  pct: 17 },
  { n: 6, title: 'Test Tools',                                 q: 4,  pct:  8 },
]
</script>

<template>
  <div class="home">
    <div class="hero">
      <p class="label">ISTQB · CTFL v4.0 · Foundation Level</p>
      <h1>Mock Exam</h1>
      <p class="sub">
        Simulate the real exam experience. 40 questions, 60 minutes, instant results
        with full explanations on every question.
      </p>

      <div class="stats-row">
        <div class="stat"><span class="stat-val">40</span><span class="stat-key">Questions</span></div>
        <div class="stat-divider" />
        <div class="stat"><span class="stat-val">60</span><span class="stat-key">Minutes</span></div>
        <div class="stat-divider" />
        <div class="stat"><span class="stat-val">65%</span><span class="stat-key">Pass mark</span></div>
        <div class="stat-divider" />
        <div class="stat"><span class="stat-val">MCQ</span><span class="stat-key">Format</span></div>
      </div>

      <button class="btn-start" :disabled="starting" @click="begin">
        <span v-if="!starting">Start Exam →</span>
        <span v-else class="loading-dots">Loading exam<span>...</span></span>
      </button>
      <p v-if="store.error" class="error-msg">{{ store.error }}</p>
    </div>

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

    <div class="rules">
      <h2>Before you begin</h2>
      <ul>
        <li>The timer starts immediately when you click <strong>Start Exam</strong>.</li>
        <li>You can navigate freely between questions at any time.</li>
        <li>Flag questions you want to revisit — they show in the question panel.</li>
        <li>The exam auto-submits when the timer reaches zero.</li>
        <li>After submission, every question shows the correct answer and full explanation.</li>
      </ul>
    </div>

    <footer class="footer">
      ISTQB® is a registered trademark. Questions are for practice purposes only.
    </footer>
  </div>
</template>

<style scoped>
.home {
  max-width: 820px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
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
  max-width: 520px;
  margin: 0 auto 2.5rem;
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; }
.stat-val { font-size: 1.5rem; font-weight: 700; }
.stat-key { font-size: 0.72rem; color: var(--text-dim); letter-spacing: 0.08em; text-transform: uppercase; }
.stat-divider { width: 1px; height: 32px; background: var(--border); }

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

/* Breakdown */
.breakdown, .rules { margin-bottom: 3rem; }
h2 { font-size: 1.1rem; font-weight: 600; margin-bottom: 1.25rem; color: var(--text-muted); }

.chapter-list { display: flex; flex-direction: column; gap: 0.75rem; }

.chapter-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.ch-num {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-dim);
  width: 18px;
  flex-shrink: 0;
}

.ch-body { flex: 1; }
.ch-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
.ch-title { font-size: 0.88rem; font-weight: 500; }
.ch-q { font-size: 0.72rem; color: var(--text-dim); font-family: var(--font-mono); }

.ch-bar-bg { height: 3px; background: var(--border); border-radius: 2px; }
.ch-bar-fill { height: 3px; background: var(--accent); border-radius: 2px; transition: width 0.6s ease; }
.ch-pct { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim); width: 36px; text-align: right; flex-shrink: 0; }

/* Rules */
.rules ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
.rules li { font-size: 0.88rem; color: var(--text-muted); padding-left: 1.2rem; position: relative; }
.rules li::before { content: '·'; position: absolute; left: 0; color: var(--accent); }
.rules strong { color: var(--text); }

.footer { text-align: center; font-size: 0.72rem; color: var(--text-dim); padding-top: 2rem; border-top: 1px solid var(--border); }

.loading-dots span { animation: blink 1s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
</style>
