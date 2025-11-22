<script setup lang="ts">
import trofeu from '../../../public/icons/trophy.png';
import type { IProblems, ITasksProgress } from '../../interfaces/ITasks';
import { onMounted, reactive, ref, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../userStore';
import api from '../../services/api';
import { showNotification } from '../../stores/notificationStore';

const emit = defineEmits(['close'])
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()
const taskId = route.params.id

const task = ref<ITasksProgress | null>(null)
const problems = ref<IProblems[]>([])
const showError = ref(false)

let number_of_attempts = 0

const i = ref(0)
const x = ref(0)
const y = ref(0)
const submitted_answers_list = ref<number[]>([])
let countdown_score = ref(10)

const state = reactive({
    isLoading: true
})

const form = reactive({
    student_id: userStore.data?.user.id,
    task_id: taskId,
    status: 'Submitted',
    score: 0,
    answer: 0
})

const help = ref(false)

const askHekp = () => {
    help.value = !help.value
}

const updateCurrentProblem = () => {
    const currentProblem = problems.value[i.value]

    if(!currentProblem) return problems.value[0]

    const numerosEncontrados = currentProblem.content.match(/\d+/g)

    if (numerosEncontrados && numerosEncontrados.length >= 2) {
        x.value = parseInt(numerosEncontrados[0], 10)
        y.value = parseInt(numerosEncontrados[1], 10)
    }
}

onMounted(async() => {
    try {
        const response = await api.get(`http://localhost:3000/tasks/${taskId}`)
        task.value = response.data as ITasksProgress
        problems.value = task.value.problems || []

        updateCurrentProblem()
    } catch (error) {
        console.error('Error fetching task', error)
    } finally {
        state.isLoading = false
    }
})

const submitAnswer = () => {
    const currentProblem = problems.value[i.value]
    number_of_attempts++

    if(form.answer == currentProblem.answer) {
        form.score += countdown_score.value
        countdown_score.value = 10

        submitted_answers_list.value.push(form.answer)
        form.answer = 0
        if (i.value < problems.value.length - 1) {
            i.value++
            updateCurrentProblem()
        } else {
            submitTask()
        }
    }
    else {
        if (countdown_score.value > 0) {
            countdown_score.value--
        }
        
        showError.value = true
        setTimeout(() => {
            showError.value = false
        }, 3000)
    }
}

const submitTask = async() => {
    const rawAnswers = toRaw(submitted_answers_list.value)
    const taskAltered = {
        task_id: form.task_id,
        answers: rawAnswers,
        number_of_attempts: number_of_attempts,
        score: (form.score / (problems.value.length * 10)) * 100
    }

    try {
        const response = await api.post('http://localhost:3000/progress/submit', taskAltered)
        if(response) {
            router.push('/alunos')
            showNotification('Tarefa feita com sucesso!', 'bg-green-500')
        }
    } catch(error) {
        showNotification('Progresso de tarefa não realizado', 'bg-red-500')
    }
}
</script>

<template>
    <div class="container mx-auto px-4 py-8 max-w-6xl">
        <!-- Level progress -->
        <div class="card p-6 mb-8 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="flex items-center justify-between mb-3">
                <h2 class="text-2xl font-bold flex items-center gap-3 bg-orange text-accent-foreground px-5 py-2 rounded-full">
                    <img :src="trofeu" alt="Troféu" class="w-6 h-6"/>
                    Seu Progresso
                </h2>
                <span class="text-xl font-bold text-lilac">Nível 1</span>
            </div>
            <p class="text-muted-foreground">Faltam 35 estrelas para o próximo nível!</p>
        </div>

        <!-- Pending tasks -->
        <div>
            <h2 class="text-3xl font-bold mb-4 flex items-center gap-2">
                Suas Atividades
            </h2>
          
            <div v-if="task" class="flex items-center">
                <!-- Task card 1 -->
                <div class="w-full grid sm:grid-cols-2 gap-6 items-center">
                    <div class="card p-6 hover:shadow-glow transition-smooth hover:-translate-y-2 border-4 border-purple-400">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-4xl">
                                    {{ task.type === 'addition' ? '➕' :
                                       task.type === 'subtraction' ? '➖' :
                                       task.type === 'multiplication' ? '✖️' :
                                       task.type === 'division' ? '➗' :
                                       task.type === 'additionWithProblems' ? '➕🔢' :
                                       task.type === 'subtractionWithProblems' ? '➖🔢' :
                                       task.type === 'multiplicationWithProblems' ? '✖️🔢' :
                                       task.type === 'divisionWithProblems' ? '➗🔢' : '🔢' }}
                                </span>
                                <span class="bg-orange text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                                    {{ task.difficulty === 'easy' ? 'Fácil' : 
                                       task.difficulty === 'medium' ? 'Médio' : 
                                       task.difficulty === 'hard' ? 'Difícil' : 'Desconhecido' }}
                                </span>
                            </div>
                            <h3 class="text-2xl font-bold">{{ task.title }}</h3>
                            <p class="text-muted-foreground text-lg">{{ problems[i].content }}</p>
                            <div @click="askHekp" class="w-min flex gap-2 items-center bg-lilac text-white px-3 py-1 rounded-full text-sm font-medium cursor-pointer">
                                <span>Ajuda?</span>
                            </div>
                            <form @submit.prevent="submitAnswer">
                                <div>
                                    <label class="block text-gray-700 font-bold mb-2">Digite sua Resposta:</label>
                                    <input
                                        type="text"
                                        v-model="form.answer"
                                        id="answer"
                                        name="answer"
                                        class="border rounded w-full py-2 px-3 mb-4"
                                        placeholder="45"
                                        required
                                    />
                                </div>
                                <button class="w-full py-3 px-10 rounded-xl font-bold hover:shadow-glow transition-smooth hover:-translate-y-2 cursor-pointer bg-orange text-accent-foreground shadow-soft">
                                    Entregar
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="relative flex gap-5 justify-center">
                        <div v-if="help" class="ajuda text-end font-bold text-4xl w-min">
                            <span class="text-7xl">{{ x }}</span>
                            <div class="flex items-center">
                                <span class="text-7xl">
                                    {{ 
                                        task.type === 'addition' || task.type === 'additionWithProblems' ? '+' : 
                                        task.type === 'subtraction' || task.type === 'subtractionWithProblems' ? '-' : 
                                        task.type === 'multiplication' || task.type === 'multiplicationWithProblems' ? 'x' : 
                                        task.type === 'division' || task.type === 'divisionWithProblems' ? '/' : 
                                        '' 
                                    }}
                                </span>
                                <span class="text-7xl">{{ y }}</span>
                            </div>
                            <div class="w-full border-b-8 border-black mt-5"></div> 
                        </div>
                        <div class="caixa-de-fala">
                            <div v-if="showError" class="balao">
                                ❌ Quase! Tente de novo
                            </div>
                            <div class="w-96 h-96 rounded-full bg-background flex items-center justify-center text-6xl border-4 border-white shadow-medium">
                                <div v-if="userStore.data?.user.cartoon_image_path" class="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                                    <img class="w-full h-full object-cover" :src="userStore.data?.user.cartoon_image_path" alt="Imagem do Avatar" crossorigin="anonymous">
                                </div>
                                <div v-else class="text-9xl">
                                    🧒
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.ajuda {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 10;
  max-width: fit-content;
  flex-grow: 1;
  left: 0;
}

.ajuda::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 15px solid #fff;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  right: -13px;
  bottom: 15px;
}

.caixa-de-fala {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 20px;
}

.balao {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 10;
  max-width: fit-content;
  flex-grow: 1;
}

.balao p {
  margin: 0;
  font-family: sans-serif;
  line-height: 1.5;
}

.balao::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-top: 15px solid #fff;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  bottom: -13px;
  left: 15px;
}
</style>