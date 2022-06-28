import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import '@/assets/font/iconfont.css'
import './utils'
import { createPinia } from "pinia";
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

import '@/assets/tailwind.css'
import {globalApps} from './utils/app'
const app  = createApp(App)
app.use(createPinia());
globalApps(app)
app.use(router).mount('#root')
