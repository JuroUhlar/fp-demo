import { createApp } from 'vue'
import { FingerprintPlugin } from '@fingerprint/vue'
import { mainPluginOptions } from '@shared/config'
import App from './App.vue'

createApp(App)
  .use(FingerprintPlugin, {
    ...mainPluginOptions,
    cache: {
      storage: 'localStorage',
      duration: 1800,
    },
  })
  .mount('#app')
