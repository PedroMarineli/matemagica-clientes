<script setup lang="ts">
import HeaderStudent from '../../components/student/HeaderStudent.vue';

</script>

<template>
    <div class="flex flex-col min-h-screen underline">
        <HeaderStudent />
        <main class="w-full flex flex-col items-center">
            <RouterView />
        </main>
    </div>
    <footer class="text-center pt-10 bottom-0 text-muted-foreground">Matemágica - 2025</footer>
</template>