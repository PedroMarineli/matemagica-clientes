<script setup lang="ts">
import AsideTeacher from '../../components/teacher/AsideTeacher.vue';
import Header from '../../components/Header.vue';

</script>

<template>
    <div class="flex flex-col min-h-screen">
        <Header />
        <div class="flex flex-col md:flex-row flex-1">
            <AsideTeacher />
            <main class="w-full flex flex-col items-center">
                <RouterView />
            </main>
        </div>
    </div>
</template>