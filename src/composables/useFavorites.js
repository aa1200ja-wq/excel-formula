import { computed, ref } from 'vue'

const STORAGE_KEY = 'excel-formula-first-aid:favorites'

function readStoredFavorites() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const favorites = ref(readStoredFavorites())
  const favoriteSet = computed(() => new Set(favorites.value))

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
    } catch {
      // 瀏覽器禁止本機儲存時，收藏仍可在本次開啟期間使用。
    }
  }

  function isFavorite(id) {
    return favoriteSet.value.has(id)
  }

  function toggleFavorite(id) {
    favorites.value = isFavorite(id)
      ? favorites.value.filter((item) => item !== id)
      : [...favorites.value, id]
    persist()
    return isFavorite(id)
  }

  return { favorites, isFavorite, toggleFavorite }
}
