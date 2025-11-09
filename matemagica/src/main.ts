import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useUserStore } from './userStore'
import axios from 'axios'
import { showNotification } from './stores/notificationStore'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const userStore = useUserStore()

if (userStore.data?.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userStore.data.token}`
}

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const userStore = useUserStore()
        
        const status = error.response ? error.response.status : null

        if (status === 401) {
            showNotification('Token expirado ou não autorizado. Redirecionando para login.', 'bg-red-500')

            userStore.clearUserData()

            router.push('/login')
        }

        return Promise.reject(error);
    }
);

app.mount('#app')
