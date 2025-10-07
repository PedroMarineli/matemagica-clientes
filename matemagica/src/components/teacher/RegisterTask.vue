<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { defineEmits } from 'vue';
import { useUserStore } from '../../userStore';
import type { IClassrooms } from '../../interfaces/IClassrooms';

const emit = defineEmits(['close'])
const userStore = useUserStore()

const teacherId = computed(() => userStore.data?.id)

const closeComponent = () => {
  emit('close');
}

const form = reactive({
    title: '',
    type: '',
    content: '',
    difficulty: '',
    classroom_id: ''
})

const submitTask = async() => {
    const newTask = {
        title: form.title,
        type: form.type,
        teacher_id: teacherId.value,
        content: currentProblem.value,
        difficulty: form.difficulty,
        classroom_id: form.classroom_id,
    }
    
    try {
        const response = await axios.post('http://localhost:3000/tasks', newTask)
        // toast.success('Aluno adicionado com sucesso')
        // router.push(`/jobs/${response.data.id}`)
        if(response) {
            console.log('Tarefa registrado')
        }
    } catch(error) {
        console.error('Tarefa não foi adicionada', error)
        // toast.error('Aluno não foi adicionado')
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

const fruits = [
    "Maçã", "Pêra", "Banana", "Laranja", "Uva", "Manga", "Morango", "Kiwi", "Abacate"
]

const names = [
    "Léo", "Bia", "Cadu", "Duda", "Eva", "Gael", "Nina", "Ian", "Tom", "Manu", "Rafa", "Lia", "Dani", "Lucas", "Sofia", "Vini"
]

const problems = {
    addition: [
        "{names} tem {x} **{fruits}**s. Seu amigo deu mais {y} **{fruits}**s. Quantas **{fruits}**s {names} tem no total?",
        "Em uma caixa havia {x} blocos azuis e {y} blocos vermelhos. Quantos blocos há na caixa?",
        "{names} passou {x} minutos brincando e {y} minutos desenhando. Quantos minutos ela gastou no total?",

    ],
    subtraction: [
        "{names} comprou {x} adesivos. Ela usou {y} adesivos em seu caderno. Quantos adesivos restaram?",
        "No jardim havia {x} joaninhas. {y} delas voaram. Quantas joaninhas ficaram no jardim?",
        "{names} tinha {x} reais. Ele gastou {y} reais em um brinquedo. Com quantos reais ele ficou?",

    ],
    multiplication: [
        "{names} tem {x} caixas, e em cada caixa há {y} lápis. Quantos lápis {names} tem ao todo?",
        "Uma semana tem {x} dias. {names} faz exercícios por {y} semanas. Por quantos dias ela fez exercícios?",
        "Uma abelha tem {x} pernas. Quantas pernas {y} abelhas têm no total?",

    ],
    division: [
        "{names} tem {x} biscoitos para dividir igualmente entre {y} amigos. Quantos biscoitos cada amigo receberá?",
        "Uma régua tem {x} centímetros. Queremos dividir a régua em {y} partes iguais. Quantos centímetros terá cada parte?",
        "Há {x} bolas. Queremos guardar {y} bolas em cada cesto. De quantos cestos precisaremos?"
    ]
}

function getRangeByLevel(difficulty: string) {
    switch (difficulty) {
        case 'easy':
            return 20
        case 'intermediate':
            return 50
        case 'hard':
            return 100
        default:
            return 10 // Valor de segurança
    }
}

function formatarProblema(modelo: string, nome: string, numX: number, numY: number, fruta: string) {
    let problemaFinal = modelo;

    let x = numX.toString()
    let y = numY.toString()

    // 1. Substituição do Nome (Global)
    problemaFinal = problemaFinal.replace(/\{names\}/g, nome);

    // 2. Substituição dos Números (Global)
    problemaFinal = problemaFinal.replace(/\{x\}/g, x);
    problemaFinal = problemaFinal.replace(/\{y\}/g, y);

    // 3. Substituição das Frutas (com lógica de plural)
    const frutaPlural = fruta + "s";
    
    // ATENÇÃO: A ordem importa para o plural/singular!
    // Substitui PLURAIS primeiro (ex: **{fruits}**s)
    problemaFinal = problemaFinal.replace(/\*\*\{fruits\}\*\*s/g, frutaPlural);
    
    // Substitui SINGULARES depois (ex: **{fruits}**)
    problemaFinal = problemaFinal.replace(/\*\*\{fruits\}\*\*/g, fruta);

    return problemaFinal;
}

function createProblem() {
    type ProblemKey = 'addition' | 'subtraction' | 'multiplication' | 'division'
    
    const type: ProblemKey = form.type as ProblemKey
    const difficulty = form.difficulty

    // 1. Define o nível e o range
    const maxRange = getRangeByLevel(difficulty)
    
    // 2. Define a operação (ex: Soma) e os valores
    const x = Math.floor(Math.random() * (maxRange + 1))
    const y = Math.floor(Math.random() * (maxRange + 1))

    const problemTemplates = problems[type]

    if (!problemTemplates || problemTemplates.length === 0) {
        console.error(`Nenhum modelo de problema encontrado para o tipo: ${type}`)
        return null // Retorna nulo ou objeto de erro
    }
    
    // 3. Escolhe um prompt e as variáveis de contexto aleatoriamente
    const nomeAleatorio = names[Math.floor(Math.random() * names.length)]
    const frutaAleatoria = fruits[Math.floor(Math.random() * fruits.length)]
    const randomIndex = Math.floor(Math.random() * problemTemplates.length)
    const tarefaAleatoria = problemTemplates[randomIndex]
    
    const problemaPronto = formatarProblema(
        tarefaAleatoria, 
        nomeAleatorio, 
        x, 
        y, 
        frutaAleatoria 
    )

    return problemaPronto
}

const currentProblem = ref<string | null>(null)

function generateAndShowProblem() {
    const novoProblema = createProblem()
    currentProblem.value = novoProblema
    
    // Opcional: Aqui você também calcularia e armazenaria a resposta
}

</script>

<template>
    <form @submit.prevent="submitTask" class="grid gap-3">
        <div class="flex justify-between">
            <h1 class="font-bold text-lg">Registrar Tarefa:</h1>
            <div>
                <button @click="closeComponent">Fechar</button>
            </div>
        </div>
        <div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Nome:</label>
                <input
                    type="text"
                    v-model="form.title"
                    id="title"
                    name="title"
                    class="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Título da tarefa"
                    required
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
                    placeholder="Tipo da tarefa"
                    required
                />
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Dificuldade:</label>
                <select v-model="form.difficulty">
                    <option value="" disabled selected>Selecione a dificuldade da tarefa</option>
                    <option value="easy">Fácil</option>
                    <option value="intermediate">Médio</option>
                    <option value="hard">Difícil</option>
                </select>
            </div>
            <div @click="generateAndShowProblem()" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline">
                Criar tarefa
            </div>
            <div class="problem-area mt-8 p-6 border rounded-lg shadow-md">
                <div v-if="currentProblem">
                    <h2 class="text-xl font-bold text-primary mb-4">
                        Tarefa de Matemática:
                    </h2>
                    <p class="text-2xl">{{ currentProblem }}</p>
                </div>
            </div>
            <div>
                <label class="block text-gray-700 font-bold mb-2">Sala de Aula:</label>
                <select v-model="form.classroom_id">
                    <option value="" disabled selected>Selecione a Sala</option>
                    <option v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">{{ classroom.name }}</option>
                </select>
            </div>
        </div>
        <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
        >
            Adicionar Tarefa
        </button>
    </form>
</template>