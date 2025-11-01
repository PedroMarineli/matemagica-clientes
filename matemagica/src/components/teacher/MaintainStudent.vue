<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref, type PropType } from 'vue';
import { defineEmits } from 'vue';
import type { IClassrooms } from '../../interfaces/IClassrooms';
import type { IUsers } from '../../interfaces/IUsers';
import close from "../../../public/icons/close.png";
import { showNotification } from '../../stores/notificationStore';

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
    email: props.studentData.email || '',
    photo_path: ''
})

// const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

function onFileChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
    }
    console.log(selectedFile.value)
}

const submitStudent = async () => {
    // 1. Inicializa o objeto de dados a ser enviado no PUT
    const studentAltered = {
        email: form.email,
    };
    
    // let newAvatarUrl = null;

    // 2. PRIMEIRA FASE: Upload da Imagem, SE houver arquivo
    if (selectedFile.value) {
        const formData = new FormData()
        formData.append('photo', selectedFile.value)

        console.log("Verificando a chave 'image':", formData.get('photo'))

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
            // axios.put(`http://localhost:3000/users/${props.studentData.id}`, formData, {
            //     onUploadProgress: uploadEvent => {
            //         console.log('Upload progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total! * 100))
            //     }
            // });

            // O servidor deve retornar o novo URL (ex: { photo_path: 'caminho/do/avatar.png' })
            // newAvatarUrl = uploadResponse.data.cartoon_image_path; 
            // studentAltered.cartoon_image_path = newAvatarUrl;

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

// const submitStudent = async() => {

//     if (!selectedFile.value) return;

//     const formData = new FormData();
//     formData.append('image', selectedFile.value);

//     const studentAltered = {
//         email: form.email,
//         // photo_path: formData.append('image', selectedFile.value)
//     }

//     console.log(studentAltered)

//     try {
//         const response = await axios.put(`http://localhost:3000/users/${props.studentData.id}`, studentAltered, formData)
//         // toast.success('Aluno adicionado com sucesso')
//         // router.push(`/jobs/${response.data.id}`)
//         if(response) {
//             console.log('Dados do aluno alterados')
//         }
//     } catch(error) {
//         console.error('Dados do aluno não foram alterados', error)
//         // toast.error('Aluno não foi adicionado')
//     }
// }

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
                    <!-- <input
                        type="text"
                        v-model="form.photo_path"
                        id="photo_path"
                        name="photo_path"
                        class="border rounded w-full py-2 px-3 mb-2"
                        placeholder="photo_path"
                    /> -->
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