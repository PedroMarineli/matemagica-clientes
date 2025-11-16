<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '../../userStore';
import axios from 'axios';
import type { IProblems, ITaskProgress } from '../../interfaces/ITasks';
import { useRouter } from 'vue-router';
import trofeu from '../../../public/icons/trophy.png';
import estrela from '../../../public/icons/christmas-stars.png';
import api from '../../services/api';

const userStore = useUserStore()
const router = useRouter()
const pendingTasks = ref<ITaskProgress[] | null>([])
const completedTasks = ref<ITaskProgress[] | null>([])

const parseContentToJson = (jsonString: string): IProblems[] => {
  if (!jsonString || typeof jsonString !== 'string' || !jsonString.startsWith('[')) {
    return []
  }

  try {
    const problemsArray = JSON.parse(jsonString)

    if (Array.isArray(problemsArray)) {
      return problemsArray as IProblems[]
    }
    return []
  } catch (error) {
    console.error("Erro ao analisar JSON de problema:", error)
    return []
  }
}

const form = reactive({
  student_id: userStore.data?.user.id,
  status: 'In Progress'
})

const changeStatus = async(id: any, score: any) => {
  const statusAltered = {
    student_id: form.student_id,
    task_id: id,
    status: form.status,
    score: score
  }

  try {
    const response = await axios.put('http://localhost:3000/progress/update', statusAltered)
    pendingTasks.value = response.data as ITaskProgress[]
  } catch(error) {
    console.error('Error fetching job', error)
  }
}

const navigateToTask = (task: ITaskProgress) => {
  if(task.status == 'Not Started') {
    changeStatus(task.task_id, task.score)
  }
  router.push({
    path: `/alunos/tarefa/${task.task_id}`
  })
}

onMounted(async () => {
  try {
    const notCompletedTasks = await api.get(`http://localhost:3000/progress/student/${userStore.data?.user.id}?status=pending`)
    pendingTasks.value = notCompletedTasks.data as ITaskProgress[]
    const finishedTasks = await api.get(`http://localhost:3000/progress/student/${userStore.data?.user.id}?status=completed`)
    completedTasks.value = finishedTasks.data as ITaskProgress[]
  } catch(error) {
    console.error('Error fetching job', error)
  }
})

