<script setup lang="ts">
import { useNotification } from '../stores/notificationStore';

const { state } = useNotification();
</script>

<template>
    <div 
        v-if="state.isVisible"
        :class="state.backgroundColorClass" 
        class="fixed top-5 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded-lg shadow-xl z-[9999] transition-opacity duration-300"
    >
        <p class="font-bold">{{ state.message }}</p>
    </div>
</template>