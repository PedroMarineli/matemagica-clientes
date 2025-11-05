<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import type { ITasks } from '../../interfaces/ITasks';
import { useRouter } from 'vue-router';
import MaintainTask from './MaintainTask.vue';
import points from "../../../public/icons/points.png";
import type { IClassrooms } from '../../interfaces/IClassrooms';

const router = useRouter()
const tasks = ref<ITasks[] | null>(null)
const classrooms = ref<IClassrooms[] | null>(null)

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/tasks')
        tasks.value = response.data as ITasks[]
        const classes = await axios.get('http://localhost:3000/classrooms')
        classrooms.value = classes.data as IClassrooms[]
    } catch(error) {
        console.error('Error fetching job', error)
    }
})

const showRegisterForm = ref(false)
const showMaintainForm = ref(false)

const selectedTask = ref<ITasks | null>(null)

const formatData = (dataString: string) => {
    if (!dataString) return ''
    const date = new Date(dataString)
    
    return date.toLocaleDateString('pt-BR')
}

const verifyClass = (id: number): string => {
    if(!id || !classrooms) return ''

    const foundClassroom = classrooms.value?.find(
        classroom => classroom.id === id
    )

    return foundClassroom ? foundClassroom.name : ''
}

// const callRegister = () => {
//     if (showMaintainForm.value) {
//         showMaintainForm.value = false
//         selectedTask.value = null
//     }
//     showRegisterForm.value = !showRegisterForm.value
// }
// const closeTaskRegister = () => {
//   showRegisterForm.value = false
// }

const callMaintain = (student: ITasks) => {
    if (showRegisterForm.value) {
        showRegisterForm.value = false
    }
    showMaintainForm.value = !showMaintainForm.value
    selectedTask.value = student
}

const closeMaintainRegister = () => {
  showMaintainForm.value = false
  selectedTask.value = null
}
</script>

<template>
    <div class="w-full h-full flex md:justify-between lg:flex-row flex-1">
        <div class="w-full flex flex-col px-20 items-center gap-5 py-5 lg:py-10 xl:px-56">
            <div class="card w-full flex items-center justify-between">
                <div>
                    <h1>Tarefas</h1>
                    <p>Lista com suas tarefas</p>
                </div>
                <button @click="() => router.push('/professores/adicionar-tarefa')" class="flex py-3 px-10 rounded-xl font-bold transition-smooth cursor-pointer bg-lilac text-white shadow-soft">Adicionar Tarefa</button>
            </div>
            <div class="card w-full overflow-x-auto justify-center">
                <table class="table w-full">
                    <thead class="bg-lilac">
                        <tr>
                            <th>Id</th>
                            <th>Nome (Tipo)</th>
                            <th>Dificuldade</th>
                            <th>Sala</th>
                            <th>Data criação</th>
                            <th>Dados</th>
                        </tr>
                    </thead>
                    <tbody v-if="!tasks || tasks.length === 0">
                        <tr>
                            <td colspan="10">Nenhuma tarefa cadastrada</td>
                        </tr>
                    </tbody>
                    <tbody v-else v-for="task in tasks">
                        <tr>
                            <td>{{task.id}}</td>
                            <td>{{task.title}}
                                ({{ task.type === 'addition' ? 'Adição' :
                                    task.type === 'subtraction' ? 'Subtração' :
                                    task.type === 'multiplication' ? 'Multiplicação' :
                                    task.type === 'division' ? 'Divisão' :
                                    task.type === 'additionWithProblems' ? 'Adição com Problemas' :
                                    task.type === 'subtractionWithProblems' ? 'Subtração com Problemas' :
                                    task.type === 'multiplicationWithProblems' ? 'Multiplicação com Problemas' :
                                    task.type === 'divisionWithProblems' ? 'Divisão com Problemas' : 'Desconhecido' }})</td>
                            <td>{{ task.difficulty === 'easy' ? 'Fácil' : 
                                   task.difficulty === 'medium' ? 'Médio' : 
                                   task.difficulty === 'hard' ? 'Difícil' : 'Desconhecido' }}</td>
                            <td>{{verifyClass(task.classroom_id)}}</td>
                            <td>{{formatData(task.created_at)}}</td>
                            <td>
                                <button @click="callMaintain(task)">
                                    <img :src="points" alt="Mais" class="w-8 h-8 cursor-pointer"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>             
                </table>
            </div>
        </div>
        <aside v-if="showMaintainForm && selectedTask" class="py-5 lg:py-10 bg-white px-16 z-50 fixed top-0 right-0 h-screen w-full lg:w-1/3 shadow-xl">
            <MaintainTask :task-data="selectedTask" @close="closeMaintainRegister"/>
        </aside>
    </div>
</template>