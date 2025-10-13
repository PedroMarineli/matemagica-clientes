<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '../../userStore';
import axios from 'axios';
import type { ITaskProgress } from '../../interfaces/ITasks';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()
const pendingTasks = ref<ITaskProgress[] | null>([])
const completedTasks = ref<ITaskProgress[] | null>([])

const form = reactive({
  student_id: userStore.data?.id,
  status: 'In Progress'
})

const changeStatus = async(id: any, score: any) => {
  const statusAltered = {
    student_id: form.student_id,
    task_id: id,
    status: form.status,
    score: score
  }

  console.log(statusAltered)
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
        const notCompletedTasks = await axios.get(`http://localhost:3000/progress/student/${userStore.data?.id}?status=pending`)
        pendingTasks.value = notCompletedTasks.data as ITaskProgress[]
        const finishedTasks = await axios.get(`http://localhost:3000/progress/student/${userStore.data?.id}?status=completed`)
        completedTasks.value = finishedTasks.data as ITaskProgress[]
    } catch(error) {
        console.error('Error fetching job', error)
    }
})
</script>

<template>
      <div class="container mx-auto px-4 py-8 max-w-6xl">
        <!-- Welcome section with avatar -->
        <Card class="p-8 mb-8 bg-gradient-warm shadow-glow">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-6xl border-4 border-white shadow-medium">
              👦
            </div>
            <div class="text-center md:text-left flex-1">
              <h1 class="text-4xl font-bold mb-2">Olá, {{ userStore.data?.username }}! 🎉</h1>
              <p class="text-xl text-black/90">Você está indo muito bem!</p>
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
        </Card>

        <!-- Level progress -->
        <Card class="p-6 mb-8">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-2xl font-bold flex items-center gap-2">
              <Trophy class="w-6 h-6 text-accent" />
              Seu Progresso
            </h2>
            <span class="text-xl font-bold text-lilac">Nível 3</span>
          </div>
          <Progress value={65} class="h-4 mb-2" />
          <p class="text-muted-foreground">Faltam 35 estrelas para o próximo nível!</p>
        </Card>

        <!-- Pending tasks -->
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-4 flex items-center gap-2">
            <Sparkles class="w-8 h-8 text-lilac" />
            Suas Atividades
          </h2>
          
          <div class="grid sm:grid-cols-2 gap-6">
            <!-- Task card 1 -->
            <Card v-for="task in pendingTasks" class="p-6 hover:shadow-glow transition-smooth hover:-translate-y-2 border-4 border-primary">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-4xl">➕</span>
                  <span class="bg-orange text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                    {{ task.difficulty }}
                  </span>
                </div>
                <h3 class="text-2xl font-bold">{{ task.title }}</h3>
                <p class="text-muted-foreground text-lg">{{ task.content }}</p>
                <p class="text-muted-foreground text-lg">{{ task.status }}</p>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm font-medium">
                    <span>Progresso</span>
                    <span>3/10 questões</span>
                  </div>
                  <Progress value={30} class="h-3" />
                </div>
                <button @click="navigateToTask(task)" variant="kid" size="lg" class="w-full">
                  <Play class="w-5 h-5" />
                  Continuar
                </button>
              </div>
            </Card>

            <!-- Task card 2 -->
            <Card class="p-6 hover:shadow-glow transition-smooth hover:-translate-y-2 border-4 border-secondary">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-4xl">➖</span>
                  <span class="bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Médio
                  </span>
                </div>
                <h3 class="text-2xl font-bold">Subtração Mágica</h3>
                <p class="text-muted-foreground text-lg">Descubra quanto sobra depois de subtrair!</p>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm font-medium">
                    <span>Progresso</span>
                    <span>0/10 questões</span>
                  </div>
                  <Progress value={0} class="h-3" />
                </div>
                <button variant="success" size="lg" class="w-full">
                  <Star class="w-5 h-5" />
                  Começar
                </button>
              </div>
            </Card>

            <!-- Task card 3 -->
            <Card class="p-6 hover:shadow-glow transition-smooth hover:-translate-y-2 border-4 border-accent">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-4xl">🔢</span>
                  <span class="bg-success text-light-green-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Fácil
                  </span>
                </div>
                <h3 class="text-2xl font-bold">Conte os Objetos</h3>
                <p class="text-muted-foreground text-lg">Quantos objetos você consegue contar?</p>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm font-medium">
                    <span>Progresso</span>
                    <span>10/10 questões</span>
                  </div>
                  <Progress value={100} class="h-3" />
                </div>
                <button variant="outline" size="lg" class="w-full" disabled>
                  <Trophy class="w-5 h-5" />
                  Completo! ⭐
                </button>
              </div>
            </Card>

            <!-- Locked task -->
            <Card class="p-6 opacity-60 border-4 border-muted">
              <div class="space-y-4 text-center">
                <div class="text-6xl">🔒</div>
                <h3 class="text-2xl font-bold">Próxima Aventura</h3>
                <p class="text-muted-foreground text-lg">Complete as tarefas anteriores para desbloquear!</p>
                <button variant="ghost" size="lg" class="w-full" disabled>
                  Bloqueado
                </button>
              </div>
            </Card>
          </div>
        </div>

        <h2 class="text-3xl font-bold mb-4 flex items-center gap-2">
          <Sparkles class="w-8 h-8 text-lilac" />
          Atividades Concluídas
        </h2>

        <div v-for="task in completedTasks" class="py-8 px-10 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-5">
                <span class="text-4xl">➕</span>
                <h3 class="text-2xl font-bold">{{ task.title }}</h3>
              </div>
              <span class="bg-orange text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                {{ task.difficulty }}
              </span>
            </div>
            <p class="text-muted-foreground text-lg">{{ task.content }}</p>
            <p class="text-muted-foreground text-lg">{{ task.status }}</p>
          </div>
        </div>

        <!-- Achievements -->
        <Card class="p-6">
          <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy class="w-6 h-6 text-accent" />
            Suas Conquistas
          </h2>
          <div class="flex">
                <div v-for="emoji in ['🏅', '⭐', '🎖️', '👑', '🌟']" :key="emoji" class="flex gap-4 overflow-x-auto pb-2">
                    <div
                        class="flex-shrink-0 w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center text-4xl shadow-medium hover:scale-110 transition-bounce cursor-pointer"
                    >
                        {{ emoji }}
                    </div>
                </div>
                <div class="flex-shrink-0 w-20 h-20 bg-background rounded-2xl flex items-center justify-center text-4xl opacity-30">
                    🔒
                </div>
          </div>
        </Card>
      </div>
</template>