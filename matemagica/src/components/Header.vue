<script setup lang="ts">
import { useUserStore } from '../userStore';

const userStore = useUserStore()
</script>

<template>
    <header class="flex justify-between items-center bg-light-green px-5 sm:px-14">
        <img src="../../public/logo.svg" alt="logo" class='lg:top-0 lg:right-0 lg:left-0 w-3xs bottom-0'/>
        <span class="hidden md:block text-2xl font-bold">Professor</span>
        <div class="grid">
            <span class="text-lg">{{ userStore.data?.username }}</span>
            <span class="text-xs">Professor(a)</span>
        </div>
    </header>
</template>
