<script setup lang="ts">
import axios from 'axios';
import { reactive, type PropType } from 'vue';
import { defineEmits } from 'vue';
import type { ITasks } from '../../interfaces/ITasks';

const emit = defineEmits(['close'])

const closeComponent = () => {
    emit('close')
}

const props = defineProps({
  taskData: {
    type: Object as PropType<ITasks>,
    required: true,
  },
})

const form = reactive({
    title: props.taskData.title,
    type: props.taskData.type,
    content: props.taskData.content,
    difficulty: props.taskData.difficulty,
    classroom_id: props.taskData.classroom_id
})

const submitTask = async() => {
    const taskAltered = {
        title: form.title,
        type: form.type,
    }

    try {
        const response = await axios.put(`http://localhost:3000/tasks/${props.taskData.id}`, taskAltered)
        // toast.success('Tarefa adicionada com sucesso')
        // router.push(`/jobs/${response.data.id}`)
        if(response) {
            console.log('Sala registrada')
        }
    } catch(error) {
        console.log('Sala não registrada')
    }
}

const deleteTask = async() => {
    try {
        const response = await axios.delete(`http://localhost:3000/tasks/${props.taskData.id}`)
        // toast.success('Tarefa adicionada com sucesso')
        // router.push(`/jobs/${response.data.id}`)
        if(response) {
            console.log('Tarefa deletada')
        }
    } catch(error) {
        console.error('Tarefa não foi deletada', error)
        // toast.error('Tarefa não foi deletada')
    }
}
</script>

<template>
    <div class="grid gap-3">
        <form @submit.prevent="submitTask" class="grid gap-3">
            <div class="flex justify-between">
                <h1 class="font-bold text-lg">Alterar Tarefa:</h1>
                <div>
                    <button @click="closeComponent">Fechar</button>
                </div>
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Nome:</label>
                <input
                    type="text"
                    v-model="form.title"
                    id="title"
                    name="title"
                    class="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Nome da Tarefa"
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
                    placeholder="Tipo"
                />
            </div>
            <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Alterar Tarefa
            </button>
        </form>
        <button
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            @click="deleteTask"
        >
            Excluir Tarefa
        </button>
    </div>
</template>