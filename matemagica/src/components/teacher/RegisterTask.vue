<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { defineEmits } from 'vue';
import { useUserStore } from '../../userStore';
import type { IClassrooms } from '../../interfaces/IClassrooms';

const emit = defineEmits(['close'])
const userStore = useUserStore()

const teacherId = computed(() => userStore.data?.id)

const closeComponent = () => {
  emit('close');
}

const form = reactive({
    title: '',
    type: '',
    content: '',
    difficulty: '',
    classroom_id: ''
})

const submitTask = async() => {
    const newTask = {
        title: form.title,
        type: form.type,
        teacher_id: teacherId.value,
        content: form.content,
        difficulty: form.difficulty,
        classroom_id: form.classroom_id,
    }

    try {
        const response = await axios.post('http://localhost:3000/tasks', newTask)
        // toast.success('Aluno adicionado com sucesso')
        // router.push(`/jobs/${response.data.id}`)
        if(response) {
            console.log('Tarefa registrado')
        }
    } catch(error) {
        console.error('Tarefa não foi adicionada', error)
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
    <form @submit.prevent="submitTask" class="grid gap-3">
        <div class="flex justify-between">
            <h1 class="font-bold text-lg">Registrar Tarefa:</h1>
            <div>
                <button @click="closeComponent">Fechar</button>
            </div>
        </div>
        <div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Nome:</label>
                <input
                    type="text"
                    v-model="form.title"
                    id="title"
                    name="title"
                    class="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Título da arefa"
                    required
                />
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Tipo:</label>
                <input
                    type="text"
                    v-model="form.type"
                    id="type"
                    name="type"
                    class="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Tipo da tarefa"
                    required
                />
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Sala de Aula:</label>
                <select v-model="form.classroom_id">
                    <option value="" disabled selected>Selecione a Sala</option>
                    <option v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">{{ classroom.name }}</option>
                </select>
            </div>
        </div>
        <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
        >
            Adicionar Tarefa
        </button>
    </form>
</template>