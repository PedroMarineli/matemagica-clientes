<script setup lang="ts">
import RegisterClass from './RegisterClass.vue';
import { ref } from 'vue';

// 4. A função que altera o estado para esconder o componente
const closeClassRegister = () => {
  showRegisterForm.value = false;
};
const mocks = [
  { id: 1, class: "1º Ano A", students: 12 },
  { id: 2, class: "1º Ano A", students: 18 },
  { id: 3, class: "1º Ano A", students: 14 },
  { id: 4, class: "1º Ano A", students: 15 }
];

const showRegisterForm = ref(false)
const callRegister = () => {
    showRegisterForm.value = !showRegisterForm.value
}
</script>

<template>
    <div class="w-full h-full flex md:justify-between lg:flex-row flex-1" :class="{'flex-col-reverse md:h-min': showRegisterForm }">
        <div class="flex flex-col items-center gap-5 py-5 lg:py-10" :class="{ 'w-full': !showRegisterForm, 'lg:w-2/3': showRegisterForm }">
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
            <button @click="callRegister">Adicionar Sala</button>
        </div>
        <aside v-if="showRegisterForm" class="w-full py-5 lg:w-1/3 bg-white px-16 lg:py-10">
            <RegisterClass @close="closeClassRegister"/>
        </aside>
    </div>
</template>