<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);

const closeComponent = () => {
  emit('close');
}

const form = reactive({
    name: ''
})

const submitStudent = async() => {
    const newClass = {
        name: form.name,
    }

    try {
    const response = await axios.post('/api/jobs', newClass)
    // toast.success('Aluno adicionado com sucesso')
    // router.push(`/jobs/${response.data.id}`)
} catch(error) {
    console.error('Error fetching job', error)
    // toast.error('Aluno não foi adicionado')
}
}
</script>

<template>
    <form @submit.prevent="submitStudent" class="grid gap-3">
        <div class="flex justify-between">
            <h1 class="font-bold text-lg">Registrar Sala de Aula:</h1>
            <div>
                <button @click="closeComponent">Fechar</button>
            </div>
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
        <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
        >
            Adicionar Sala de Aula
        </button>
    </form>
</template>