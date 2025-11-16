<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref, type PropType } from 'vue';
import { defineEmits } from 'vue';
import type { IClassrooms } from '../../interfaces/IClassrooms';
import type { IUsers } from '../../interfaces/IUsers';
import close from "../../../public/icons/close.png";
import { showNotification } from '../../stores/notificationStore';

const emit = defineEmits(['close'])

const selectedFile = ref<File | null>(null)
const classrooms = ref<IClassrooms[] | null>(null)

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
    email: props.studentData.email || '',
    photo_path: ''
})

function onFileChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
    }
    console.log(selectedFile.value)
}

const submitStudent = async () => {
    const studentAltered = {
        email: form.email,
    }
    
    if (selectedFile.value) {
        const formData = new FormData()
        formData.append('photo', selectedFile.value)

        try {
            const response = await axios.put(
                `http://localhost:3000/users/${props.studentData.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' 
                    },
                    onUploadProgress: uploadEvent => {
                        console.log('Upload progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total! * 100))
                    }
                }
            )

            if (response) {
                console.log('Imagem foi', response.data)
            }
            else {
                console.log('Nao foi')
            }

        } catch (error) {
             console.error('Falha ao fazer upload da imagem', error)
        }
    }

    try {
        const response = await axios.put(`http://localhost:3000/users/${props.studentData.id}`, studentAltered)
        
        if (response) {
            showNotification('Dados do aluno altados com sucesso!', 'bg-green-500')
            location.reload()
        }
    } catch (error) {
        showNotification('Não foi possível alterar aluno', 'bg-red-500')
    }
}

const deleteStudent = async() => {
    try {
        const response = await axios.delete(`http://localhost:3000/users/${props.studentData.id}`)
        if(response) {
            showNotification('Aluno deletado com sucesso!', 'bg-green-500')
            location.reload()
        }
    } catch(error) {
        showNotification('Não foi possível deletar aluno.', 'bg-red-500')
    }
}

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
            <div class="flex justify-between items-center">
                <h1 class="font-bold text-lg">Registrar Aluno:</h1>
                <button @click="closeComponent">
                    <img :src="close" alt="Fechar" class="w-5 h-5 cursor-pointer"/>
                </button>
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
                    />
                </div>
                <div>
                    <label class="block text-gray-700 font-bold mb-2">Avatar:</label>
                    <input type="file" @change="onFileChanged" accept="image/*" class="border rounded w-full py-2 px-3 mb-2">
                </div>
            </div>
            <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
                type="submit"
                >
                Mudar
            </button>
        </form>
        <button
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
            @click="deleteStudent"
        >
            Excluir
        </button>
    </div>
</template>