<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ secs: number; warning: boolean }>()

const display = computed(() => {
  const m = Math.floor(props.secs / 60).toString().padStart(2, '0')
  const s = (props.secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})
</script>

<template>
  <div :class="['timer', { warning }]">
    <span class="timer-icon">⏱</span>
    <span class="timer-val">{{ display }}</span>
  </div>
</template>

<style scoped>
.timer {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-muted);
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  transition: color 0.3s, border-color 0.3s, background 0.3s;
}
.timer.warning {
  color: var(--red);
  border-color: rgba(248,113,113,0.35);
  background: var(--red-dim);
  animation: pulse-border 1s ease infinite;
}
@keyframes pulse-border {
  0%,100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.timer-icon { font-size: 0.82rem; }
</style>
