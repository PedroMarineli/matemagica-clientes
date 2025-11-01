import { reactive } from "vue"

interface NotificationStore {
    message: string
    backgroundColorClass: string
    isVisible: boolean 
}

const state = reactive<NotificationStore>({
    message: '',
    backgroundColorClass: '',
    isVisible: false
})

let timeoutId: number | null = null
const duration = 5000 //2 segundos

export const showNotification = (message: string, colorClass: string) => {
    if (timeoutId !== null) {
        clearTimeout(timeoutId)
    }

    state.message = message
    state.backgroundColorClass = colorClass
    state.isVisible = true

    timeoutId = setTimeout(() => {
        state.isVisible = false
    }, duration)
}

export const useNotification = () => {
    return {
        state,
        showNotification
    }
}