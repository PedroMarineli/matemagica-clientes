<script setup lang="ts">
import axios from 'axios';
import { reactive, type PropType } from 'vue';
import { defineEmits } from 'vue';
import type { IClassrooms } from '../../interfaces/IClassrooms';
import close from "../../../public/icons/close.png";
import { showNotification } from '../../stores/notificationStore';

const emit = defineEmits(['close'])

const closeComponent = () => {
    emit('close')
}

const props = defineProps({
  classData: {
    type: Object as PropType<IClassrooms>,
    required: true,
  },
})

const form = reactive({
    name: props.classData.name,
    description: props.classData.description
})

const submitClass = async() => {
    const classAltered = {
        name: form.name,
        description: form.description,
    }

    try {
        const response = await axios.put(`http://localhost:3000/classrooms/${props.classData.id}`, classAltered)
        if(response) {
            showNotification('Sala alterada com sucesso!', 'bg-green-500')
            location.reload()
        }
    } catch(error) {
        showNotification('Não foi possível alterar a sala', 'bg-red-500')
    }
}

const deleteClass = async() => {
    try {
        const response = await axios.delete(`http://localhost:3000/classrooms/${props.classData.id}`)
        if(response) {
            showNotification('Sala deletada com sucesso!', 'bg-green-500')
            location.reload()
        }
    } catch(error) {
        showNotification('Não foi possível deletar sala', 'bg-red-500')
    }
}
</script>

<template>
    <div class="grid gap-3">
        <form @submit.prevent="submitClass" class="grid gap-3">
            <div class="flex justify-between items-center">
                <h1 class="font-bold text-lg">Alterar Sala de Aula:</h1>
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
                />
            </div>
            <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
                type="submit"
            >
                Alterar Sala de Aula
            </button>
        </form>
        <button
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
            @click="deleteClass"
        >
            Excluir
        </button>
    </div>
</template>