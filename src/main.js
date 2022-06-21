import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './utils'
import {globalApps} from './utils/app'
const app  = createApp(App)

globalApps(app)
app.use(router).mount('#root')
