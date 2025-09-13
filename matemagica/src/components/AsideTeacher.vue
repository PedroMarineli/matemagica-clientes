<script setup lang="ts">
const top = [
  { nome: "Geral" },
  { nome: "Alunos" },
  { nome: "Salas" },
  { nome: "Tarefas" },
];
</script>

<template>
    <aside class="w-1/6 bg-light-brown">
        <ul>
            <li v-for="item in top" :key="item.nome">
                <span>{{ item.nome }}</span>
            </li>
        </ul>
    </aside>
</template>