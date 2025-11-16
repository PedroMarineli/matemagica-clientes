import { defineStore } from 'pinia';
import type { IUserdata } from './interfaces/IUsers';
import { setAuthHeader } from './services/api';

export const useUserStore = defineStore('user', {
    persist: true,
    state: () => ({
        data: null as IUserdata | null,
    }),
    actions: {
        setUserData(userData: IUserdata) {
            this.data = userData
            setAuthHeader(userData.token)
        },
        clearUserData() {
            this.data = null
            setAuthHeader(null)
        }
    },
})