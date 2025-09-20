<script setup lang="ts">
const mocks = [
  { id: 1, class: "1º Ano A", students: 12 },
  { id: 2, class: "1º Ano A", students: 18 },
  { id: 3, class: "1º Ano A", students: 14 },
  { id: 4, class: "1º Ano A", students: 15 }
];
</script>

<template>
    <h1>Salas:</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Salas</th>
                <th>Alunos</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody v-if="!mocks || mocks.length === 0">
            <tr>
                <td colspan="10">Nenhuma sala cadastrada</td>
            </tr>
        </tbody>
        <tbody v-else v-for="mock in mocks">
            <tr>
                <td>{{mock.id}}</td>
                <td>{{mock.class}}</td>
                <td>{{mock.students}}</td>
                <td>Dados</td>
            </tr>
        </tbody>
    </table>
    <button>Adicionar Sala</button>
</template>