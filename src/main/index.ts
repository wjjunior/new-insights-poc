import { createApp } from 'vue'
import { Router } from '@/presentation/pages'
import { makeLogin } from '@/main/factories/pages'

import { store } from '@/presentation/store'
import '@/presentation/styles/global.scss'

createApp(makeLogin).use(Router).use(store).mount('#main')
