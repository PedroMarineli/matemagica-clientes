<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../userStore';
import axios from 'axios';
import type { ITeacherDashboard } from '../../interfaces/ITeacherDashboard';
import type { IListProgressInATask } from '../../interfaces/ITasks';

import students from "../../../public/icons/students.png";
import classes from "../../../public/icons/class.png";
import tasks from "../../../public/icons/tasks.png";

const userStore = useUserStore()
const dashboard = ref<ITeacherDashboard | null>(null)
const progresses = ref<IListProgressInATask[] | null>([])
console.log(dashboard)

onMounted(async () => {
    try {
        const teacherDashboard = await axios.get(`http://localhost:3000/progress/teacher/${ userStore.data?.id }/dashboard?classroom_id=1`)
        dashboard.value = teacherDashboard.data as ITeacherDashboard
        const listProgressInATask = await axios.get(`http://localhost:3000/progress/task/1`)
        progresses.value = listProgressInATask.data as IListProgressInATask[]
        console.log(teacherDashboard)
        console.log(listProgressInATask)
    } catch(error) {
        console.error('Error fetching job', error)
    }
})
</script>

<template>
    <!-- Main content -->
    <main class="w-full px-56 py-10 lg:col-span-3 space-y-6">
        <!-- Welcome section -->
        <div class="card">
            <div class="flex items-start gap-4">
                <div>
                    <h1 class="font-bold mb-2">Bem-vindo(a), {{ userStore.data?.username }}! 👋</h1>
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
                        <p class="text-2xl font-bold">{{ dashboard?.statistics.total_students }}</p>
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
                        <p class="text-2xl font-bold">{{ dashboard?.statistics.total_classrooms }}</p>
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
                        <p class="text-2xl font-bold">{{ dashboard?.statistics.total_tasks }}</p>
                        <p class="text-sm text-muted-foreground">Tarefas Ativas</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent activity -->
        <div class="card">
            <h2 class="text-xl font-bold mb-4">Atividade Recente</h2>
            <div v-for="progress in progresses" class="space-y-3">
                <div key="progress" class="bg-background flex items-center gap-4 p-3 rounded-xl bg-background/50 hover:bg-background transition-smooth">
                    <div class="w-10 h-10 rounded-full bg-lilac/10 flex items-center justify-center">
                        👧
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold">{{ progress.username }} completou "Adição Básica"</p>
                        <p class="text-sm text-muted-foreground">Há 2 horas • Sala 3A</p>
                        <p class="text-sm text-muted-foreground">{{ progress.status }}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-bold text-light-green">95%</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- <Card class="p-6">
            <h2 class="text-xl font-bold mb-4">Atividade Recente</h2>
            <div v-for="item in [1, 2]" :key="item" class="space-y-3">
                <div :key="item" class="flex items-center gap-4 p-3 rounded-xl bg-background/50 hover:bg-background transition-smooth">
                    <div class="w-10 h-10 rounded-full bg-lilac/10 flex items-center justify-center">
                        👧
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold">Lucas completou "Adição Básica"</p>
                        <p class="text-sm text-muted-foreground">Há 2 horas • Sala 3A</p>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-bold text-light-green">95%</p>
                    </div>
                </div>
            </div>
        </Card> -->
    </main>
</template>