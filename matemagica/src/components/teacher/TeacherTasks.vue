<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import type { ITasks } from '../../interfaces/ITasks';
import { useRouter } from 'vue-router';
import MaintainTask from './MaintainTask.vue';

const router = useRouter()
const tasks = ref<ITasks[] | null>(null)

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/tasks')
        tasks.value = response.data as ITasks[]
    } catch(error) {
        console.error('Error fetching job', error)
    }
})

const showRegisterForm = ref(false)
const showMaintainForm = ref(false)

const selectedTask = ref<ITasks | null>(null)

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
    <div class="w-full h-full flex md:justify-between lg:flex-row flex-1" :class="{'flex-col-reverse md:h-min': showRegisterForm }">
        <div class="flex flex-col px-56 items-center gap-5 py-5 lg:py-10" :class="{ 'w-full': !showRegisterForm, 'lg:w-2/3': showRegisterForm }">
            <div class="card w-full flex items-center justify-between">
                <div>
                    <h1>Tarefas</h1>
                    <p>Lista com suas tarefas</p>
                </div>
                <button @click="() => router.push('/professores/adicionar-tarefa')">Adicionar Tarefa</button>
            </div>
            <div class="card w-full grid justify-center">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome (Tipo)</th>
                            <th>Conteúdo</th>
                            <th>Resposta</th>
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
                            <td>{{task.title}} ({{ task.type }})</td>
                            <td>{{task.content}}</td>
                            <td>{{task.answer}}</td>
                            <td>{{task.difficulty}}</td>
                            <td>{{task.classroom_id}}</td>
                            <td>{{task.created_at}}</td>
                            <td>
                                <button @click="callMaintain(task)">Dados</button>
                            </td>
                        </tr>
                    </tbody>             
                </table>
            </div>
        </div>
        <aside v-if="showMaintainForm && selectedTask" class="w-full py-5 lg:w-1/3 bg-white px-16 lg:py-10">
            <MaintainTask :task-data="selectedTask" @close="closeMaintainRegister"/>
        </aside>
    </div>
</template>