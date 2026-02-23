import { ref } from 'vue'

const isDark = ref(true)

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('istqb-theme', isDark.value ? 'dark' : 'light')
}

export function useTheme() {
  function initTheme() {
    const saved = localStorage.getItem('istqb-theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    applyTheme()
  }

  return { isDark, toggleTheme, initTheme }
}
