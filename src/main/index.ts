import { createApp } from 'vue'
import { Router } from '@/presentation/pages'

import { store } from '@/presentation/store'
import '@/presentation/styles/global.scss'
import { makeApp } from './factories/pages'

createApp(makeApp).use(Router).use(store).mount('#main')
