<script setup lang="ts">
import axios from 'axios';
import type { IProblems, ITasks } from '../../interfaces/ITasks';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../userStore';

const emit = defineEmits(['close'])
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()
const taskId = route.params.id

const task = ref<ITasks | null>(null)
const problems = ref<IProblems[]>([])

console.log(task)
console.log(problems)

const i = ref(0)

// const numerosEncontrados = task.value?.content.match(/\d+/g)

const x = ref(0)
const y = ref(0)

const state = reactive({
    isLoading: true
})

let number_of_attempts = 1

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
        const response = await axios.get(`http://localhost:3000/tasks/${taskId}`)
        task.value = response.data as ITasks
        problems.value = task.value.problems || []

        updateCurrentProblem()
    } catch (error) {
        console.error('Error fetching task', error)
    } finally {
        state.isLoading = false
    }
})

const form = reactive({
    student_id: userStore.data?.id,
    task_id: taskId,
    status: 'Submitted',
    score: 0,
    answer: null
})

const submitAnswer = () => {
    const currentProblem = problems.value[i.value]

    if(form.answer == currentProblem.answer) {
        form.score = 10
        console.log('Parabens vc acertou')
        if (i.value < problems.value.length - 1) {
            i.value++
            updateCurrentProblem()
            form.answer = null        
        } else {
            submitTask()
        }
    }
    else {
        number_of_attempts++
        console.log('Resposta incorreta. Tentativas:', number_of_attempts)
    } 
}

const help = ref(false)

const askHekp = () => {
    help.value = !help.value
}

const submitTask = async() => {
    const taskAltered = {
        student_id: form.student_id,
        task_id: form.task_id,
        status: form.status,
        score: form.score,
        number_of_attempts: number_of_attempts
    }

    try {
        const response = await axios.put('http://localhost:3000/progress/update', taskAltered)
        if(response) {
            router.push('/alunos')
            console.log('Progresso de tarefa realizado')
        }
    } catch(error) {
        console.log('Progresso de tarefa não realizado')
    }
}
</script>

<template>
    <div class="container mx-auto px-4 py-8 max-w-6xl">
        <!-- Level progress -->
        <div class="card p-6 mb-8 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div class="flex items-center justify-between mb-3">
                <h2 class="text-2xl font-bold flex items-center gap-2">
                    <!-- <Trophy class="w-6 h-6 text-accent" /> -->
                    Seu Progresso
                </h2>
                <span class="text-xl font-bold text-lilac">Nível 1</span>
            </div>
            <!-- <Progress value={65} class="h-4 mb-2" /> -->
            <p class="text-muted-foreground">Faltam 35 estrelas para o próximo nível!</p>
        </div>

        <!-- Pending tasks -->
        <div class="mb-8">
            <h2 class="text-3xl font-bold mb-4 flex items-center gap-2">
                <!-- <Sparkles class="w-8 h-8 text-lilac" /> -->
                Suas Atividades
            </h2>
          
            <div class="grid sm:grid-cols-2 gap-6 items-center">
                <!-- Task card 1 -->
                <div v-if="task" class="card p-6 hover:shadow-glow transition-smooth hover:-translate-y-2 border-4 border-primary">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-4xl">➕</span>
                            <span class="bg-orange text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                                {{ task.difficulty === 'easy' ? 'Fácil' : 
                                   task.difficulty === 'medium' ? 'Médio' : 
                                   task.difficulty === 'hard' ? 'Difícil' : 'Desconhecido' }}
                            </span>
                        </div>
                        <h3 class="text-2xl font-bold">{{ task.title }}</h3>
                        <p class="text-muted-foreground text-lg">{{ problems[i].content }}</p>
                        <div class="space-y-2">
                            <div @click="askHekp" class="flex justify-between text-sm font-medium">
                                <span>Ajuda?</span>
                            </div>
                            <!-- <Progress value={30} class="h-3" /> -->
                        </div>
                        <form @submit.prevent="submitAnswer">
                            <div>
                                <label class="block text-gray-700 font-bold mb-2">Digite sua Resposta:</label>
                                <input
                                    type="text"
                                    v-model="form.answer"
                                    id="answer"
                                    name="answer"
                                    class="border rounded w-full py-2 px-3 mb-2"
                                    placeholder="45"
                                    required
                                />
                            </div>
                            <div class="w-full flex justify-center items-center">
                                <button class="flex py-3 px-10 rounded-xl font-bold transition-smooth cursor-pointer bg-orange text-accent-foreground shadow-soft">
                                    <!-- <Play class="w-5 h-5" /> -->
                                    Entregar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div v-if="help" class="flex flex-col items-end font-bold text-4xl w-min">
                    <!-- <span>{{ x }}</span> -->
                    <span class="text-8xl">{{ x }}</span>

                    <div class="flex items-center justify-between">
                        <span class="text-8xl mr-2">x</span> 
                        <!-- <span>{{ y }}</span> -->
                        <span class="text-8xl">{{ y }}</span>
                    </div>

                    <div class="w-full border-b-10 border-black mt-5"></div> 
                </div>
            </div>
        </div>
    </div>
</template>