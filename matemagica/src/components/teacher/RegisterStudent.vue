<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { defineEmits } from 'vue';
import { useUserStore } from '../../userStore';
import type { IClassrooms } from '../../interfaces/IClassrooms';
import close from "../../../public/icons/close.png";
import { showNotification } from '../../stores/notificationStore';

const emit = defineEmits(['close'])
const userStore = useUserStore()

const teacherId = computed(() => userStore.data?.user.id)

const closeComponent = () => {
  emit('close');
}

const form = reactive({
    username: '',
    password: '',
    classroom_id: '',
    photo_url: ''
})

const submitStudent = async() => {
    const newStudent = {
        username: form.username,
        password: form.password,
        teacher_id: teacherId.value,
        classroom_id: form.classroom_id,
        photo_url: form.photo_url
    }
    try {
        const response = await axios.post('http://localhost:3000/users/register/student', newStudent)
        if(response) {
            showNotification('Aluno adicionado com sucesso!', 'bg-green-500')
            location.reload()
        }
    } catch(error) {
        showNotification('Não foi possível adicionar aluno', 'bg-red-500')
    }
}

const classrooms = ref<IClassrooms[] | null>(null)

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/classrooms')
        classrooms.value = response.data as IClassrooms[]
    } catch(error) {
        console.error('Error fetching job', error)
    }
})
</script>

<template>
    <form @submit.prevent="submitStudent" class="grid gap-3">
        <div class="flex justify-between">
            <h1 class="font-bold text-lg">Registrar Aluno:</h1>
            <button @click="closeComponent">
                <img :src="close" alt="Fechar" class="w-5 h-5 cursor-pointer"/>
            </button>
        </div>
        <div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Nome:</label>
                <input
                    type="text"
                    v-model="form.username"
                    id="username"
                    name="username"
                    class="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Nome do aluno"
                    required
                />
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Senha:</label>
                <input
                    type="text"
                    v-model="form.password"
                    id="password"
                    name="password"
                    class="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Senha do aluno"
                    required
                />
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Sala de Aula:</label>
                <select v-model="form.classroom_id" class="w-full border rounded py-2 px-3">
                    <option value="" disabled selected>Selecione a Sala</option>
                    <option v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">{{ classroom.name }}</option>
                </select>
            </div>
        </div>
        <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
        >
            Adicionar Aluno
        </button>
    </form>
</template>