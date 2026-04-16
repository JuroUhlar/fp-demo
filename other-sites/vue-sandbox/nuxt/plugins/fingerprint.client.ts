import { FingerprintPlugin } from '@fingerprint/vue'
import { mainPluginOptions } from '@shared/config'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FingerprintPlugin, {
    ...mainPluginOptions,
    cache: {
      storage: 'sessionStorage',
      duration: 1800,
    },
  })
})
