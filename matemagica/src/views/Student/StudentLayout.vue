<script setup lang="ts">
import Header from '../../components/Header.vue';

</script>

<template>
    <div class="bg-light-blue flex flex-col min-h-screen">
        <Header />
        <main class="w-full flex flex-col items-center">
            <RouterView />
        </main>
        <footer class="absolute bottom-0">Rodapé do Aluno</footer>
    </div>
</template>