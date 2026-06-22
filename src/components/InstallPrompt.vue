<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const emit = defineEmits(['notify'])
const deferredPrompt = ref(null)
const isStandalone = ref(false)
const helpMode = ref('')

const userAgent = navigator.userAgent || ''
const isIos = /iphone|ipad|ipod/i.test(userAgent) && !window.MSStream
const isInAppBrowser = /Line|FBAN|FBAV|Instagram|Messenger/i.test(userAgent)

function updateStandalone() {
  isStandalone.value = window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true
}

function handleBeforeInstall(event) {
  event.preventDefault()
  deferredPrompt.value = event
}

function handleInstalled() {
  deferredPrompt.value = null
  isStandalone.value = true
  helpMode.value = ''
  emit('notify', '安裝完成！公式小幫手住進你的主畫面了。')
}

async function requestInstall() {
  updateStandalone()
  if (isStandalone.value) {
    emit('notify', '已經裝好了，公式小幫手就在你的主畫面。')
    return
  }

  if (isIos) {
    helpMode.value = 'ios'
    return
  }

  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const result = await deferredPrompt.value.userChoice
    deferredPrompt.value = null
    emit('notify', result.outcome === 'accepted' ? '安裝邀請已送出。' : '這次先不裝，之後還能再按。')
    return
  }

  helpMode.value = 'browser'
}

function closeHelp() {
  helpMode.value = ''
}

function handleKeydown(event) {
  if (event.key === 'Escape') closeHelp()
}

defineExpose({ requestInstall })

onMounted(() => {
  updateStandalone()
  window.addEventListener('beforeinstallprompt', handleBeforeInstall)
  window.addEventListener('appinstalled', handleInstalled)
  window.addEventListener('keydown', handleKeydown)
  window.matchMedia?.('(display-mode: standalone)').addEventListener?.('change', updateStandalone)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
  window.removeEventListener('appinstalled', handleInstalled)
  window.removeEventListener('keydown', handleKeydown)
  window.matchMedia?.('(display-mode: standalone)').removeEventListener?.('change', updateStandalone)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="install-modal">
      <div v-if="helpMode" class="install-overlay" role="presentation" @click.self="closeHelp">
        <section class="install-dialog" role="dialog" aria-modal="true" aria-labelledby="install-title">
          <button class="close-button" type="button" aria-label="關閉安裝說明" @click="closeHelp">×</button>
          <img src="/icons/icon-192.png" alt="" width="64" height="64" />

          <template v-if="helpMode === 'ios'">
            <span class="dialog-eyebrow">iPhone／iPad 安裝方式</span>
            <h2 id="install-title">把公式小幫手放到主畫面</h2>
            <p v-if="isInAppBrowser" class="browser-warning">你現在可能在 LINE、Facebook 或 Instagram 裡。請先選「用 Safari 開啟」，再照下面操作。</p>
            <ol class="install-steps">
              <li><strong>用 Safari 開啟這個網頁</strong><span>若已經在 Safari，可直接進下一步。</span></li>
              <li><strong>點下面工具列的「分享」按鈕</strong><span>圖示是方框上面有一支向上的箭頭。</span></li>
              <li><strong>往下找到「加入主畫面」</strong><span>看不到時可在動作清單中繼續往下滑。</span></li>
              <li><strong>右上角按「加入」</strong><span>完成後會像 App 一樣出現在桌面。</span></li>
            </ol>
          </template>

          <template v-else>
            <span class="dialog-eyebrow">安裝到裝置</span>
            <h2 id="install-title">瀏覽器還沒跳出安裝視窗</h2>
            <p class="dialog-description">請打開瀏覽器選單，選擇「安裝應用程式」或「加到主畫面」。完成後就能從桌面直接開啟。</p>
            <ol class="install-steps compact">
              <li><strong>Chrome／Edge</strong><span>開啟右上角選單 → 安裝應用程式。</span></li>
              <li><strong>Android 手機</strong><span>開啟瀏覽器選單 → 加到主畫面。</span></li>
            </ol>
          </template>

          <button class="done-button" type="button" @click="closeHelp">知道了，我來裝</button>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.install-overlay { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px; background: rgba(8,22,34,.62); backdrop-filter: blur(8px); }
.install-dialog { position: relative; width: min(100%,520px); max-height: min(760px,calc(100dvh - 40px)); overflow: auto; padding: 28px; border: 1px solid var(--color-line); border-radius: 24px; color: var(--color-text); background: var(--color-surface); box-shadow: 0 28px 80px rgba(5,19,31,.36); }
.install-dialog>img { display: block; margin: 0 auto 14px; border-radius: 17px; box-shadow: var(--shadow-soft); }
.dialog-eyebrow { display: block; color: var(--color-primary-strong); font-size: .78rem; font-weight: 900; text-align: center; }
h2 { margin: 8px 34px 10px; font-size: clamp(1.35rem,4vw,1.8rem); text-align: center; }
.dialog-description { margin: 0 0 18px; color: var(--color-text-soft); line-height: 1.7; text-align: center; }
.browser-warning { margin: 14px 0; padding: 12px 14px; border: 1px solid #f2c26b; border-radius: 13px; color: #724b00; background: #fff6df; font-size: .88rem; font-weight: 800; line-height: 1.55; }
.install-steps { display: grid; gap: 10px; margin: 20px 0 0; padding: 0; list-style: none; counter-reset: step; }
.install-steps li { position: relative; display: grid; gap: 3px; min-height: 58px; padding: 11px 12px 11px 56px; border: 1px solid var(--color-line); border-radius: 14px; background: var(--color-page); counter-increment: step; }
.install-steps li::before { content: counter(step); position: absolute; left: 13px; top: 12px; display: grid; place-items: center; width: 31px; height: 31px; border-radius: 10px; color: #fff; background: var(--color-primary); font-weight: 950; }
.install-steps strong { font-size: .94rem; }
.install-steps span { color: var(--color-text-soft); font-size: .8rem; line-height: 1.45; }
.install-steps.compact li { min-height: 52px; }
.done-button { width: 100%; margin-top: 20px; padding: 13px 16px; border: 0; border-radius: 13px; color: #fff; background: var(--color-primary); font-weight: 900; }
.close-button { position: absolute; top: 15px; right: 15px; display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid var(--color-line); border-radius: 999px; color: var(--color-text-soft); background: var(--color-page); font-size: 1.2rem; font-weight: 900; }
.install-modal-enter-active,.install-modal-leave-active { transition: opacity 160ms ease; }
.install-modal-enter-active .install-dialog,.install-modal-leave-active .install-dialog { transition: transform 180ms ease,opacity 180ms ease; }
.install-modal-enter-from,.install-modal-leave-to { opacity: 0; }
.install-modal-enter-from .install-dialog,.install-modal-leave-to .install-dialog { opacity: 0; transform: translateY(12px) scale(.98); }
@media (max-width:560px) { .install-overlay { align-items: end; padding: 10px; } .install-dialog { max-height: calc(100dvh - 20px - env(safe-area-inset-top)); padding: 23px 18px calc(20px + env(safe-area-inset-bottom)); border-radius: 22px 22px 18px 18px; } h2 { margin-inline: 30px; } }
</style>
