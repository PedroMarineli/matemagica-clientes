import { defineStore } from 'pinia';
import type { IUserdata } from './interfaces/IUsers';

export const useUserStore = defineStore('user', {
    persist: true,
    state: () => ({
        data: null as IUserdata | null,
    }),
    actions: {
        setUserData(userData: IUserdata) {
            this.data = userData
        },
        clearUserData() {
            this.data = null
        }
    },
})