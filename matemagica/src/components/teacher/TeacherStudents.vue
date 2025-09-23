<script setup lang="ts">
import RegisterStudent from './RegisterStudent.vue';
import { ref } from 'vue';

// 4. A função que altera o estado para esconder o componente
const closeStudentRegister = () => {
  showRegisterForm.value = false;
};

const mocks = [
  { id: 1, name: "Fabio", genre: "M", age: 20 },
  { id: 2, name: "Fabio", genre: "M", age: 20 },
  { id: 3, name: "Fabio", genre: "M", age: 20 },
  { id: 4, name: "Fabio", genre: "M", age: 20 }
]

const showRegisterForm = ref(false)
const callRegister = () => {
    showRegisterForm.value = !showRegisterForm.value
}
</script>

<template>
    <div class="w-full h-full flex md:justify-between lg:flex-row flex-1" :class="{'flex-col-reverse md:h-min': showRegisterForm }">
        <div class="flex flex-col items-center gap-5 py-5 lg:py-10" :class="{ 'w-full': !showRegisterForm, 'lg:w-2/3': showRegisterForm }">
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
            <button @click="callRegister">Adicionar Aluno</button>
        </div>
        <aside v-if="showRegisterForm" class="w-full py-5 lg:w-1/3 bg-white px-16 lg:py-10">
            <RegisterStudent @close="closeStudentRegister"/>
        </aside>
    </div>
</template>