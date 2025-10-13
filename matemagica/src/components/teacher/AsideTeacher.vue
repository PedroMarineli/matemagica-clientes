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
    <aside class="w-screen md:w-1/4 py-4 md:py-10 lg:w-1/6 bg-white flex flex-col items-center gap-5 border-r-1 border-r-gray-300">
        <nav class="space-y-2 fixed">
            <ul class="flex md:flex-col gap-3">
                <li class="flex items-center gap-5 cursor-pointer w-full justify-start" v-for="item in top" :key="item.nome" @click="() => router.push({ name: item.route })">
                    <img v-if="item.icon" :src="item.icon" :alt="item.nome" class="w-6 h-6"/>
                    <span class="hidden min-[425px]:block font-bold">{{ item.nome }}</span>
                </li>
            </ul>
        </nav>
    </aside>
    <!-- <aside class="w-screen md:w-1/4 py-4 md:py-10 lg:w-1/6 bg-light-brown flex flex-col items-center gap-5 border-r-1 border-r-black">
        <span class="hidden md:block font-bold">Menu</span>
        <ul class="flex md:flex-col gap-3">
            <li class="flex items-center gap-5 cursor-pointer" v-for="item in top" :key="item.nome" @click="() => router.push({ name: item.route })">
                <img v-if="item.icon" :src="item.icon" :alt="item.nome" class="w-7 h-7"/>
                <span class="hidden min-[425px]:block font-bold">{{ item.nome }}</span>
            </li>
        </ul>
    </aside> -->
</template>