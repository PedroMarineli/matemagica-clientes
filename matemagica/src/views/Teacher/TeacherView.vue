<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../userStore';
import type { ITeacherDashboard } from '../../interfaces/ITeacherDashboard';
import type { IListProgressInATask } from '../../interfaces/ITasks';
import students from "../../../public/icons/students.png";
import classes from "../../../public/icons/class.png";
import tasks from "../../../public/icons/tasks.png";
import api from '../../services/api';

const userStore = useUserStore()
const dashboard = ref<ITeacherDashboard | null>(null)
const progresses = ref<IListProgressInATask[] | null>([])

console.log(userStore.data?.token)

onMounted(async () => {
    try {
        const teacherDashboard = await api.get('http://localhost:3000/progress/teacher/dashboard')
        dashboard.value = teacherDashboard.data as ITeacherDashboard
        const listProgressInATask = await api.get(`http://localhost:3000/progress/task/10`)
        progresses.value = listProgressInATask.data as IListProgressInATask[]
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
    <main class="w-full px-20 py-10 lg:col-span-3 space-y-6 xl:px-56">
        <!-- Welcome section -->
        <div class="card">
            <div class="flex items-start gap-4">
                <div>
                    <h1 class="font-bold mb-2">Bem-vindo(a), {{ userStore.data?.user.username }}! 👋</h1>
                    <p class="text-black/90">Aqui está o resumo das suas turmas hoje</p>
                </div>
            </div>
        </div>

        <!-- Stats -->
        <div class="grid sm:grid-cols-3 gap-4">
            <div class="card">
                <div class="flex items-start gap-4">
                    <div class="bg-lilac p-3 rounded-2xl">
                        <img :src="students" alt="Alunos" class="w-6 h-6"/>
                    </div>
                    <div>
                        <p class="text-2xl font-bold">{{ dashboard?.generalStats.total_students }}</p>
                        <p class="text-sm text-muted-foreground">Alunos</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="flex items-start gap-4">
                    <div class="bg-lilac p-3 rounded-2xl">
                        <img :src="classes" alt="Salas" class="w-6 h-6"/>
                    </div>
                    <div>
                        <p class="text-2xl font-bold">{{ dashboard?.generalStats.total_classrooms }}</p>
                        <p class="text-sm text-muted-foreground">Salas</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="flex items-start gap-4">
                    <div class="bg-lilac p-3 rounded-2xl">
                        <img :src="tasks" alt="Tarefas" class="w-6 h-6"/>
                    </div>
                    <div>
                        <p class="text-2xl font-bold">{{ dashboard?.generalStats.total_tasks }}</p>
                        <p class="text-sm text-muted-foreground">Tarefas Ativas</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent activity -->
        <div class="card">
            <h2 class="text-xl font-bold mb-4">Atividade Recente</h2>
            <div v-for="progress in progresses" class="space-y-3">
                <div v-if="progress.status === 'Submitted'" class="grid gap-5">
                    <div key="progress" class="bg-background flex items-center gap-4 p-3 rounded-xl bg-background/50 hover:bg-background transition-smooth">
                        <div class="hidden sm:block w-10 h-10 rounded-full bg-lilac/10 items-center justify-center">
                            👧
                        </div>
                        <div class="flex-1">
                            <p class="font-semibold">{{ progress.username }} completou "Adição Básica"</p>
                            <p class="text-sm text-muted-foreground">{{ formatData(progress.completion_date) }} • Nota {{ progress.score }}</p>
                            <p class="text-sm text-muted-foreground">Submetido</p>
                        </div>
                        <div class="hidden sm:block text-right">
                            <p class="text-lg font-bold">100%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>