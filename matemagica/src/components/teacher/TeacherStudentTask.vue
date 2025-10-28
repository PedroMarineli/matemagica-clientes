<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IUsers } from '../../interfaces/IUsers';
import axios from 'axios';
import type { ITaskProgress } from '../../interfaces/ITasks';
import { useRoute } from 'vue-router';

const studentTasks = ref<ITaskProgress[] | null>([])
const student = ref<IUsers | null>(null)

const route = useRoute()
const studentId = route.params.id

onMounted(async () => {
    try {
        const allTasks = await axios.get(`http://localhost:3000/progress/student/${studentId}`)
        studentTasks.value = allTasks.data as ITaskProgress[]
        const user = await axios.get(`http://localhost:3000/users/${studentId}`)
        student.value = user.data as IUsers
    } catch(error) {
        console.error('Error fetching job', error)
    }
})
</script>

<template>
    <div class="flex px-56 flex-col items-center gap-5 py-5 lg:py-10">
        <div class="card w-full flex items-center justify-between">
            <div>
                <h1>{{ student?.username }}</h1>
                <p class="text-black/90">Lista de atividades atribuídas a {{ student?.username }}</p>
            </div>
        </div>
        <div class="card w-full grid justify-center">
            <table class="table">
                <thead class="bg-lilac">
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Dificuldade</th>
                        <th>Status</th>
                        <th>Nota</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody v-for="task in studentTasks">
                    <tr>
                        <td>{{ task.title }}</td>
                        <td>{{ task.type }}</td>
                        <td>{{ task.difficulty === 'easy' ? 'Fácil' : 
                               task.difficulty === 'medium' ? 'Médio' : 
                               task.difficulty === 'hard' ? 'Difícil' : 'Desconhecido' }}</td>
                        <td>{{ task.status === 'In Progress' ? 'Em Progresso' : 
                               task.status === 'Not Started' ? 'Não Iniciado' : 
                               task.status === 'Graded' ? 'Corriido' : 
                               task.status === 'Submitted' ? 'Submetido' : 'Desconhecido' }}</td>
                        <td>{{ task.score }}</td>
                        <td>{{ task.completion_date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>