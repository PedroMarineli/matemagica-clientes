<script setup lang="ts">
import axios from 'axios';
import RegisterClass from './RegisterClass.vue';
import { onMounted, ref } from 'vue';
import type { IClassrooms } from '../../interfaces/IClassrooms';
import MaintainClass from './MaintainClass.vue';
import points from "../../../public/icons/points.png";

const classrooms = ref<IClassrooms[] | null>(null)

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/classrooms')
        classrooms.value = response.data as IClassrooms[]
    } catch(error) {
        console.error('Error fetching job', error)
    }
})

const showRegisterForm = ref(false)
const showMaintainForm = ref(false)

const selectedClass = ref<IClassrooms | null>(null)

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
    <div class="w-full h-full flex md:justify-between lg:flex-row flex-1" :class="{'flex-col-reverse md:h-min': showRegisterForm }">
        <div class="flex px-56 flex-col items-center gap-5 py-5 lg:py-10" :class="{ 'w-full': !showRegisterForm, 'lg:w-2/3': showRegisterForm }">
            <div class="card w-full flex items-center justify-between">
                <div>
                    <h1>Salas</h1>
                    <p>Lista com suas salas de aula</p>
                </div>
                <button @click="callRegister" class="flex py-3 px-10 rounded-xl font-bold transition-smooth cursor-pointer bg-lilac text-white shadow-soft">Adicionar Sala</button>
            </div>
            <div class="card w-full grid justify-center">
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
                        <tr>
                            <td>{{classroom.id}}</td>
                            <td>{{classroom.name}}</td>
                            <td>{{classroom.description}}</td>
                            <td>
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