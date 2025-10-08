<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../userStore';
import axios from 'axios';
import type { ITeacherDashboard } from '../../interfaces/ITeacherDashboard';

const userStore = useUserStore()
const dashboard = ref<ITeacherDashboard | null>(null)
console.log(dashboard)

onMounted(async () => {
    try {
        const teacherDashboard = await axios.get(`http://localhost:3000/progress/teacher/${ userStore.data?.id }/dashboard?classroom_id=1`)
        dashboard.value = teacherDashboard.data as ITeacherDashboard
        const listProgressInATask = await axios.get(`http://localhost:3000/progress/task/1`)
        console.log(teacherDashboard)
        console.log(listProgressInATask)
    } catch(error) {
        console.error('Error fetching job', error)
    }
})
</script>

<template>
    <!-- Main content -->
    <main class="lg:col-span-3 space-y-6">
        <!-- Welcome section -->
        <Card class="p-6 bg-gradient-primar">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">Bem-vindo(a), {{ userStore.data?.username }}! 👋</h1>
                    <p class="text-black/90">Aqui está o resumo das suas turmas hoje</p>
                </div>
                <Sparkles class="w-16 h-16 opacity-50" />
            </div>
        </Card>

        <!-- Stats -->
        <div class="grid sm:grid-cols-3 gap-4">
            <Card class="p-6 hover:shadow-medium transition-smooth">
                <div class="flex items-center gap-4">
                    <div class="bg-primary/10 p-3 rounded-2xl">
                        <Users class="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p class="text-2xl font-bold">{{ dashboard?.statistics.total_students }}</p>
                        <p class="text-sm text-muted-foreground">Alunos</p>
                    </div>
                </div>
            </Card>

            <Card class="p-6 hover:shadow-medium transition-smooth">
            <div class="flex items-center gap-4">
                <div class="bg-secondary/10 p-3 rounded-2xl">
                    <BookOpen class="w-6 h-6 text-secondary" />
                </div>
                <div>
                    <p class="text-2xl font-bold">{{ dashboard?.statistics.total_classrooms }}</p>
                    <p class="text-sm text-muted-foreground">Salas</p>
                </div>
                </div>
            </Card>

            <Card class="p-6 hover:shadow-medium transition-smooth">
            <div class="flex items-center gap-4">
                <div class="bg-accent/10 p-3 rounded-2xl">
                <FileText class="w-6 h-6 text-accent" />
                </div>
                <div>
                <p class="text-2xl font-bold">{{ dashboard?.statistics.total_tasks }}</p>
                <p class="text-sm text-muted-foreground">Tarefas Ativas</p>
                </div>
            </div>
            </Card>
        </div>

        <!-- Recent activity -->
        <Card class="p-6">
            <h2 class="text-xl font-bold mb-4">Atividade Recente</h2>
            <div v-for="item in [1, 2, 3, 4]" :key="item" class="space-y-3">
                <div :key="item" class="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-smooth">
                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        👧
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold">Lucas completou "Adição Básica"</p>
                        <p class="text-sm text-muted-foreground">Há 2 horas • Sala 3A</p>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-bold text-success">95%</p>
                    </div>
                </div>
            </div>
        </Card>
    </main>
</template>