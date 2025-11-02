<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IUsers } from '../../interfaces/IUsers';
import axios from 'axios';
import type { ITaskProgress } from '../../interfaces/ITasks';
import { useRoute } from 'vue-router';
import type { ITeacherDashboard } from '../../interfaces/ITeacherDashboard';
import task from '../../../public/icons/tasks.png';
import grade from '../../../public/icons/grade.png';

interface StudentPerformance {
    average_score: string
    completed_tasks: string
    id: number
    username: string
}

const studentTasks = ref<ITaskProgress[] | null>([])
const dashboard = ref<ITeacherDashboard | null>(null)
const student = ref<IUsers | null>(null)
const foundStudent = ref<StudentPerformance | null>(null)

const route = useRoute()
const routeId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
const studentIdNum = routeId ? parseInt(routeId as string) : null

onMounted(async () => {
    try {
        const allTasks = await axios.get(`http://localhost:3000/progress/student/${studentIdNum}`)
        studentTasks.value = allTasks.data as ITaskProgress[]
        const teacherDashboard = await axios.get('http://localhost:3000/progress/teacher/dashboard')
        dashboard.value = teacherDashboard.data as ITeacherDashboard
        const user = await axios.get(`http://localhost:3000/users/${studentIdNum}`)
        student.value = user.data as IUsers

        if (!dashboard.value?.studentPerformance) return

        const studentFound = dashboard.value.studentPerformance.find(
            (student: StudentPerformance) => student.id === studentIdNum
        )

        foundStudent.value = studentFound || null
    } catch(error) {
        console.error('Error fetching job', error)
    }
})

const formatData = (dataString: string) => {
    if (!dataString) return ''
    const date = new Date(dataString)
    
    return date.toLocaleDateString('pt-BR')
}
</script>

<template>
    <div class="flex px-56 flex-col items-center gap-5 py-5 lg:py-10">
        <div class="card w-full flex items-center justify-between">
            <div>
                <h1>{{ student?.username }}</h1>
                <p class="text-black/90">Lista de atividades atribuídas a {{ student?.username }}</p>
            </div>
        </div>
        <div class="w-full grid sm:grid-cols-2 gap-4">
            <div class="card">
                <div class="flex items-start gap-4">
                    <div class="bg-lilac p-3 rounded-2xl">
                        <img :src="grade" alt="Nota" class="w-6 h-6"/>
                    </div>
                    <div>
                        <p class="text-2xl font-bold">{{ foundStudent?.average_score || 0 }}</p>
                        <p class="text-sm text-muted-foreground">Nota Média</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="flex items-start gap-4">
                    <div class="bg-lilac p-3 rounded-2xl">
                        <img :src="task" alt="Tarefas" class="w-6 h-6"/>
                    </div>
                    <div>
                        <p class="text-2xl font-bold">{{ foundStudent?.completed_tasks || 0 }}</p>
                        <p class="text-sm text-muted-foreground">Tarefas Completas</p>
                    </div>
                </div>
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
                <tbody v-if="!studentTasks || studentTasks.length === 0">
                    <tr>
                        <td colspan="10">Nenhuma atividade atribuída a {{ student?.username }}</td>
                    </tr>
                </tbody>
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
                        <td>{{ formatData(task.completion_date) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>