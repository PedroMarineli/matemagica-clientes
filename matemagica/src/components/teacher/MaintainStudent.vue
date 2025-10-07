<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref, type PropType } from 'vue';
import { defineEmits } from 'vue';
import type { IClassrooms } from '../../interfaces/IClassrooms';
import type { IUsers } from '../../interfaces/IUsers';

const emit = defineEmits(['close'])

const props = defineProps({
  studentData: {
    type: Object as PropType<IUsers>,
    required: true,
  },
})

const closeComponent = () => {
  emit('close')
}

const form = reactive({
    email: '',
    avatar_url: ''
})

const submitStudent = async() => {
    const studentAltered = {
        email: form.email,
        avatar_url: form.avatar_url
    }

    try {
        const response = await axios.put(`http://localhost:3000/users/${props.studentData.id}`, studentAltered)
        // toast.success('Aluno adicionado com sucesso')
        // router.push(`/jobs/${response.data.id}`)
        if(response) {
            console.log('Dados do aluno alterados')
        }
    } catch(error) {
        console.error('Dados do aluno não foram alterados', error)
        // toast.error('Aluno não foi adicionado')
    }
}

const deleteStudent = async() => {
    try {
        const response = await axios.delete(`http://localhost:3000/users/${props.studentData.id}`)
        // toast.success('Aluno adicionado com sucesso')
        // router.push(`/jobs/${response.data.id}`)
        if(response) {
            console.log('Aluno deletado')
        }
    } catch(error) {
        console.error('Aluno não foi deletado', error)
        // toast.error('Aluno não foi adicionado')
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
    <div class="grid gap-3">
        <form @submit.prevent="submitStudent" class="grid gap-3">
            <div class="flex justify-between">
                <h1 class="font-bold text-lg">Registrar Aluno:</h1>
                <div>
                    <button @click="closeComponent">Fechar</button>
                </div>
            </div>
            <div>
                <div class="flex gap-5">
                    <label class="block text-gray-700 font-bold mb-2">Nome:</label>
                    <label class="block text-gray-700 mb-2">{{ props.studentData.username }}</label>
                </div>
                <div class="flex gap-5">
                    <label class="block text-gray-700 font-bold mb-2">Id:</label>
                    <label class="block text-gray-700 mb-2">{{ props.studentData.classroom_id }}</label>
                </div>
                <div>
                    <label class="block text-gray-700 font-bold mb-2">Email:</label>
                    <input
                        type="text"
                        v-model="form.email"
                        id="email"
                        name="email"
                        class="border rounded w-full py-2 px-3 mb-2"
                        placeholder="Email do aluno"
                        required
                    />
                </div>
                <div>
                    <label class="block text-gray-700 font-bold mb-2">Avatar:</label>
                    <input
                        type="text"
                        v-model="form.avatar_url"
                        id="avatar_url"
                        name="avatar_url"
                        class="border rounded w-full py-2 px-3 mb-2"
                        placeholder="avatar_url"
                    />
                </div>
            </div>
            <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
                >
                Mudar
            </button>
        </form>
        <button
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            @click="deleteStudent"
        >
            Excluir
        </button>
    </div>
</template>