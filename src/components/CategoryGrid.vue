<script setup>
defineProps({
  categories: { type: Array, required: true },
  activeCategory: { type: String, default: 'all' },
})
defineEmits(['select'])
</script>

<template>
  <section id="categories" class="category-section container">
    <div class="section-heading">
      <div>
        <span class="pill">別跟搜尋框猜拳，直接按</span>
        <h2>你現在是哪一種慘況？</h2>
        <p>主標題負責嘴，副標題負責講人話。看懂就按，不用先知道公式叫什麼。</p>
      </div>
      <span class="pill">6 類・共 30 張公式卡</span>
    </div>

    <div class="category-grid">
      <button
        v-for="category in categories"
        :key="category.id"
        class="category-card"
        :class="[`tone-${category.tone}`, { active: activeCategory === category.id }]"
        type="button"
        @click="$emit('select', category.id)"
      >
        <span class="category-icon">{{ category.icon }}</span>
        <span class="category-copy">
          <strong>{{ category.title }}</strong>
          <small>{{ category.formalTitle }}｜{{ category.subtitle }}</small>
        </span>
        <span class="category-count">{{ category.count }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.category-section { padding: 38px 0; scroll-margin-top: 86px; }
.category-grid { display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); gap: 12px; }
.category-card { position: relative; min-height: 162px; display: flex; align-items: flex-start; flex-direction: column; gap: 18px; padding: 18px; border: 1px solid var(--card-border); border-radius: var(--radius-lg); color: var(--color-text); background: var(--card-bg); text-align: left; transition: transform 160ms ease,box-shadow 160ms ease,border-color 160ms ease,background 160ms ease; }
.category-card:hover,.category-card.active { transform: translateY(-3px); box-shadow: var(--shadow-soft); }
.category-card.active { border-color: var(--card-accent); outline: 3px solid color-mix(in srgb,var(--card-accent) 16%,transparent); }
.category-icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 13px; color: var(--card-accent); background: var(--color-surface); font-weight: 950; font-size: 1.1rem; }
.category-copy strong,.category-copy small { display: block; }
.category-copy strong { color: var(--color-text); font-size: 1rem; line-height: 1.35; }
.category-copy small { margin-top: 7px; color: var(--color-text-soft); line-height: 1.45; }
.category-count { position: absolute; top: 16px; right: 16px; display: grid; place-items: center; width: 27px; height: 27px; border-radius: 999px; color: var(--card-accent); background: var(--color-surface); font-size: .78rem; font-weight: 900; }
.tone-green{--card-bg:#eefaf3;--card-border:#cfe9d9;--card-accent:#168f5c}.tone-orange{--card-bg:#fff5ea;--card-border:#f5dcc1;--card-accent:#e67e13}.tone-blue{--card-bg:#eef5ff;--card-border:#cfdef4;--card-accent:#3179d6}.tone-yellow{--card-bg:#fff9ea;--card-border:#f1e1b8;--card-accent:#ab7611}.tone-pink{--card-bg:#fff1f3;--card-border:#f2d4d9;--card-accent:#d44e63}.tone-mint{--card-bg:#effaf8;--card-border:#cce8e3;--card-accent:#16857a}
@media(max-width:1100px){.category-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:560px){.category-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.category-card{min-height:154px;padding:15px}.category-copy strong{font-size:.94rem}.category-copy small{font-size:.75rem}}
</style>
