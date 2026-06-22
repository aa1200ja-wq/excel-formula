<template>
  <footer class="app-footer">
    <div class="container footer-grid">
      <div><strong>Excel公式急救箱</strong><p>嘴你歸嘴你，公式還是會救你。</p></div>
      <div class="footer-notes">
        <span>部分公式需要 Microsoft 365</span>
        <span>本工具不是 Microsoft 官方產品</span>
        <span>收藏與深色模式存在本機</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer { padding:28px 0 34px; border-top:1px solid var(--color-line); background:color-mix(in srgb,var(--color-surface) 72%,transparent); }
.footer-grid { display:flex; align-items:center; justify-content:space-between; gap:24px; }
.footer-grid p { margin:5px 0 0; color:var(--color-text-soft); }
.footer-notes { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:8px; }
.footer-notes span { padding:7px 10px; border:1px solid var(--color-line); border-radius:999px; color:var(--color-text-soft); background:var(--color-surface); font-size:.76rem; font-weight:700; }
@media(max-width:767px){.footer-grid,.footer-notes{align-items:flex-start;justify-content:flex-start;flex-direction:column}}
</style>
