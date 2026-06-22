<template>
  <svg
    class="robot"
    viewBox="0 0 340 260"
    role="img"
    aria-label="可愛的 Excel 公式急救機器人"
  >
    <defs>
      <linearGradient id="bodyGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f8fffb" />
        <stop offset="1" stop-color="#cdeede" />
      </linearGradient>
      <filter id="robotShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#113d2a" flood-opacity="0.17" />
      </filter>
    </defs>

    <g filter="url(#robotShadow)">
      <ellipse cx="170" cy="230" rx="94" ry="15" fill="#dbe7e1" opacity="0.68" />
      <path d="M54 151c-20 2-32 16-30 35 2 20 17 31 36 28l14-3-5-62-15 2Z" fill="#f8fffb" stroke="#23463a" stroke-width="6" />
      <path d="M286 151c20 2 32 16 30 35-2 20-17 31-36 28l-14-3 5-62 15 2Z" fill="#f8fffb" stroke="#23463a" stroke-width="6" />
      <rect x="57" y="76" width="226" height="148" rx="55" fill="url(#bodyGradient)" stroke="#23463a" stroke-width="7" />
      <rect x="84" y="100" width="172" height="92" rx="32" fill="#f9fffc" stroke="#8acdb1" stroke-width="5" />
      <circle cx="131" cy="143" r="11" fill="#203a4b" />
      <circle cx="209" cy="143" r="11" fill="#203a4b" />
      <path d="M149 161c13 15 29 15 42 0" fill="none" stroke="#203a4b" stroke-width="7" stroke-linecap="round" />
      <ellipse cx="111" cy="169" rx="17" ry="9" fill="#ff9fa5" opacity="0.78" />
      <ellipse cx="229" cy="169" rx="17" ry="9" fill="#ff9fa5" opacity="0.78" />
      <path d="M170 76V47" stroke="#23463a" stroke-width="7" stroke-linecap="round" />
      <circle cx="170" cy="35" r="14" fill="#44b277" stroke="#23463a" stroke-width="6" />
      <path d="M96 220v15M244 220v15" stroke="#23463a" stroke-width="8" stroke-linecap="round" />
      <path d="M75 235h41M224 235h41" stroke="#23463a" stroke-width="8" stroke-linecap="round" />
    </g>

    <g class="sparkles">
      <path d="M52 61v24M40 73h24" stroke="#f5b83b" stroke-width="7" stroke-linecap="round" />
      <path d="M294 61v18M285 70h18" stroke="#3179d6" stroke-width="6" stroke-linecap="round" />
      <path d="M306 108v14M299 115h14" stroke="#f5b83b" stroke-width="5" stroke-linecap="round" />
    </g>
  </svg>
</template>

<style scoped>
.robot {
  display: block;
  width: min(100%, 330px);
  height: auto;
  overflow: visible;
}

.sparkles {
  transform-origin: center;
  animation: sparkle 2.4s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 0.5; transform: scale(0.94); }
  50% { opacity: 1; transform: scale(1.03); }
}

@media (prefers-reduced-motion: reduce) {
  .sparkles { animation: none; }
}
</style>
