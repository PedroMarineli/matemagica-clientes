import { defineStore } from 'pinia';
import type { IUsers } from './interfaces/IUsers';

export const useUserStore = defineStore('user', {
    persist: true,
    state: () => ({
        data: null as IUsers | null,
    }),
    actions: {
        setUserData(userData: IUsers) {
            this.data = userData
        },
        clearUserData() {
            this.data = null
        }
    },
})