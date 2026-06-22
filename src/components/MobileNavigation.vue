<script setup>
defineProps({ favoriteCount: { type: Number, default: 0 } })
defineEmits(['navigate'])
</script>

<template>
  <nav class="mobile-nav" aria-label="手機版底部導覽">
    <button type="button" @click="$emit('navigate', 'home')"><span>⌂</span>首頁</button>
    <button type="button" @click="$emit('navigate', 'categories')"><span>▦</span>選症狀</button>
    <button type="button" @click="$emit('navigate', 'popular')"><span>⚡</span>熱門</button>
    <button type="button" @click="$emit('navigate', 'favorites')"><span>★</span>收藏{{ favoriteCount ? ` ${favoriteCount}` : '' }}</button>
  </nav>
</template>

<style scoped>
.mobile-nav { position:fixed; left:10px; right:10px; bottom:calc(8px + env(safe-area-inset-bottom)); z-index:30; display:none; grid-template-columns:repeat(4,1fr); min-height:62px; padding:7px; border:1px solid var(--color-line); border-radius:18px; background:color-mix(in srgb,var(--color-surface) 95%,transparent); box-shadow:0 14px 36px rgba(31,58,88,.2); backdrop-filter:blur(18px); }
.mobile-nav button { display:grid; place-items:center; gap:2px; border:0; border-radius:13px; color:var(--color-text-soft); background:transparent; font-size:.72rem; font-weight:900; }
.mobile-nav button span { font-size:1.25rem; line-height:1; }
.mobile-nav button:active { color:var(--color-primary-strong); background:var(--color-primary-soft); }
@media(max-width:767px){.mobile-nav{display:grid}}
</style>
