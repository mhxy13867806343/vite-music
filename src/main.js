import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './utils'
import { createPinia } from "pinia";

import '@/assets/tailwind.css'
import {globalApps} from './utils/app'
const app  = createApp(App)
app.use(createPinia());
globalApps(app)
app.use(router).mount('#root')
