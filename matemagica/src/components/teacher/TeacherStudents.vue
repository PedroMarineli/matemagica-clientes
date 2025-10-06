<script setup lang="ts">
import axios from 'axios';
import RegisterStudent from './RegisterStudent.vue';
import { onMounted, ref } from 'vue';

// 4. A função que altera o estado para esconder o componente
const closeStudentRegister = () => {
  showRegisterForm.value = false;
}

interface Users {
    avatar_url: string
    classroom_id: string
    created_at: string
    email: string
    id: number
    photo_url: string
    type: string
    username: string
}

const students = ref<Users[] | null>(null)

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/users')
        students.value = response.data
    } catch(error) {
        console.error('Error fetching job', error)
    }
})

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
                <tbody v-if="!students || students.length === 0">
                    <tr>
                        <td colspan="10">Nenhum aluno cadastrado</td>
                    </tr>
                </tbody>
                <tbody v-else v-for="student in students">
                    <tr>
                        <td>{{student.id}}</td>
                        <td>{{student.username}}</td>
                        <td>{{student.email}}</td>
                        <td>{{student.type}}</td>
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