<script setup lang="ts">
const mocks = [
  { id: 1, name: "Fabio", genre: "M", age: 20 },
  { id: 2, name: "Fabio", genre: "M", age: 20 },
  { id: 3, name: "Fabio", genre: "M", age: 20 },
  { id: 4, name: "Fabio", genre: "M", age: 20 }
];
</script>

<template>
    <h1>Alunos:</h1>
    <table class="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Gênero</th>
                <th>Idade</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody v-if="!mocks || mocks.length === 0">
            <tr>
                <td colspan="10">Nenhum aluno cadastrado</td>
            </tr>
        </tbody>
        <tbody v-else v-for="mock in mocks">
            <tr>
                <td>{{mock.id}}</td>
                <td>{{mock.name}}</td>
                <td>{{mock.genre}}</td>
                <td>{{mock.age}}</td>
                <td>Dados</td>
            </tr>
        </tbody>
    </table>
</template>