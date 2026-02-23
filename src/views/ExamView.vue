<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '@/stores/exam'
import TimerBar from '@/components/TimerBar.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import QuestionNav from '@/components/QuestionNav.vue'

const router = useRouter()
const store  = useExamStore()

const navOpen = ref(false)

onMounted(() => {
  if (!store.session) router.replace('/')
})

onBeforeUnmount(() => {
  if (store.session && store.result === null) {
    store.submitExam(false)
  }
})

// Auto-navigate to results when timer expires and submitExam finishes
watch(() => store.result, (result) => {
  if (result) router.push('/results')
})

const timerWarning = computed(() => store.timerSecs <= 600)

async function handleSubmit() {
  const unanswered = store.totalQ - store.answeredCount
  if (unanswered > 0) {
    const ok = confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)
    if (!ok) return
  }
  await store.submitExam(false)
  router.push('/results')
}

function openNav() { navOpen.value = true }
function closeNav() { navOpen.value = false }

function handleNavGo(i: number) {
  store.goTo(i)
  closeNav()
}
</script>

<template>
  <div v-if="store.session" class="exam-layout">

    <!-- Top bar -->
    <header class="topbar">
      <div class="topbar-left">
        <button class="nav-toggle" @click="openNav" aria-label="Question navigator">☰</button>
        <span class="exam-title">
          {{ store.examMode.type === 'official' ? `Official Exam ${store.examMode.set}` : 'ISTQB CTFL v4.0' }}
        </span>
        <span class="progress-pill">{{ store.answeredCount }}/{{ store.totalQ }} answered</span>
        <span v-if="store.flaggedCount" class="flag-pill">{{ store.flaggedCount }} flagged</span>
      </div>
      <div class="topbar-right">
        <TimerBar :secs="store.timerSecs" :warning="timerWarning" />
        <button class="btn-submit" @click="handleSubmit" :disabled="store.loading">
          {{ store.loading ? 'Submitting…' : 'Submit' }}
        </button>
      </div>
    </header>

    <!-- Main area -->
    <div class="exam-body">
      <main class="question-area">
        <QuestionCard
          v-if="store.current"
          :question="store.current"
          :index="store.currentIndex"
          :total="store.totalQ"
          @answer="store.selectAnswer"
          @flag="store.toggleFlag"
          @prev="store.prev"
          @next="store.next"
        />
      </main>

      <!-- Desktop sidebar -->
      <aside class="sidebar desktop-only">
        <QuestionNav
          :questions="store.questions"
          :current-index="store.currentIndex"
          @go="store.goTo"
        />
      </aside>
    </div>

    <!-- Mobile nav drawer backdrop -->
    <div v-if="navOpen" class="drawer-backdrop" @click="closeNav" />

    <!-- Mobile nav drawer -->
    <aside :class="['drawer', { open: navOpen }]">
      <div class="drawer-header">
        <span class="drawer-title">Questions</span>
        <button class="drawer-close" @click="closeNav">✕</button>
      </div>
      <QuestionNav
        :questions="store.questions"
        :current-index="store.currentIndex"
        @go="handleNavGo"
      />
    </aside>

  </div>

  <div v-else class="redirecting">
    <p>Redirecting…</p>
  </div>
</template>

<style scoped>
.exam-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* ── Topbar ───────────────────────────────────────────────────────────────── */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 1.25rem;
  padding-right: 3.5rem; /* reserve space for fixed theme toggle */
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  flex-wrap: wrap;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: 1;
  min-width: 0;
  flex-wrap: wrap;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.nav-toggle {
  display: none;
  background: var(--surface-2);
  border: 1px solid var(--border-2);
  color: var(--text-muted);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.exam-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}

.progress-pill, .flag-pill {
  font-family: var(--font-mono);
  font-size: 0.67rem;
  padding: 0.18rem 0.55rem;
  border-radius: 100px;
  white-space: nowrap;
}

.progress-pill {
  background: var(--accent-dim);
  color: var(--accent);
  border: 1px solid rgba(79,142,247,0.2);
}

.flag-pill {
  background: var(--yellow-dim);
  color: var(--yellow);
  border: 1px solid rgba(251,191,36,0.2);
}

.btn-submit {
  background: var(--accent);
  color: #fff;
  border: none;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.45rem 1.1rem;
  border-radius: 6px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.2s;
}
.btn-submit:hover:not(:disabled) { opacity: 0.85; }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── Body ─────────────────────────────────────────────────────────────────── */
.exam-body {
  display: grid;
  grid-template-columns: 1fr 260px;
  flex: 1;
  overflow: hidden;
}

.question-area {
  overflow-y: auto;
  padding: 2rem;
}

.sidebar {
  border-left: 1px solid var(--border);
  overflow-y: auto;
  background: var(--surface);
}

/* ── Mobile drawer ────────────────────────────────────────────────────────── */
.drawer-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 150;
}

.drawer {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: var(--surface);
  border-left: 1px solid var(--border);
  z-index: 200;
  transform: translateX(100%);
  transition: transform 0.25s ease;
  overflow-y: auto;
}

.drawer.open { transform: translateX(0); }

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--border);
}

.drawer-title {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.drawer-close {
  background: none;
  border: none;
  color: var(--text-dim);
  font-size: 0.9rem;
  padding: 0.2rem;
  transition: color 0.2s;
}
.drawer-close:hover { color: var(--text); }

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .exam-body       { grid-template-columns: 1fr; }
  .desktop-only    { display: none; }
  .nav-toggle      { display: flex; }
  .drawer-backdrop { display: block; }
  .drawer          { display: flex; flex-direction: column; }
  .question-area   { padding: 1rem; }

  .topbar {
    padding: 0.6rem 0.85rem;
    /* leave space for the fixed theme toggle button */
    padding-right: 3.5rem;
  }
}

.redirecting {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: var(--text-muted);
}
</style>
