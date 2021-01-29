import { createApp } from 'vue'
import { Router, Login } from '@/presentation/pages'
import { store } from '@/presentation/store'
import '@/presentation/styles/global.scss'

createApp(Login).use(Router).use(store).mount('#main')
