<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme, initTheme } = useTheme()
onMounted(initTheme)
</script>

<template>
  <RouterView />

  <!-- Persistent theme toggle, always top-right -->
  <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
    <span v-if="isDark">☀</span>
    <span v-else>☾</span>
  </button>
</template>

<style>
.theme-toggle {
  position: fixed;
  top: 0.85rem;
  right: 1rem;
  z-index: 999;
  background: var(--surface-2);
  border: 1px solid var(--border-2);
  color: var(--text-muted);
  width: 34px;
  height: 34px;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  box-shadow: var(--shadow);
}
.theme-toggle:hover {
  color: var(--text);
  border-color: var(--border-2);
  background: var(--surface);
}
</style>
