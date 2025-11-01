<script setup lang="ts">
import axios from 'axios';
import { computed, reactive } from 'vue';
import { defineEmits } from 'vue';
import { useUserStore } from '../../userStore';
import close from "../../../public/icons/close.png";

const emit = defineEmits(['close'])
const userStore = useUserStore()

const teacherId = computed(() => userStore.data?.id)

const closeComponent = () => {
    emit('close')
}

const form = reactive({
    name: '',
    description: ''
})

const submitClass = async() => {
    const newClass = {
        name: form.name,
        description: form.description,
        teacher_id: teacherId.value
    }

    try {
        const response = await axios.post('http://localhost:3000/classrooms', newClass)
        // toast.success('Aluno adicionado com sucesso')
        // router.push(`/jobs/${response.data.id}`)
        if(response) {
            console.log('Sala registrada')
        }
    } catch(error) {
        console.log('Sala não registrada')
    }
}
</script>

<template>
    <form @submit.prevent="submitClass" class="grid gap-3">
        <div class="flex justify-between">
            <h1 class="font-bold text-lg">Registrar Sala de Aula:</h1>
            <button @click="closeComponent">
                <img :src="close" alt="Fechar" class="w-5 h-5 cursor-pointer"/>
            </button>
        </div>
        <div>
            <label class="block text-gray-700 font-bold mb-2">Nome:</label>
            <input
                type="text"
                v-model="form.name"
                id="name"
                name="name"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="1º Ano A"
                required
            />
        </div>
        <div>
            <label class="block text-gray-700 font-bold mb-2">Descrição:</label>
            <input
                type="text"
                v-model="form.description"
                id="description"
                name="description"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Descrição"
                required
            />
        </div>
        <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
            type="submit"
        >
            Adicionar Sala de Aula
        </button>
    </form>
</template>