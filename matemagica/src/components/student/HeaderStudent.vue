<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '../../userStore';
import { MdSharpLogout } from '@kalimahapps/vue-icons';

const userStore = useUserStore()
</script>

<template>
    <header className="bg-white bg-card border-1 border-b-gray-300 shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
                <img src="../../../public/logo.svg" alt="logo" class='lg:top-0 lg:right-0 lg:left-0 w-3xs bottom-0'/>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="font-bold">{{ userStore.data?.username }}</p>
                        <p className="text-sm text-muted-foreground">Aluno</p>
                    </div>
                    <button variant="ghost" size="icon" asChild>
                        <RouterLink @click="() => userStore.clearUserData()" to="/login">
                            Logout
                            <MdSharpLogout/>
                            <!-- <LogOut className="w-5 h-5" /> -->
                        </RouterLink>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
