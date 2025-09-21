<script setup lang="ts">
import axios from 'axios';
import { reactive } from 'vue';

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
    <form @submit.prevent="submitStudent">
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
    </form>
</template>