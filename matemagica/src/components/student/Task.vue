<script setup lang="ts">
import { useUserStore } from '../../userStore';
import axios from 'axios';
import type { ITasks } from '../../interfaces/ITasks';
import { reactive, type PropType } from 'vue';

const userStore = useUserStore()

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
</script>

<template>
    <div class="container mx-auto px-4 py-8 max-w-6xl">

        <!-- Level progress -->
        <Card class="p-6 mb-8">
            <div class="flex items-center justify-between mb-3">
                <h2 class="text-2xl font-bold flex items-center gap-2">
                <Trophy class="w-6 h-6 text-accent" />
                Seu Progresso
                </h2>
                <span class="text-xl font-bold text-primary">Nível 3</span>
            </div>
            <Progress value={65} class="h-4 mb-2" />
            <p class="text-muted-foreground">Faltam 35 estrelas para o próximo nível!</p>
        </Card>

        <!-- Pending tasks -->
        <div class="mb-8">
            <h2 class="text-3xl font-bold mb-4 flex items-center gap-2">
                <Sparkles class="w-8 h-8 text-primary" />
                Suas Atividades
            </h2>
          
            <div class="grid sm:grid-cols-2 gap-6">
                <!-- Task card 1 -->
                <Card class="p-6 hover:shadow-glow transition-smooth hover:-translate-y-2 border-4 border-primary">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                        <span class="text-4xl">➕</span>
                        <span class="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                            {{ form.difficulty }}
                        </span>
                        </div>
                        <h3 class="text-2xl font-bold">{{ form.title }}</h3>
                        <p class="text-muted-foreground text-lg">{{ form.content }}</p>
                        <div class="space-y-2">
                        <div class="flex justify-between text-sm font-medium">
                            <span>Progresso</span>
                            <span>3/10 questões</span>
                        </div>
                        <Progress value={30} class="h-3" />
                        </div>
                        <Button variant="kid" size="lg" class="w-full">
                        <Play class="w-5 h-5" />
                        Continuar
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>