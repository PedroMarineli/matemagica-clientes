<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);

const closeComponent = () => {
  emit('close');
}

const form = reactive({
    username: '',
    password: '',
    teacher_id: '',
    classroom_id: '',
    photo_url: '',
    name: '',
    genre: '',
    age: ''
})

const submitStudent = async() => {
    const newStudent = {
        name: form.name,
        genre: form.genre,
        age: form.age
    }

    try {
    const response = await axios.post('http://localhost:3000/users/register/student', newStudent)
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
            <h1 class="font-bold text-lg">Registrar Aluno:</h1>
            <div>
                <button @click="closeComponent">Fechar</button>
            </div>
        </div>
        <div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Nome:</label>
                <input
                    type="text"
                    v-model="form.name"
                    id="name"
                    name="name"
                    class="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Nome do aluno"
                    required
                />
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Gênero:</label>
                <input
                    type="text"
                    v-model="form.genre"
                    id="genre"
                    name="genre"
                    class="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Gênero do aluno"
                    required
                />
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Data de Nascimento:</label>
                <input
                    type="date"
                    v-model="form.age"
                    id="age"
                    name="age"
                    class="border rounded w-full py-2 px-3 mb-2"
                    required
                />
            </div>
        </div>
        <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
        >
            Adicionar Aluno
        </button>
    </form>
</template>