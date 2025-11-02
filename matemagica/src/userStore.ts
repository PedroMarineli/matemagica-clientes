import { defineStore } from 'pinia';
import type { IUsers } from './interfaces/IUsers';

interface userdata {
    token: string
    user: IUsers
}

export const useUserStore = defineStore('user', {
    persist: true,
    state: () => ({
        data: null as userdata | null,
    }),
    actions: {
        setUserData(userData: userdata) {
            this.data = userData
        },
        clearUserData() {
            this.data = null
        }
    },
})