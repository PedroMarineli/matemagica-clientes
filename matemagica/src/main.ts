import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useUserStore } from './userStore'
import axios from 'axios'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const userStore = useUserStore()

if (userStore.data?.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userStore.data.token}`
}

app.mount('#app')
