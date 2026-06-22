<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useClipboard } from '../composables/useClipboard'

const props = defineProps({
  formula: { type: Object, default: null },
  favorite: { type: Boolean, default: false },
})
const emit = defineEmits(['close', 'toggle-favorite', 'notify'])
const copiedKey = ref('')
const { copyText } = useClipboard()
let resetTimer

async function copyFormula(text, key = 'main') {
  try {
    await copyText(text)
    copiedKey.value = key
    emit('notify', '公式已經複製好了，回 Excel 貼上就行。')
    window.clearTimeout(resetTimer)
    resetTimer = window.setTimeout(() => { copiedKey.value = '' }, 2000)
  } catch {
    emit('notify', '複製失敗，請確認瀏覽器是否允許使用剪貼簿。')
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape' && props.formula) emit('close')
}

watch(() => props.formula, (formula) => {
  document.body.style.overflow = formula ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
  window.clearTimeout(resetTimer)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="formula" class="modal-backdrop" role="presentation" @mousedown.self="$emit('close')">
        <section
          class="formula-modal"
          :class="`tone-${formula.tone}`"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`modal-title-${formula.id}`"
        >
          <header class="modal-header">
            <div class="badge-row">
              <span class="function-badge">{{ formula.functionName }}</span>
              <span class="version-badge">{{ formula.versionLabel }}</span>
            </div>
            <div class="modal-actions">
              <button
                class="favorite-button"
                :class="{ active: favorite }"
                type="button"
                :aria-label="favorite ? '取消收藏' : '加入收藏'"
                @click="$emit('toggle-favorite', formula.id)"
              >{{ favorite ? '★' : '☆' }}</button>
              <button class="close-button" type="button" aria-label="關閉公式卡" @click="$emit('close')">×</button>
            </div>
          </header>

          <div class="modal-scroll">
            <span class="step-label">第三步：公式本人上場</span>
            <h2 :id="`modal-title-${formula.id}`">{{ formula.title }}</h2>
            <p class="subtitle">{{ formula.subtitle }}</p>
            <p class="use-case"><strong>適合用在：</strong>{{ formula.useCases.join('、') }}</p>

            <div class="formula-box">
              <code>{{ formula.formula }}</code>
              <button type="button" @click="copyFormula(formula.formula, 'main')">
                {{ copiedKey === 'main' ? '複製好了！' : '一鍵複製公式' }}
              </button>
            </div>

            <div class="detail-grid">
              <div class="detail-card">
                <h3>你需要修改</h3>
                <p v-if="formula.replacements.length === 0">這張不用改，直接貼回 Excel 就能用。</p>
                <ul v-else>
                  <li v-for="item in formula.replacements" :key="`${formula.id}-${item.value}`">
                    <code>{{ item.value }}</code>
                    <span>{{ item.description }}</span>
                  </li>
                </ul>
              </div>

              <div class="detail-card example-card">
                <h3>實際使用範例</h3>
                <span>{{ formula.example.input }}</span>
                <strong>→ {{ formula.example.output }}</strong>
              </div>
            </div>

            <div v-if="formula.additionalFormulas?.length" class="additional-list">
              <h3>順便送你的其他版本</h3>
              <div v-for="(item, index) in formula.additionalFormulas" :key="item.label" class="extra-formula">
                <div>
                  <small>{{ item.label }}</small>
                  <code>{{ item.formula }}</code>
                </div>
                <button type="button" @click="copyFormula(item.formula, `extra-${index}`)">
                  {{ copiedKey === `extra-${index}` ? '好了！' : '複製' }}
                </button>
              </div>
            </div>

            <p v-if="formula.note" class="note">注意：{{ formula.note }}</p>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 24px; background: rgba(9, 18, 27, .68); backdrop-filter: blur(7px); }
.formula-modal { --accent:var(--color-primary);--soft:var(--color-primary-soft); width: min(760px, 100%); max-height: min(88dvh, 860px); overflow: hidden; border: 1px solid var(--card-border, var(--color-line)); border-radius: 24px; background: var(--color-surface); box-shadow: 0 30px 80px rgba(0,0,0,.35); }
.modal-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 20px; border-bottom: 1px solid var(--color-line); }
.badge-row,.modal-actions { display: flex; align-items: center; gap: 8px; }
.function-badge,.version-badge { padding: 7px 10px; border-radius: 9px; font-size: .76rem; font-weight: 950; }
.function-badge { color: var(--accent); background: var(--soft); }
.version-badge { color: var(--color-text-soft); background: var(--color-surface-2); }
.favorite-button,.close-button { display: grid; place-items: center; width: 42px; height: 42px; border: 0; border-radius: 12px; background: var(--color-surface-2); }
.favorite-button { color: #94a3b1; font-size: 1.5rem; }
.favorite-button.active { color: #d69212; background: var(--color-yellow-soft); }
.close-button { color: var(--color-text); font-size: 1.75rem; line-height: 1; }
.modal-scroll { max-height: calc(min(88dvh, 860px) - 79px); overflow-y: auto; padding: 26px; overscroll-behavior: contain; }
.step-label { display: inline-flex; padding: 7px 10px; border-radius: 999px; color: var(--accent); background: var(--soft); font-size: .78rem; font-weight: 900; }
h2 { margin: 15px 0 7px; font-size: clamp(1.7rem, 4vw, 2.45rem); line-height: 1.2; }
.subtitle,.use-case,.note { color: var(--color-text-soft); line-height: 1.7; }
.subtitle { margin: 0; font-size: 1rem; }
.use-case { margin: 14px 0 0; }
.formula-box { display: flex; align-items: center; gap: 10px; margin: 22px 0; padding: 12px; border: 1px solid var(--card-border, var(--color-line)); border-radius: 15px; background: var(--soft); }
.formula-box code { min-width: 0; flex: 1; overflow-x: auto; padding: 5px; color: #26384b; font-family: Consolas,"SFMono-Regular",monospace; white-space: nowrap; }
.formula-box button,.extra-formula button { flex: 0 0 auto; border: 0; border-radius: 10px; color: #fff; background: var(--accent); font-weight: 900; }
.formula-box button { padding: 11px 14px; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
.detail-card,.additional-list { padding: 17px; border-radius: 15px; background: var(--color-surface-2); }
.detail-card h3,.additional-list h3 { margin: 0 0 11px; font-size: .95rem; }
.detail-card p,.detail-card ul { margin: 0; color: var(--color-text-soft); font-size: .86rem; line-height: 1.7; }
.detail-card ul { display: grid; gap: 7px; padding-left: 19px; }
.detail-card li span { margin-left: 6px; }
.example-card { display: grid; align-content: start; gap: 8px; }
.example-card span { color: var(--color-text-soft); }
.example-card strong { color: var(--accent); }
.additional-list { display: grid; gap: 10px; margin-top: 13px; }
.extra-formula { display: flex; align-items: center; gap: 10px; padding: 11px; border: 1px solid var(--color-line); border-radius: 12px; background: var(--color-surface); }
.extra-formula>div { min-width: 0; display: grid; gap: 5px; flex: 1; }
.extra-formula small { color: var(--color-text-soft); font-weight: 800; }
.extra-formula code { overflow-x: auto; color: var(--color-code); white-space: nowrap; }
.extra-formula button { padding: 8px 10px; }
.note { margin: 13px 0 0; padding: 12px 14px; border-radius: 12px; background: var(--color-yellow-soft); }
.tone-green{--accent:#168f5c;--soft:#eefaf3;--card-border:#cfe9d9}.tone-orange{--accent:#dc7411;--soft:#fff5ea;--card-border:#f5dcc1}.tone-blue{--accent:#3179d6;--soft:#eef5ff;--card-border:#cfdef4}.tone-yellow{--accent:#9d6b10;--soft:#fff9ea;--card-border:#f1e1b8}.tone-pink{--accent:#cc4b60;--soft:#fff1f3;--card-border:#f2d4d9}.tone-mint{--accent:#16857a;--soft:#effaf8;--card-border:#cce8e3}
.modal-fade-enter-active,.modal-fade-leave-active { transition: opacity 160ms ease; }
.modal-fade-enter-active .formula-modal,.modal-fade-leave-active .formula-modal { transition: transform 160ms ease, opacity 160ms ease; }
.modal-fade-enter-from,.modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .formula-modal,.modal-fade-leave-to .formula-modal { opacity: 0; transform: translateY(14px) scale(.985); }
@media(max-width:620px){.modal-backdrop{align-items:end;padding:0}.formula-modal{width:100%;max-height:92dvh;border-radius:24px 24px 0 0}.modal-scroll{max-height:calc(92dvh - 79px);padding:20px 17px calc(24px + env(safe-area-inset-bottom))}.detail-grid{grid-template-columns:1fr}.formula-box{align-items:stretch;flex-direction:column}.formula-box button{width:100%}.extra-formula{align-items:stretch;flex-direction:column}.extra-formula button{width:100%}}
</style>
