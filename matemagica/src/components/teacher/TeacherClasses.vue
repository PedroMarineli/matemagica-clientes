<script setup lang="ts">
import axios from 'axios';
import RegisterClass from './RegisterClass.vue';
import { onMounted, ref } from 'vue';
import type { IClassrooms } from '../../interfaces/IClassrooms';
import MaintainClass from './MaintainClass.vue';
import points from "../../../public/icons/points.png";
import router from '../../router';

const classrooms = ref<IClassrooms[] | null>(null)
const selectedClass = ref<IClassrooms | null>(null)

const showRegisterForm = ref(false)
const showMaintainForm = ref(false)

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/classrooms')
        classrooms.value = response.data as IClassrooms[]
    } catch(error) {
        console.error('Error fetching job', error)
    }
})

const exibirDadosSala = async (classroom: IClassrooms) => {
    try {
        router.push(`/professores/sala/${classroom.id}`)
    } catch(error) {
        console.error('Error fetching job', error)
    } 
}

const callRegister = () => {
    if (showMaintainForm.value) {
        showMaintainForm.value = false
        selectedClass.value = null
    }
    showRegisterForm.value = !showRegisterForm.value
}
const closeClassRegister = () => {
  showRegisterForm.value = false
}

const callMaintain = (classroom: IClassrooms) => {
    if (showRegisterForm.value) {
        showRegisterForm.value = false
    }
    showMaintainForm.value = !showMaintainForm.value
    selectedClass.value = classroom 
}
const closeMaintainRegister = () => {
  showMaintainForm.value = false
  selectedClass.value = null
}
</script>

<template>
    <div class="w-full h-full flex md:justify-between lg:flex-row flex-1" :class="{'flex-col-reverse md:h-min': showRegisterForm || showMaintainForm }">
        <div class="flex flex-col items-center gap-5 py-5 lg:py-10" :class="{ 'px-20 xl:px-56 w-full': !showRegisterForm && !showMaintainForm, 'px-20 lg:w-2/3': showRegisterForm || showMaintainForm }">
            <div class="card w-full flex items-center justify-between">
                <div>
                    <h1>Salas</h1>
                    <p>Lista com suas salas de aula</p>
                </div>
                <button @click="callRegister" class="flex py-3 px-10 rounded-xl font-bold transition-smooth cursor-pointer bg-lilac text-white shadow-soft">Adicionar Sala</button>
            </div>
            <div class="card w-full grid overflow-x-auto justify-center">
                <table class="table">
                    <thead class="bg-lilac">
                        <tr>
                            <th>Id</th>
                            <th>Sala</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody v-if="!classrooms || classrooms.length === 0">
                        <tr>
                            <td colspan="10">Nenhuma sala cadastrada</td>
                        </tr>
                    </tbody>
                    <tbody v-else v-for="classroom in classrooms">
                        <tr class="cursor-pointer" @click="exibirDadosSala(classroom)">
                            <td>{{classroom.id}}</td>
                            <td>{{classroom.name}}</td>
                            <td>{{classroom.description}}</td>
                            <td @click.stop>
                                <button @click="callMaintain(classroom)">
                                    <img :src="points" alt="Mais" class="w-8 h-8 cursor-pointer"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <aside v-if="showRegisterForm" class="w-full py-5 lg:w-1/3 bg-white px-16 lg:py-10">
            <RegisterClass @close="closeClassRegister"/>
        </aside>
        <aside v-if="showMaintainForm && selectedClass" class="w-full py-5 lg:w-1/3 bg-white px-16 lg:py-10">
            <MaintainClass :class-data="selectedClass" @close="closeMaintainRegister"/>
        </aside>
    </div>
</template>