import { createApp } from 'vue'
import { FingerprintPlugin } from '@fingerprint/vue'
import { getBootStartOptions } from '@shared/config'
import App from './App.vue'

createApp(App).use(FingerprintPlugin, getBootStartOptions()).mount('#app')
