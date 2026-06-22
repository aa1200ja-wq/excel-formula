<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  formulas: { type: Array, required: true },
  isFavorite: { type: Function, required: true },
  emptyTitle: { type: String, default: '這裡目前空空的' },
  emptyDescription: { type: String, default: '先回去挑一張公式卡吧。' },
})

defineEmits(['back', 'open', 'toggle-favorite'])
</script>

<template>
  <section class="formula-screen container" aria-labelledby="formula-screen-title">
    <button class="back-button" type="button" @click="$emit('back')">← 回去選別種慘況</button>

    <div class="screen-heading">
      <div>
        <span class="pill">第二步：挑一張最像的</span>
        <h1 id="formula-screen-title">{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
      <span class="count-pill">{{ formulas.length }} 張急救卡</span>
    </div>

    <div v-if="formulas.length" class="formula-choice-grid">
      <article
        v-for="formula in formulas"
        :key="formula.id"
        class="formula-choice-card"
        :class="`tone-${formula.tone}`"
      >
        <div class="choice-topline">
          <div class="badge-row">
            <span class="function-badge">{{ formula.functionName }}</span>
            <span class="version-badge">{{ formula.versionLabel }}</span>
          </div>
          <button
            class="favorite-button"
            :class="{ active: isFavorite(formula.id) }"
            type="button"
            :aria-label="isFavorite(formula.id) ? '取消收藏' : '加入收藏'"
            @click.stop="$emit('toggle-favorite', formula.id)"
          >{{ isFavorite(formula.id) ? '★' : '☆' }}</button>
        </div>

        <h2>{{ formula.title }}</h2>
        <p>{{ formula.subtitle }}</p>

        <div class="use-tags" aria-label="適用情境">
          <span v-for="item in formula.useCases.slice(0, 3)" :key="item">{{ item }}</span>
        </div>

        <button class="open-button" type="button" @click="$emit('open', formula)">
          打開這張急救卡
          <span aria-hidden="true">→</span>
        </button>
      </article>
    </div>

    <div v-else class="empty-screen">
      <div class="empty-face">◉‿◉</div>
      <h2>{{ emptyTitle }}</h2>
      <p>{{ emptyDescription }}</p>
      <button type="button" @click="$emit('back')">回去挑公式</button>
    </div>
  </section>
</template>

<style scoped>
.formula-screen { min-height: calc(100dvh - 72px); padding: 44px 0 70px; }
.back-button { padding: 10px 14px; border: 1px solid var(--color-line); border-radius: 12px; color: var(--color-text); background: var(--color-surface); font-weight: 850; }
.screen-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 22px; margin: 28px 0 24px; }
.screen-heading h1 { margin: 12px 0 7px; font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.08; }
.screen-heading p { max-width: 720px; margin: 0; color: var(--color-text-soft); font-size: 1rem; line-height: 1.7; }
.count-pill { flex: 0 0 auto; padding: 9px 12px; border: 1px solid var(--color-line); border-radius: 999px; color: var(--color-text-soft); background: var(--color-surface); font-weight: 850; }
.formula-choice-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.formula-choice-card { --accent: var(--color-primary); --soft: var(--color-primary-soft); min-width: 0; display: flex; flex-direction: column; padding: 23px; border: 1px solid var(--card-border, var(--color-line)); border-radius: 20px; background: var(--color-surface); box-shadow: var(--shadow-soft); }
.choice-topline,.badge-row { display: flex; align-items: center; }
.choice-topline { justify-content: space-between; gap: 12px; }
.badge-row { flex-wrap: wrap; gap: 7px; }
.function-badge,.version-badge { padding: 6px 9px; border-radius: 8px; font-size: .74rem; font-weight: 950; }
.function-badge { color: var(--accent); background: var(--soft); }
.version-badge { color: var(--color-text-soft); background: var(--color-surface-2); }
.favorite-button { width: 40px; height: 40px; border: 0; border-radius: 11px; color: #93a2b2; background: transparent; font-size: 1.5rem; }
.favorite-button:hover,.favorite-button.active { color: #d69212; background: var(--color-yellow-soft); }
h2 { margin: 18px 0 7px; font-size: 1.18rem; line-height: 1.45; }
.formula-choice-card>p { margin: 0; color: var(--color-text-soft); line-height: 1.65; }
.use-tags { display: flex; flex-wrap: wrap; gap: 7px; margin: 18px 0 20px; }
.use-tags span { padding: 6px 9px; border-radius: 999px; color: var(--color-text-soft); background: var(--color-surface-2); font-size: .76rem; font-weight: 750; }
.open-button { display: flex; align-items: center; justify-content: space-between; width: 100%; margin-top: auto; padding: 12px 14px; border: 1px solid var(--card-border, var(--color-line)); border-radius: 12px; color: var(--accent); background: var(--soft); font-weight: 950; }
.open-button:hover { filter: saturate(1.08); transform: translateY(-1px); }
.empty-screen { display: grid; place-items: center; min-height: 360px; padding: 44px; border: 1px dashed var(--color-line); border-radius: 22px; background: var(--color-surface); text-align: center; }
.empty-face { display: grid; place-items: center; width: 72px; height: 72px; border: 4px solid var(--color-primary); border-radius: 24px; color: var(--color-primary-strong); background: var(--color-primary-soft); font-weight: 950; }
.empty-screen h2 { margin-bottom: 4px; }
.empty-screen p { margin: 0 0 20px; color: var(--color-text-soft); }
.empty-screen button { padding: 11px 15px; border: 0; border-radius: 11px; color: #fff; background: var(--color-primary); font-weight: 900; }
.tone-green{--accent:#168f5c;--soft:#eefaf3;--card-border:#cfe9d9}.tone-orange{--accent:#dc7411;--soft:#fff5ea;--card-border:#f5dcc1}.tone-blue{--accent:#3179d6;--soft:#eef5ff;--card-border:#cfdef4}.tone-yellow{--accent:#9d6b10;--soft:#fff9ea;--card-border:#f1e1b8}.tone-pink{--accent:#cc4b60;--soft:#fff1f3;--card-border:#f2d4d9}.tone-mint{--accent:#16857a;--soft:#effaf8;--card-border:#cce8e3}
@media(max-width:760px){.formula-screen{padding-top:24px}.screen-heading{align-items:flex-start;flex-direction:column;margin-top:20px}.formula-choice-grid{grid-template-columns:1fr}.formula-choice-card{padding:19px}.count-pill{align-self:flex-start}}
</style>
