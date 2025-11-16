<script setup lang="ts">
import RegisterStudent from './RegisterStudent.vue';
import { onMounted, ref } from 'vue';
import type { IUsers } from '../../interfaces/IUsers';
import MaintainStudent from './MaintainStudent.vue';
import router from '../../router';
import points from "../../../public/icons/points.png";
import type { IClassrooms } from '../../interfaces/IClassrooms';
import api from '../../services/api';

const students = ref<IUsers[] | null>(null)
const selectedStudent = ref<IUsers | null>(null)
const classrooms = ref<IClassrooms[] | null>(null)

const showRegisterForm = ref(false)
const showMaintainForm = ref(false)

onMounted(async () => {
    try {
        const users = await api.get('http://localhost:3000/users')
        students.value = users.data as IUsers[]
        const classes = await api.get('http://localhost:3000/classrooms')
        classrooms.value = classes.data as IClassrooms[]
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

const verifyClass = (id: number): string => {
    if(!id || !classrooms.value) return ''

    const foundClassroom = classrooms.value.find(
        classroom => classroom.id === id
    )

    return foundClassroom ? foundClassroom.name : ''
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
    <div class="w-full h-full flex md:justify-between lg:flex-row flex-1" :class="{'flex-col-reverse md:h-min': showRegisterForm || showMaintainForm }">
        <div class="flex flex-col items-center gap-5 py-5 lg:py-10" :class="{ 'px-20 xl:px-56 w-full': !showRegisterForm && !showMaintainForm, 'px-20 lg:w-2/3': showRegisterForm || showMaintainForm }">
            <div class="card w-full flex items-center justify-between">
                <div>
                    <h1>Alunos</h1>
                    <p>Lista com seus alunos</p>
                </div>
                <button @click="callRegister" class="flex py-3 px-10 rounded-xl font-bold transition-smooth cursor-pointer bg-lilac text-white shadow-soft">Adicionar Aluno</button>
            </div>
            <div class="card w-full grid overflow-x-auto justify-center">
                <table class="table">
                    <thead class="bg-lilac">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Sala de Aula</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody v-if="!students || students.length === 0">
                        <tr>
                            <td colspan="10">Nenhum aluno cadastrado</td>
                        </tr>
                    </tbody>
                    <tbody v-else v-for="student in students">
                        <tr class="cursor-pointer" v-if="student.type === 'student'" @click="exibirDadosAluno(student)">
                            <td>{{student.id}}</td>
                            <td>{{student.username}}</td>
                            <td>{{student.email}}</td>
                            <td>{{verifyClass(student.classroom_id)}}</td>
                            <td @click.stop>
                                <button @click="callMaintain(student)">
                                    <img :src="points" alt="Mais" class="w-8 h-8 cursor-pointer"/>
                                </button>
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