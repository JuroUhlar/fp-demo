import { FingerprintPlugin } from '@fingerprint/vue'
import { getBootStartOptions } from '@shared/config'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FingerprintPlugin, getBootStartOptions())
})
