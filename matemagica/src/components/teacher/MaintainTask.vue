<script setup lang="ts">
import { reactive, ref, type PropType } from 'vue';
import { defineEmits } from 'vue';
import type { IProblems, ITasks } from '../../interfaces/ITasks';
import close from "../../../public/icons/close.png";
import { showNotification } from '../../stores/notificationStore';
import api from '../../services/api';

const emit = defineEmits(['close'])

const props = defineProps({
  taskData: {
    type: Object as PropType<ITasks>,
    required: true,
  },
})

const problems = ref<IProblems[]>([])
const jsonString = props.taskData.content

const closeComponent = () => {
    emit('close')
}

if (jsonString && typeof jsonString === 'string') {
    try {
        const problemsArray = JSON.parse(jsonString)
        problems.value = problemsArray
    } catch (error) {
        console.error("Erro ao analisar o JSON do conteúdo da tarefa:", error)
    }
}

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
        const response = await api.put(`http://localhost:3000/tasks/${props.taskData.id}`, taskAltered)
        if(response) {
            showNotification('Tarefa alterada com sucesso!', 'bg-green-500')
            location.reload()
        }
    } catch(error) {
        showNotification('Não foi possível alterar tarefa', 'bg-red-500')
    }
}

const deleteTask = async() => {
    try {
        const response = await api.delete(`http://localhost:3000/tasks/${props.taskData.id}`)
        if(response) {
            showNotification('Tarefa deletada com sucesso!', 'bg-green-500')
            location.reload()
        }
    } catch(error) {
        showNotification('Não foi possível deletar tarefa', 'bg-red-500')
    }
}
</script>

<template>
    <div class="grid gap-3">
        <form @submit.prevent="submitTask" class="grid gap-3">
            <div class="flex justify-between items-center">
                <h1 class="font-bold text-lg">Alterar Tarefa:</h1>
                <button @click="closeComponent">
                    <img :src="close" alt="Fechar" class="w-5 h-5 cursor-pointer"/>
                </button>
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
                <label class="block text-gray-700 mb-2">{{ props.taskData.type }}</label>
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Conteúdo:</label>
                <div v-for="problem in problems" class="flex gap-8 items-center">
                    <label class="block text-gray-700 mb-2">{{ problem.content }}</label>
                    <label class="block text-gray-700 mb-2">{{ problem.answer }}</label>
                </div>
            </div>
            <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
                type="submit"
            >
                Alterar Tarefa
            </button>
        </form>
        <button
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
            @click="deleteTask"
        >
            Excluir Tarefa
        </button>
    </div>
</template>