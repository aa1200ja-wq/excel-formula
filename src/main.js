import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/variables.css'
import './assets/styles/global.css'
import './assets/styles/responsive.css'

createApp(App).mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(() => {
      // The app still works normally when service workers are unavailable.
    })
  })
}
