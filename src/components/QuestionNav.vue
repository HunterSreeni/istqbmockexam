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
      <span class="swatch answered" />Answered
      <span class="swatch unanswered" />Unanswered
      <span class="swatch flagged-answered" />Flagged &amp; done
      <span class="swatch flagged" />Flagged
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
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  align-items: center;
  gap: 0.3rem 0.4rem;
  margin-bottom: 1rem;
}

.swatch {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  border: 1px solid transparent;
  flex-shrink: 0;
}
.swatch.answered         { background: var(--accent-dim);  border-color: rgba(79,142,247,0.4); }
.swatch.unanswered       { background: var(--bg);           border-color: var(--border-2); }
.swatch.flagged          { background: var(--yellow-dim);   border-color: rgba(251,191,36,0.4); }
.swatch.flagged-answered { background: var(--accent-dim);   border-color: var(--yellow); }

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
.q-btn.answered         { background: var(--accent-dim); border-color: rgba(79,142,247,0.3); color: var(--accent); }
.q-btn.flagged          { background: var(--yellow-dim); border-color: rgba(251,191,36,0.3); color: var(--yellow); }
.q-btn.flagged.answered { background: var(--accent-dim); border-color: var(--yellow);        color: var(--accent); }
.q-btn.current          { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(79,142,247,0.3); }
</style>
