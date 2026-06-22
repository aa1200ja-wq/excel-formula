<template>
  <section id="guide" class="guide-section container">
    <div class="guide-card">
      <div>
        <span class="pill">新手使用說明</span>
        <h2>三步驟，秒上手</h2>
        <p>不用先搞懂函數理論，先把眼前的表格救活。</p>
      </div>

      <ol>
        <li><span>1</span><div><strong>先挑症狀</strong><small>首頁只負責選問題，不會把30張公式全攤開。</small></div></li>
        <li><span>2</span><div><strong>再挑公式卡</strong><small>進到下一畫面，從該分類的5張卡裡挑一張。</small></div></li>
        <li><span>3</span><div><strong>彈窗複製</strong><small>打開完整說明，一鍵複製後貼回 Excel。</small></div></li>
      </ol>

      <div class="guide-note">提示：新版限定公式會標示「新版 Excel」，舊版使用者可優先找 VLOOKUP。</div>
    </div>
  </section>
</template>

<style scoped>
.guide-section { padding:12px 0 52px; }
.guide-card { display:grid; grid-template-columns:minmax(230px,.75fr) minmax(0,1.6fr); gap:28px; padding:30px; border:1px solid var(--color-line); border-radius:var(--radius-xl); background:linear-gradient(135deg,var(--color-surface),var(--color-guide-soft)); box-shadow:var(--shadow-card); }
h2 { margin:15px 0 7px; font-size:clamp(1.45rem,2.4vw,2rem); }
p { margin:0; color:var(--color-text-soft); line-height:1.7; }
ol { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin:0; padding:0; list-style:none; }
li { display:grid; grid-template-columns:34px 1fr; gap:10px; padding:16px; border:1px solid var(--color-line); border-radius:15px; background:var(--color-surface); }
li>span { display:grid; place-items:center; width:30px; height:30px; border-radius:999px; color:#fff; background:var(--color-primary); font-size:.8rem; font-weight:950; }
li strong,li small { display:block; }
li small { margin-top:5px; color:var(--color-text-soft); line-height:1.5; }
.guide-note { grid-column:1/-1; padding:11px 13px; border-radius:12px; color:var(--color-text-soft); background:var(--color-yellow-soft); font-size:.84rem; font-weight:750; }
@media(max-width:900px){.guide-card{grid-template-columns:1fr}ol{grid-template-columns:1fr}.guide-note{grid-column:auto}}
</style>
