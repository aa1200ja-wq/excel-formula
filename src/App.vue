<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import CategoryGrid from './components/CategoryGrid.vue'
import FormulaListScreen from './components/FormulaListScreen.vue'
import FormulaModal from './components/FormulaModal.vue'
import FormulaPreview from './components/FormulaPreview.vue'
import AppFooter from './components/AppFooter.vue'
import MobileNavigation from './components/MobileNavigation.vue'
import InstallPrompt from './components/InstallPrompt.vue'
import { categories } from './data/categories'
import { formulasWithMeta, popularFormulas } from './data/formulas'
import { useFavorites } from './composables/useFavorites'
import { useTheme } from './composables/useTheme'

const toneByCategory = Object.fromEntries(categories.map((category) => [category.id, category.tone]))
const formulas = formulasWithMeta.map((formula) => ({ ...formula, tone: toneByCategory[formula.category] }))
const popular = popularFormulas.map((formula) => ({ ...formula, tone: toneByCategory[formula.category] }))

const screen = ref('home')
const activeCategory = ref('')
const selectedFormula = ref(null)
const installPromptRef = ref(null)
const notice = ref('')
let noticeTimer

const { favorites, isFavorite, toggleFavorite } = useFavorites()
const { theme, toggleTheme } = useTheme()

const favoriteCount = computed(() => favorites.value.length)
const activeCategoryData = computed(() => categories.find((item) => item.id === activeCategory.value))
const screenFormulas = computed(() => {
  if (screen.value === 'popular') return popular
  if (screen.value === 'favorites') {
    const favoriteIds = new Set(favorites.value)
    return formulas.filter((formula) => favoriteIds.has(formula.id))
  }
  if (screen.value === 'category') return formulas.filter((formula) => formula.category === activeCategory.value)
  return []
})
const screenTitle = computed(() => {
  if (screen.value === 'popular') return '大家最常被這些公式揍過'
  if (screen.value === 'favorites') return '你的私藏急救櫃'
  return activeCategoryData.value?.title || '公式急救卡'
})
const screenDescription = computed(() => {
  if (screen.value === 'popular') return '先從最常用的六張開始。挑一張，公式會用彈窗端上來。'
  if (screen.value === 'favorites') return '你收藏過的公式都在這裡，而且只存在這台裝置。'
  const category = activeCategoryData.value
  return category ? `${category.formalTitle}｜${category.subtitle}。先選最像的卡，再打開看完整公式。` : ''
})

function scrollTo(id) {
  nextTick(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function setRoute(hash) {
  if (window.location.hash === hash) {
    applyRoute()
    return
  }
  window.location.hash = hash
}

function applyRoute() {
  const route = window.location.hash.replace(/^#/, '') || 'home'
  selectedFormula.value = null

  if (route.startsWith('category/')) {
    const categoryId = route.split('/')[1]
    if (categories.some((item) => item.id === categoryId)) {
      activeCategory.value = categoryId
      screen.value = 'category'
      nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      return
    }
  }

  if (route === 'popular' || route === 'favorites') {
    screen.value = route
    nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    return
  }

  screen.value = 'home'
  activeCategory.value = ''
  const target = route === 'categories' || route === 'guide' ? route : 'top'
  scrollTo(target)
}

function selectCategory(categoryId) {
  setRoute(`#category/${categoryId}`)
}

function navigate(target) {
  if (target === 'home' || target === 'top') setRoute('#home')
  else if (target === 'categories') setRoute('#categories')
  else if (target === 'popular') setRoute('#popular')
  else if (target === 'favorites') setRoute('#favorites')
  else if (target === 'guide') setRoute('#guide')
}

function toggleSaved(id) {
  const saved = toggleFavorite(id)
  showNotice(saved ? '已加入收藏，下次不用再找。' : '已取消收藏。')
}

function requestInstall() {
  installPromptRef.value?.requestInstall()
}

function showNotice(message) {
  notice.value = message
  window.clearTimeout(noticeTimer)
  noticeTimer = window.setTimeout(() => { notice.value = '' }, 2200)
}

onMounted(() => {
  window.addEventListener('hashchange', applyRoute)
  applyRoute()
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', applyRoute)
  window.clearTimeout(noticeTimer)
})
</script>

<template>
  <AppHeader
    :theme="theme"
    :favorite-count="favoriteCount"
    @toggle-theme="toggleTheme"
    @navigate="navigate"
  />

  <main>
    <template v-if="screen === 'home'">
      <HeroSection @install="requestInstall" />
      <CategoryGrid :categories="categories" @select="selectCategory" />
      <FormulaPreview />
    </template>

    <FormulaListScreen
      v-else
      :title="screenTitle"
      :description="screenDescription"
      :formulas="screenFormulas"
      :is-favorite="isFavorite"
      :empty-title="screen === 'favorites' ? '收藏櫃空到會回音' : '這一區目前沒有卡片'"
      :empty-description="screen === 'favorites' ? '看到想留的公式時，點星星把它抓進來。' : '回去換個症狀看看。'"
      @back="navigate('categories')"
      @open="selectedFormula = $event"
      @toggle-favorite="toggleSaved"
    />
  </main>

  <AppFooter />
  <MobileNavigation :favorite-count="favoriteCount" @navigate="navigate" />
  <InstallPrompt ref="installPromptRef" @notify="showNotice" />
  <FormulaModal
    :formula="selectedFormula"
    :favorite="selectedFormula ? isFavorite(selectedFormula.id) : false"
    @close="selectedFormula = null"
    @toggle-favorite="toggleSaved"
    @notify="showNotice"
  />

  <Transition name="toast">
    <div v-if="notice" class="app-toast" role="status" aria-live="polite">{{ notice }}</div>
  </Transition>
</template>
