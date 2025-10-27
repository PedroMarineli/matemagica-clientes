<script setup lang="ts">
import axios from 'axios';
import RegisterStudent from './RegisterStudent.vue';
import { onMounted, ref } from 'vue';
import type { IUsers } from '../../interfaces/IUsers';
import MaintainStudent from './MaintainStudent.vue';
import router from '../../router';

const students = ref<IUsers[] | null>(null)
const selectedStudent = ref<IUsers | null>(null)

const showRegisterForm = ref(false)
const showMaintainForm = ref(false)

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/users')
        students.value = response.data as IUsers[]
    } catch(error) {
        console.error('Error fetching job', error)
    }
})

const exibirDadosAluno = async (student: IUsers) => {
    try {
        router.push(`/professores/aluno/${student.id}`)
    } catch(error) {
        console.error('Error fetching job', error)
    } 
}

const callRegister = () => {
    if (showMaintainForm.value) {
        showMaintainForm.value = false
        selectedStudent.value = null
    }
    showRegisterForm.value = !showRegisterForm.value
}
const closeStudentRegister = () => {
  showRegisterForm.value = false
}

const callMaintain = (student: IUsers) => {
    if (showRegisterForm.value) {
        showRegisterForm.value = false
    }
    showMaintainForm.value = !showMaintainForm.value
    selectedStudent.value = student 
}
const closeMaintainRegister = () => {
  showMaintainForm.value = false
  selectedStudent.value = null
}
</script>

<template>
    <div class="w-full h-full flex md:justify-between lg:flex-row flex-1" :class="{'flex-col-reverse md:h-min': showRegisterForm }">
        <div class="flex px-56 flex-col items-center gap-5 py-5 lg:py-10" :class="{ 'w-full': !showRegisterForm, 'lg:w-2/3': showRegisterForm }">
            <div class="card w-full flex items-center justify-between">
                <div>
                    <h1>Alunos</h1>
                    <p>Lista com seus alunos</p>
                </div>
                <button @click="callRegister">Adicionar Aluno</button>
            </div>
            <div class="card w-full grid justify-center">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody v-if="!students || students.length === 0">
                        <tr>
                            <td colspan="10">Nenhum aluno cadastrado</td>
                        </tr>
                    </tbody>
                    <tbody v-else v-for="student in students">
                        <tr v-if="student.type === 'student'" @click="exibirDadosAluno(student)">
                            <td>{{student.id}}</td>
                            <td>{{student.username}}</td>
                            <td>{{student.email}}</td>
                            <td @click.stop>
                                <button @click="callMaintain(student)">Dados</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <aside v-if="showRegisterForm" class="w-full py-5 lg:w-1/3 bg-white px-16 lg:py-10">
            <RegisterStudent @close="closeStudentRegister"/>
        </aside>
        <aside v-if="showMaintainForm && selectedStudent" class="w-full py-5 lg:w-1/3 bg-white px-16 lg:py-10">
            <MaintainStudent :student-data="selectedStudent" @close="closeMaintainRegister"/>
        </aside>
    </div>
</template>