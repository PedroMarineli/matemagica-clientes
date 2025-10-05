import { defineStore } from 'pinia';

interface User {
    avatar_url: string
    classroom_id: string
    created_at: string
    email: string
    id: number
    photo_url: string
    type: string
    username: string
}

export const useUserStore = defineStore('user', {
    persist: true,
    state: () => ({
        data: null as User | null,
    }),
    actions: {
        setUserData(userData: User) {
            this.data = userData
        },
        clearUserData() {
            this.data = null
        }
    },
})