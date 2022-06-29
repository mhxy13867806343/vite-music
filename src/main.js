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
// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui";
// 采用按需加载时  此全局css样式，需要删除
import "@nutui/nutui/dist/style.css";
import '@/assets/tailwind.css'
import {globalApps} from './utils/app'
const app  = createApp(App)
app.use(createPinia()).use(NutUI);
globalApps(app)
app.use(router).mount('#root')
