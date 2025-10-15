<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUserStore } from '../userStore';

const userStore = useUserStore()
</script>

<template>
    <!-- <header class="flex justify-between items-center bg-light-green px-5 sm:px-14">
        <img src="../../public/logo.svg" alt="logo" class='lg:top-0 lg:right-0 lg:left-0 w-3xs bottom-0'/>
        <span class="hidden md:block text-2xl font-bold">Professor</span>
        <div class="grid">
            <span class="text-lg">{{ userStore.data?.username }}</span>
            <span class="text-xs">Professor(a)</span>
        </div>
    </header> -->
    <header className="bg-white bg-card border-1 border-b-gray-300 shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
                <img src="../../public/logo.svg" alt="logo" class='lg:top-0 lg:right-0 lg:left-0 w-3xs bottom-0'/>
                <!-- <div to="/" className="flex items-center gap-2 transition-smooth hover:scale-105">
                    <div className="bg-gradient-primary rounded-2xl p-2 shadow-medium">
                    <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-lilac">Matemágica</span>
                </div> -->

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="font-bold">Prof. {{ userStore.data?.username }}</p>
                        <p className="text-sm text-muted-foreground">{{ userStore.data?.email }}</p>
                    </div>
                    <button variant="ghost" size="icon" asChild>
                        <RouterLink @click="() => userStore.clearUserData()" to="/login">
                            Logout
                        </RouterLink>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
