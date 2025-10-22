import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css'
import 'normalize.css'
createApp(App).use(router).mount('#app')
