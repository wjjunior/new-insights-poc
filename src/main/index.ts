import { createApp } from "vue";
import { Router, Login } from "@/presentation/pages";
import '@/presentation/styles/global.scss'

createApp(Login).use(Router).mount("#main");
