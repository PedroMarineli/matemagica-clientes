<script setup lang="ts">
import sections from "../../../public/icons/sections.png";
import students from "../../../public/icons/students.png";
import classes from "../../../public/icons/class.png";
import tasks from "../../../public/icons/tasks.png";
import { useRouter } from 'vue-router';

const router = useRouter();
const top = [
  { nome: "Geral", icon: sections, route: "teacherDashboard" },
  { nome: "Alunos", icon: students, route: "teacherStudents" },
  { nome: "Salas", icon: classes, route: "teacherClasses" },
  { nome: "Tarefas", icon: tasks, route: "teacherTasks" }
];
</script>

<template>
    <aside class="w-1/6 py-10 bg-light-brown flex flex-col items-center gap-5 border-r-1 border-r-black">
        <span class="font-bold">Menu</span>
        <ul class="flex flex-col gap-3">
            <li class="flex items-center gap-5" v-for="item in top" :key="item.nome" @click="() => router.push({ name: item.route })">
                <img v-if="item.icon" :src="item.icon" :alt="item.nome" class="w-7 h-7"/>
                <span class="font-bold">{{ item.nome }}</span>
            </li>
        </ul>
    </aside>
</template>