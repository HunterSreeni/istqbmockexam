<script setup lang="ts">
import { computed } from 'vue'
import type { ActiveQuestion } from '@/types'

const props = defineProps<{
  question: ActiveQuestion
  index: number
  total: number
}>()

const emit = defineEmits<{
  answer: [a: string]
  flag: []
  prev: []
  next: []
}>()

const isMulti      = computed(() => props.question.answer.includes(','))
const optionKeys   = computed(() => ['A', 'B', 'C', 'D', ...(props.question.options.E ? ['E'] : [])])
const selectedKeys = computed(() => props.question.selected_answer?.split(',') ?? [])
const isSelected   = (key: string) => selectedKeys.value.includes(key)
</script>

<template>
  <div class="card">
    <!-- Header -->
    <div class="card-header">
      <div class="meta-left">
        <span class="q-num">Question {{ index + 1 }} of {{ total }}</span>
        <span class="bloom-tag">{{ question.bloom }}</span>
        <span class="chapter-tag">Ch{{ question.chapter }} · {{ question.syllabus_section }}</span>
      </div>
      <button :class="['flag-btn', { flagged: question.flagged }]" @click="emit('flag')">
        {{ question.flagged ? '🚩 Flagged' : '⚑ Flag' }}
      </button>
    </div>

    <!-- Progress bar -->
    <div class="q-progress-bg">
      <div class="q-progress-fill" :style="{ width: ((index + 1) / total * 100) + '%' }" />
    </div>

    <!-- Question text -->
    <div class="q-text">{{ question.question }}</div>

    <!-- Multi-answer banner -->
    <div v-if="isMulti" class="multi-banner">Select TWO answers</div>

    <!-- Options -->
    <div class="options">
      <button
        v-for="key in optionKeys"
        :key="key"
        :class="['option', { selected: isSelected(key) }]"
        @click="emit('answer', key)"
      >
        <span class="opt-key">{{ key }}</span>
        <span class="opt-text">{{ question.options[key as keyof typeof question.options] }}</span>
      </button>
    </div>

    <!-- Navigation -->
    <div class="nav-row">
      <button class="nav-btn" :disabled="index === 0" @click="emit('prev')">← Previous</button>
      <button class="nav-btn primary" :disabled="index === total - 1" @click="emit('next')">Next →</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 2rem;
  max-width: 780px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.meta-left { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }

.q-num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-dim);
}

.bloom-tag, .chapter-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  padding: 0.18rem 0.55rem;
  border-radius: 100px;
  border: 1px solid var(--border);
  color: var(--text-dim);
}

.bloom-tag { background: var(--accent-dim); color: var(--accent); border-color: rgba(79,142,247,0.2); }

.flag-btn {
  font-size: 0.75rem;
  background: none;
  border: 1px solid var(--border);
  color: var(--text-dim);
  padding: 0.25rem 0.7rem;
  border-radius: 6px;
  transition: all 0.2s;
}
.flag-btn.flagged {
  background: var(--yellow-dim);
  border-color: rgba(251,191,36,0.3);
  color: var(--yellow);
}

.q-progress-bg { height: 2px; background: var(--border); border-radius: 1px; margin-bottom: 1.75rem; }
.q-progress-fill { height: 2px; background: var(--accent); border-radius: 1px; transition: width 0.3s ease; }

.q-text {
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 1rem;
  color: var(--text);
}

.multi-banner {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--yellow);
  background: var(--yellow-dim);
  border: 1px solid rgba(251,191,36,0.25);
  border-radius: 100px;
  padding: 0.2rem 0.7rem;
  margin-bottom: 1.1rem;
}

.options { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem; }

.option {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: transparent;
  color: var(--text);
  text-align: left;
  transition: border-color 0.18s, background 0.18s;
}
.option:hover { border-color: var(--border-2); background: var(--surface-2); }
.option.selected {
  border-color: var(--accent);
  background: var(--accent-dim);
}

.opt-key {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  width: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}
.option.selected .opt-key { color: var(--accent); }

.opt-text { font-size: 0.9rem; line-height: 1.6; }

.nav-row { display: flex; justify-content: space-between; gap: 1rem; }

.nav-btn {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.82rem;
  padding: 0.55rem 1.25rem;
  border-radius: 7px;
  transition: all 0.2s;
}
.nav-btn:hover:not(:disabled) { border-color: var(--border-2); color: var(--text); }
.nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.nav-btn.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
.nav-btn.primary:hover:not(:disabled) { opacity: 0.85; }

@media (max-width: 600px) {
  .card { padding: 1.25rem; border-radius: 10px; }
  .q-text { font-size: 0.92rem; }
  .option { padding: 0.75rem 0.85rem; }
  .opt-text { font-size: 0.85rem; }
  .nav-btn { padding: 0.5rem 0.9rem; font-size: 0.78rem; }
}
</style>
