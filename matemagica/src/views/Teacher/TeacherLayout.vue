<script setup lang="ts">
import AsideTeacher from '../../components/AsideTeacher.vue';
import Header from '../../components/Header.vue';

</script>

<template>
    <div class="bg-light-blue flex flex-col min-h-screen">
        <Header />
        <div class="flex flex-1">
            <AsideTeacher />
            <main>
                <RouterView />
            </main>
        </div>
        <footer class="absolute bottom-0">Rodapé do Aluno</footer>
    </div>
</template>