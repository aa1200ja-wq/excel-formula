<script setup>
defineProps({
  theme: { type: String, required: true },
  favoriteCount: { type: Number, default: 0 },
})

defineEmits(['toggle-theme', 'navigate'])
</script>

<template>
  <header class="app-header">
    <div class="container header-inner">
      <button class="brand" type="button" aria-label="回到首頁" @click="$emit('navigate', 'home')">
        <span class="brand-icon">✚</span>
        <span><strong>Excel公式</strong><small>急救箱</small></span>
      </button>

      <nav class="desktop-nav" aria-label="主要導覽">
        <button type="button" @click="$emit('navigate', 'categories')">選症狀</button>
        <button type="button" @click="$emit('navigate', 'popular')">熱門</button>
        <button type="button" @click="$emit('navigate', 'favorites')">
          收藏 <span v-if="favoriteCount">{{ favoriteCount }}</span>
        </button>
        <button type="button" @click="$emit('navigate', 'guide')">說明</button>
      </nav>

      <button class="theme-button" type="button" @click="$emit('toggle-theme')">
        <span aria-hidden="true">{{ theme === 'dark' ? '☀' : '☾' }}</span>
        <span class="theme-label">{{ theme === 'dark' ? '淺色模式' : '深色模式' }}</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header { position:sticky; top:0; z-index:20; border-bottom:1px solid var(--color-line); background:color-mix(in srgb,var(--color-surface) 88%,transparent); backdrop-filter:blur(16px); }
.header-inner { min-height:72px; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:24px; }
.brand { display:inline-flex; align-items:center; gap:11px; width:max-content; padding:0; border:0; color:inherit; background:transparent; text-align:left; }
.brand-icon { display:grid; place-items:center; width:42px; height:42px; border-radius:13px; color:white; background:var(--color-primary); box-shadow:0 8px 18px rgba(22,143,92,.22); font-size:1.25rem; font-weight:900; }
.brand strong,.brand small { display:block; }
.brand strong { font-size:1rem; line-height:1.1; }
.brand small { margin-top:2px; color:var(--color-text-soft); font-size:.78rem; font-weight:700; }
.desktop-nav { display:flex; align-items:center; gap:8px; padding:6px; border:1px solid var(--color-line); border-radius:999px; background:var(--color-surface); }
.desktop-nav button { padding:8px 14px; border:0; border-radius:999px; color:var(--color-text-soft); background:transparent; font-size:.9rem; font-weight:800; }
.desktop-nav button:hover { color:var(--color-primary-strong); background:var(--color-primary-soft); }
.desktop-nav button span { display:inline-grid; place-items:center; min-width:20px; height:20px; margin-left:3px; border-radius:999px; color:#fff; background:var(--color-primary); font-size:.7rem; }
.theme-button { justify-self:end; display:inline-flex; align-items:center; gap:8px; padding:10px 13px; border:1px solid var(--color-line); border-radius:12px; color:var(--color-text); background:var(--color-surface); font-weight:800; }
@media(max-width:767px){.header-inner{min-height:64px;grid-template-columns:1fr auto}.desktop-nav,.theme-label{display:none}.theme-button{width:42px;height:42px;justify-content:center;padding:0}}
</style>
