<script setup lang="ts">
import { computed } from 'vue'
import type { ActiveQuestion } from '@/types'

const props = defineProps<{
  question: ActiveQuestion
  index: number
  total: number
}>()

const emit = defineEmits<{ close: []; prev: []; next: [] }>()

const optionKeys = computed(() =>
  ['A', 'B', 'C', 'D', ...(props.question.options.E ? ['E'] : [])]
)

function optionClass(q: ActiveQuestion, key: string) {
  const correct  = q.answer.split(',')
  const selected = q.selected_answer?.split(',') ?? []
  if (correct.includes(key))                              return 'correct'
  if (selected.includes(key) && !correct.includes(key))  return 'wrong'
  return ''
}

function isCorrectKey(q: ActiveQuestion, key: string) {
  return q.answer.split(',').includes(key)
}

function isWrongKey(q: ActiveQuestion, key: string) {
  const selected = q.selected_answer?.split(',') ?? []
  return selected.includes(key) && !q.answer.split(',').includes(key)
}
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-meta">
          <span class="q-num">Question {{ index + 1 }} of {{ total }}</span>
          <span class="bloom-tag">{{ question.bloom }}</span>
          <span class="section-tag">{{ question.syllabus_section }} · {{ question.topic }}</span>
        </div>
        <button class="close-btn" @click="emit('close')">✕</button>
      </div>

      <div class="modal-body">
        <p class="q-text">{{ question.question }}</p>

        <div class="options">
          <div
            v-for="key in optionKeys"
            :key="key"
            :class="['option', optionClass(question, key)]"
          >
            <span class="opt-key">{{ key }}</span>
            <span class="opt-text">{{ question.options[key as keyof typeof question.options] }}</span>
            <span v-if="isCorrectKey(question, key)" class="opt-badge correct-badge">Correct</span>
            <span v-else-if="isWrongKey(question, key)" class="opt-badge wrong-badge">Your answer</span>
          </div>
        </div>

        <div v-if="!question.selected_answer" class="skipped-note">
          You did not answer this question.
        </div>

        <div class="explanation">
          <p class="exp-label">Explanation</p>
          <p class="exp-text">{{ question.explanation }}</p>
        </div>
      </div>

      <div class="modal-footer">
        <button class="nav-btn" :disabled="index === 0" @click="emit('prev')">← Previous</button>
        <button class="nav-btn primary" :disabled="index === total - 1" @click="emit('next')">Next →</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal {
  background: var(--surface);
  border: 1px solid var(--border-2);
  border-radius: 14px;
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.5rem;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.modal-meta { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }

.q-num      { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim); }
.bloom-tag  { font-family: var(--font-mono); font-size: 0.65rem; padding: 0.18rem 0.55rem; border-radius: 100px; background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(79,142,247,0.2); }
.section-tag{ font-size: 0.72rem; color: var(--text-dim); }

.close-btn { background: none; border: none; color: var(--text-dim); font-size: 1rem; padding: 0.25rem; transition: color 0.2s; }
.close-btn:hover { color: var(--text); }

.modal-body { overflow-y: auto; padding: 1.5rem; flex: 1; }

.q-text { font-size: 0.95rem; line-height: 1.75; margin-bottom: 1.5rem; }

.options { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }

.option {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
}
.option.correct { border-color: rgba(52,211,153,0.4);  background: var(--green-dim); }
.option.wrong   { border-color: rgba(248,113,113,0.4); background: var(--red-dim); }

.opt-key { font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--text-dim); width: 16px; flex-shrink: 0; margin-top: 1px; }
.option.correct .opt-key { color: var(--green); }
.option.wrong   .opt-key { color: var(--red); }

.opt-text { flex: 1; font-size: 0.88rem; line-height: 1.55; }
.opt-badge { font-family: var(--font-mono); font-size: 0.62rem; padding: 0.15rem 0.45rem; border-radius: 4px; flex-shrink: 0; }
.correct-badge { background: rgba(52,211,153,0.15); color: var(--green); }
.wrong-badge   { background: rgba(248,113,113,0.15); color: var(--red); }

.skipped-note { font-size: 0.82rem; color: var(--text-dim); font-style: italic; margin-bottom: 1.25rem; }

.explanation { padding: 1rem 1.2rem; background: var(--surface-2); border-radius: 9px; border: 1px solid var(--border); }
.exp-label { font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.6rem; }
.exp-text  { font-size: 0.88rem; line-height: 1.75; color: var(--text-muted); }

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}

.nav-btn { background: var(--surface-2); border: 1px solid var(--border); color: var(--text-muted); font-size: 0.82rem; padding: 0.5rem 1.1rem; border-radius: 7px; transition: all 0.2s; }
.nav-btn:hover:not(:disabled) { border-color: var(--border-2); color: var(--text); }
.nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.nav-btn.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
.nav-btn.primary:hover:not(:disabled) { opacity: 0.85; }
</style>
