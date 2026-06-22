import { ref } from 'vue'

const STORAGE_KEY = 'excel-formula-first-aid:theme'

function safeReadTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function safeSaveTheme(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // 瀏覽器禁止本機儲存時，仍保留本次切換結果。
  }
}

function initialTheme() {
  const saved = safeReadTheme()
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const theme = ref(initialTheme())

  function applyTheme() {
    document.documentElement.dataset.theme = theme.value
    document.documentElement.style.colorScheme = theme.value
    const themeMeta = document.querySelector?.('meta[name="theme-color"]')
    themeMeta?.setAttribute('content', theme.value === 'dark' ? '#111a22' : '#168f5c')
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    safeSaveTheme(theme.value)
    applyTheme()
  }

  applyTheme()
  return { theme, toggleTheme }
}
