<script setup>
import RobotMascot from './RobotMascot.vue'

defineEmits(['install'])
</script>

<template>
  <section id="top" class="hero-section">
    <div class="container hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">不用猜關鍵字，直接對症下藥</span>
        <h1>Excel 又在搞你？</h1>
        <p>別再跟搜尋框鬥智。往下挑一個最像你現在慘況的按鈕，公式直接端上來。</p>

        <div class="choice-hints" aria-label="使用特色">
          <span>不用懂函數名</span>
          <span>不用想關鍵字</span>
          <span>點一下就到答案</span>
        </div>

        <div class="hero-actions">
          <a class="primary-action" href="#categories">
            <span class="primary-action-main">選症狀，開始急救</span>
          </a>
          <button class="install-action" type="button" @click="$emit('install')">
            <span class="install-action-icon" aria-hidden="true">↓</span>
            <span>安裝到手機</span>
          </button>
        </div>
        <p class="install-note">先進急救流程最重要；想常駐手機，再點旁邊安裝就好。</p>
      </div>

      <div class="mascot-stage">
        <div class="speech-bubble">不要亂搜啦，<br />直接選你哪裡壞掉。</div>
        <RobotMascot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section { padding: 54px 0 30px; }
.hero-grid { display: grid; grid-template-columns: minmax(0,1.25fr) minmax(280px,.75fr); align-items: center; gap: 32px; min-height: 430px; padding: 42px 48px; border: 1px solid var(--color-line); border-radius: var(--radius-xl); background: linear-gradient(135deg,var(--color-surface),var(--color-hero-soft)); box-shadow: var(--shadow-card); overflow: hidden; }
.eyebrow { display: inline-flex; padding: 7px 11px; border-radius: 999px; color: var(--color-primary-strong); background: var(--color-primary-soft); font-size: .85rem; font-weight: 900; }
h1 { max-width: 720px; margin: 18px 0 12px; font-size: clamp(2.3rem,5vw,4.7rem); line-height: 1.03; letter-spacing: -.05em; }
.hero-copy>p { max-width: 720px; margin: 0; color: var(--color-text-soft); font-size: clamp(1rem,1.6vw,1.2rem); line-height: 1.8; }
.choice-hints { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 24px; }
.choice-hints span { display: inline-flex; align-items: center; gap: 6px; padding: 9px 12px; border: 1px solid var(--color-line); border-radius: 999px; color: var(--color-text); background: var(--color-surface); box-shadow: var(--shadow-soft); font-size: .86rem; font-weight: 850; }
.choice-hints span::before { content: '✓'; color: var(--color-primary); font-weight: 950; }
.hero-actions { display: flex; align-items: flex-end; flex-wrap: wrap; gap: 14px; margin-top: 24px; }
.primary-action { display: inline-flex; justify-content: center; align-items: center; min-height: 72px; min-width: 320px; padding: 15px 24px; border-radius: 17px; color: #fff; background: linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 78%, #0d7a4d) 100%); box-shadow: 0 14px 30px rgba(22,143,92,.28); text-decoration: none; }
.primary-action:hover { transform: translateY(-1px); box-shadow: 0 18px 34px rgba(22,143,92,.3); }
.primary-action-main { font-size: 1.55rem; font-weight: 950; line-height: 1.1; letter-spacing: -.02em; }
.install-action { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; padding: 12px 16px; border: 1px solid color-mix(in srgb,var(--color-primary) 45%,var(--color-line)); border-radius: 13px; color: var(--color-primary-strong); background: color-mix(in srgb, var(--color-surface) 92%, var(--color-primary-soft)); box-shadow: var(--shadow-soft); font-size: .95rem; font-weight: 850; white-space: nowrap; flex: 0 0 auto; }
.install-action:hover { background: var(--color-primary-soft); transform: translateY(-1px); }
.install-action-icon { display: inline-grid; place-items: center; width: 23px; height: 23px; border-radius: 7px; color: #fff; background: var(--color-primary); font-size: 1rem; line-height: 1; }
.hero-copy>.install-note { margin-top: 10px; color: var(--color-text-soft); font-size: .78rem; line-height: 1.5; }
.mascot-stage { position: relative; display: grid; place-items: center; min-height: 330px; }
.speech-bubble { position: absolute; top: 4px; right: 0; z-index: 2; max-width: 205px; padding: 15px 17px; border: 1px solid var(--color-line); border-radius: 18px 18px 18px 5px; color: var(--color-text); background: var(--color-surface); box-shadow: var(--shadow-soft); font-weight: 900; line-height: 1.55; }
@media (max-width:900px){.hero-grid{grid-template-columns:1fr;padding:34px}.mascot-stage{min-height:280px}.speech-bubble{right:8%}}
@media (max-width:560px){.hero-section{padding-top:20px}.hero-grid{min-height:0;padding:26px 20px;gap:18px}h1{font-size:2.5rem}.mascot-stage{min-height:250px}.speech-bubble{top:0;right:0;max-width:170px;font-size:.85rem}.choice-hints{gap:7px}.choice-hints span{padding:8px 10px;font-size:.78rem}.hero-actions{align-items:stretch}.primary-action{width:100%;min-height:82px;justify-content:center;align-items:center}.install-action{width:auto;max-width:220px}.hero-copy>.install-note{text-align:left}}
</style>
