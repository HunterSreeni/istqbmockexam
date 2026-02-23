<script setup lang="ts">
import type { ActiveQuestion } from '@/types'

defineProps<{
  questions: ActiveQuestion[]
  currentIndex: number
}>()

const emit = defineEmits<{ go: [i: number] }>()
</script>

<template>
  <div class="nav-panel">
    <p class="nav-title">Questions</p>

    <div class="legend">
      <span class="leg answered">●</span> Answered
      <span class="leg flagged">●</span> Flagged
      <span class="leg unanswered">○</span> Unanswered
    </div>

    <div class="grid">
      <button
        v-for="(q, i) in questions"
        :key="q.id"
        :class="[
          'q-btn',
          { current: i === currentIndex, answered: !!q.selected_answer, flagged: q.flagged }
        ]"
        @click="emit('go', i)"
      >
        {{ i + 1 }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.nav-panel { padding: 1rem; }

.nav-title {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 0.75rem;
}

.legend {
  font-size: 0.68rem;
  color: var(--text-dim);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.leg { margin-right: 0.15rem; }
.leg.answered { color: var(--accent); }
.leg.flagged  { color: var(--yellow); }
.leg.unanswered { color: var(--border-2); }

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.35rem;
}

.q-btn {
  aspect-ratio: 1;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-dim);
  font-size: 0.7rem;
  font-family: var(--font-mono);
  transition: all 0.15s;
}
.q-btn:hover { border-color: var(--border-2); color: var(--text); }
.q-btn.answered { background: var(--accent-dim); border-color: rgba(79,142,247,0.3); color: var(--accent); }
.q-btn.flagged  { background: var(--yellow-dim); border-color: rgba(251,191,36,0.3);  color: var(--yellow); }
.q-btn.current  { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(79,142,247,0.3); }
</style>
