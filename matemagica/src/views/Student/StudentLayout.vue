<script setup lang="ts">
import HeaderStudent from '../../components/student/HeaderStudent.vue';

</script>

<template>
    <div class="bg-light-gray flex flex-col min-h-screen underline">
        <HeaderStudent />
        <main class="w-full flex flex-col items-center">
            <RouterView />
        </main>
        <footer class="bottom-0">Rodapé do Aluno</footer>
    </div>
</template>