const formatData = (dataString: string) => {
    if (!dataString) return ''
    const date = new Date(dataString)
    
    return date.toLocaleDateString('pt-BR')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <div class="flex justify-center gap-14 card p-10 mb-8 bg-gradient-warm shadow-glow">
      <div class="w-96 h-96 rounded-full bg-background flex items-center justify-center text-6xl border-4 border-white shadow-medium">
        <img class="w-full h-full rounded-full object-cover" :src="userStore.data?.user.cartoon_image_path" alt="Imagem do Avatar" crossorigin="anonymous">
      </div>
      <div class="flex gap-10 flex-col justify-center">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="text-center md:text-left flex-1">
            <h1 class="text-4xl font-bold mb-2">Olá, {{ userStore.data?.user.username }}! 🎉</h1>
            <p class="text-lg text-black/90">Você está indo muito bem!</p>
          </div>
          <div class="flex gap-4">
            <div class="text-center bg-white/20 px-6 py-3 rounded-2xl">
              <div class="text-3xl font-bold">⭐ 45</div>
              <div class="text-sm">Estrelas</div>
            </div>
            <div class="text-center bg-white/20 px-6 py-3 rounded-2xl">
              <div class="text-3xl font-bold">🏆 5</div>
              <div class="text-sm">Troféus</div>
            </div>
          </div>
        </div>
        <div class="bg-background p-8 rounded-2xl">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-2xl font-bold flex items-center gap-3 bg-orange text-accent-foreground px-5 py-2 rounded-full">
              <img :src="trofeu" alt="Troféu" class="w-6 h-6"/>
              Seu Progresso
            </h2>
            <span class="text-xl font-bold text-lilac">Nível 1</span>
          </div>
          <p class="text-muted-foreground">Faltam 35 estrelas para o próximo nível!</p>
        </div>
      </div>
    </div>

    <!-- Pending tasks -->
    <div class="my-8">
      <h2 class="text-3xl font-bold mb-4 flex items-center gap-2">
        <img :src="estrela" alt="Estrela" class="w-8 h-8"/>
        Suas Atividades
      </h2>
      
      <div class="grid sm:grid-cols-2 gap-6">
        <template v-if="pendingTasks && pendingTasks.length >= 1">
          <div v-for="task in pendingTasks" :key="task.task_id" class="card p-6 hover:shadow-glow transition-smooth hover:-translate-y-2 border-4 border-purple-400">
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
              <div class="flex flex-col">
                <div v-for="(problem, index) in parseContentToJson(task.content)" :key="index">
                  <label class="block text-gray-700 mb-2">{{ problem.content }}</label>
                </div>
              </div>
              <p class="text-muted-foreground text-lg">
                  {{ task.status === 'In Progress' ? 'Em Progresso' : 
                      task.status === 'Not Started' ? 'Não Iniciado' : 
                      task.status === 'Graded' ? 'Corrigido' : 
                      task.status === 'Submitted' ? 'Submetido' : 'Desconhecido' }}
              </p>
              <div class="space-y-2">
                <div class="flex justify-between text-sm font-medium">
                  <span>Progresso</span>
                  <span>{{ parseContentToJson(task.content).length }} questões</span>
                </div>
              </div>
              <button @click="navigateToTask(task)" class="w-full py-3 px-10 rounded-xl font-bold hover:shadow-glow transition-smooth hover:-translate-y-2 cursor-pointer bg-orange text-accent-foreground shadow-soft">
                {{ task.status === 'In Progress' ? 'Continuar' : 
                      task.status === 'Not Started' ? 'Começar' : 'Continuar' }}
              </button>
            </div>
          </div>
        </template>

        <div v-else class="p-6 card opacity-60 border-4 border-muted">
          <div class="space-y-4 text-center">
            <div class="text-6xl">🔒</div>
            <h3 class="text-2xl font-bold">Sem tarefas</h3>
            <p class="text-muted-foreground text-lg">Não foram adicionadas tarefas para você!</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="completedTasks && completedTasks.length > 0">
      <h2 class="text-3xl font-bold mb-4 flex items-center gap-2">
        <img :src="estrela" alt="Estrela" class="w-8 h-8"/>
        Atividades Concluídas ⭐
      </h2>

      <div class="grid gap-5 card py-8 px-10 mb-8 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div v-for="task in completedTasks" class="bg-background px-10 py-4 space-y-4 rounded-4xl shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-5">
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
              <h3 class="text-2xl font-bold">{{ task.title }}</h3>
            </div>
            <span class="bg-orange text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
              {{ task.difficulty === 'easy' ? 'Fácil' : 
                  task.difficulty === 'medium' ? 'Médio' : 
                  task.difficulty === 'hard' ? 'Difícil' : 'Desconhecido' }}
            </span>
          </div>
          <div class="w-full flex justify-between items-center gap-8">
            <div class="flex flex-col">
              <div v-for="(problem, index) in parseContentToJson(task.content)" :key="index" class="flex gap-8 items-center">
                <label class="block text-gray-700 mb-2">{{ problem.content }}</label>
                <div class="flex gap-2">
                  <label>Resposta:</label>
                  <label class="block text-gray-700 mb-2">{{ problem.answer }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-around">
            <div class="flex gap-2 items-center bg-lilac text-white px-3 py-1 rounded-full text-sm font-bold">
              <span class="bg-orange text-black px-3 py-1 rounded-full text-sm font-bold">Concluído em:</span>
              <span>{{ formatData(task.completion_date) }}</span>
            </div>
            <div class="flex gap-2 items-center bg-lilac text-white px-3 py-1 rounded-full text-sm font-bold">
              <span class="bg-orange text-black px-3 py-1 rounded-full text-sm font-bold">Nota:</span>
              <span>{{ task.score }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Achievements -->
    <div class="card p-6">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <img :src="trofeu" alt="Troféu" class="w-6 h-6"/>
        Suas Conquistas
      </h2>
      <div class="flex">
        <div v-for="emoji in ['🏅', '⭐', '🎖️', '👑', '🌟']" :key="emoji" class="flex pb-2">
            <div
                class="w-20 h-20 mr-7 bg-background rounded-2xl flex items-center justify-center text-4xl shadow-medium hover:scale-110 transition-bounce cursor-pointer"
            >
                {{ emoji }}
            </div>
        </div>
        <div class="w-20 h-20 bg-background rounded-2xl flex items-center justify-center text-4xl opacity-30">
            🔒
        </div>
      </div>
    </div>
  </div>
</template>