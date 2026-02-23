<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '@/stores/exam'
import TimerBar from '@/components/TimerBar.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import QuestionNav from '@/components/QuestionNav.vue'

const router = useRouter()
const store  = useExamStore()

onMounted(() => {
  if (!store.session) router.replace('/')
})

onBeforeUnmount(() => {
  // If navigating away mid-exam without submitting, mark abandoned
  if (store.session && store.result === null) {
    // fire and forget
    store.submitExam(false)
  }
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
</script>

<template>
  <div v-if="store.session" class="exam-layout">

    <!-- Top bar -->
    <header class="topbar">
      <div class="topbar-left">
        <span class="exam-title">ISTQB CTFL v4.0 Mock Exam</span>
        <span class="progress-pill">
          {{ store.answeredCount }} / {{ store.totalQ }} answered
        </span>
        <span v-if="store.flaggedCount" class="flag-pill">
          {{ store.flaggedCount }} flagged
        </span>
      </div>
      <TimerBar :secs="store.timerSecs" :warning="timerWarning" />
      <button class="btn-submit" @click="handleSubmit" :disabled="store.loading">
        {{ store.loading ? 'Submitting…' : 'Submit Exam' }}
      </button>
    </header>

    <!-- Main area -->
    <div class="exam-body">
      <!-- Question panel -->
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

      <!-- Sidebar nav -->
      <aside class="sidebar">
        <QuestionNav
          :questions="store.questions"
          :current-index="store.currentIndex"
          @go="store.goTo"
        />
      </aside>
    </div>
  </div>

  <div v-else class="redirecting">
    <p>Redirecting…</p>
  </div>
</template>

<style scoped>
.exam-layout { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

.topbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  flex-wrap: wrap;
}

.topbar-left { display: flex; align-items: center; gap: 0.75rem; flex: 1; min-width: 0; }

.exam-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}

.progress-pill, .flag-pill {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  white-space: nowrap;
}

.progress-pill {
  background: var(--accent-dim);
  color: var(--accent);
  border: 1px solid rgba(79,142,247,0.25);
}

.flag-pill {
  background: var(--yellow-dim);
  color: var(--yellow);
  border: 1px solid rgba(251,191,36,0.25);
}

.btn-submit {
  background: var(--accent);
  color: #fff;
  border: none;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.2s;
}
.btn-submit:hover:not(:disabled) { opacity: 0.85; }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

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

.redirecting { display: flex; align-items: center; justify-content: center; height: 100vh; color: var(--text-muted); }

@media (max-width: 768px) {
  .exam-body { grid-template-columns: 1fr; }
  .sidebar { display: none; }
}
</style>
