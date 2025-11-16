import axios, { AxiosError } from 'axios';
import { useUserStore } from '../userStore';
import router from '../router';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 403) {
      console.log('Redirecionando para login.')

      const userStore = useUserStore()
      userStore.clearUserData()

      router.push('/login')

      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export function setAuthHeader(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api