<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, reactive, ref } from 'vue';
import { defineEmits } from 'vue';
import { useUserStore } from '../../userStore';
import type { IClassrooms } from '../../interfaces/IClassrooms';
import type { IProblems } from '../../interfaces/ITasks';
import { showNotification } from '../../stores/notificationStore';
import router from '../../router';

const emit = defineEmits(['close'])
const userStore = useUserStore()

const teacherId = computed(() => userStore.data?.user.id)

type ProblemKey = 'addition' | 'additionWithProblems' | 'subtraction' | 'subtractionWithProblems' | 'multiplication' | 'multiplicationWithProblems' | 'division' | 'divisionWithProblems'
const classrooms = ref<IClassrooms[] | null>(null)

const form = reactive({
    title: '',
    type: '',
    content: '',
    answer: 0,
    difficulty: '',
    classroom_id: 0
})

const submitTask = async() => {
    const newTask = {
        title: form.title,
        type: form.type,
        teacher_id: teacherId.value,
        content: listOfProblems.value,
        answer: form.answer,
        difficulty: form.difficulty,
        classroom_id: form.classroom_id,
    }
    
    try {
        const response = await axios.post('http://localhost:3000/tasks', newTask)

        if(response) {
            router.push('/professores/tarefas')
            showNotification('Tarefa adicionada com sucesso!', 'bg-green-500')
        }
    } catch(error) {
        showNotification('Não foi possível adicionar tarefa', 'bg-red-500')
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

const objects = [
    "🍎 Maçã", "🍐 Pêra", "🍌 Banana", "🍊 Laranja", "🍇 Uva", "🥭 Manga", "🍓 Morango", "🥝 Kiwi", "🥑 Abacate", "🍉 Melancia", "🥕 Cenoura", "🥔 Batata", "🍅 Tomate", "🥖 Baguete", "🍕 Pizza", "🍰 Bolo", "🍩 Rosquinha", "🍪 Biscoito", "🍫 Chocolate", "🍦 Sorvete", "🍬 Bala", "🥤 Refrigerante", "📚 Livro", "🖊️ Caneta", "📎 Clipe de Papel", "✂️ Tesoura", "📏 Régua"
]

const names = [
    "Léo", "Bia", "Cadu", "Duda", "Eva", "Gael", "Nina", "Ian", "Tom", "Manu", "Rafa", "Lia", "Dani", "Lucas", "Sofia", "Vini"
]

const problems = {
    addition: [
        "{x} + {y}"
    ],
    subtraction: [
        "{x} - {y}"
    ],
    multiplication: [
        "{x} * {y}"
    ],
    division: [
        "{x} / {y}"
    ],
    additionWithProblems: [
        "{names} tem {x} **{objects}**s. Seu amigo deu mais {y} **{objects}**s. Qual o total de **{objects}**s que {names} tem agora?",
        "Em uma caixa havia {x} blocos azuis e {y} blocos vermelhos. Quantos blocos há na caixa? 🟦🟥",
        "{names} passou {x} minutos brincando e {y} minutos desenhando. Quantos minutos ela gastou no total? ⏰",
        "Uma árvore de Natal tem {x} enfeites vermelhos e {y} enfeites dourados. Quantos enfeites a árvore tem no total? 🎄",
        "Na biblioteca há {x} livros de aventura e {y} livros de história. Qual o número total de livros na biblioteca? 📚",
        "{names} colecionou {x} figurinhas este mês e {y} no mês passado. Quantas figurinhas ela tem agora? 🖼️",
        "No estacionamento havia {x} carros de manhã e {y} carros chegaram à tarde. Quantos carros estão no estacionamento agora? 🚗",
        "Uma pizzaria vendeu {x} pizzas de queijo e {y} pizzas de calabresa. Quantas pizzas foram vendidas no total? 🍕",
        "No primeiro dia, {names} encontrou {x} **{objects}**s e no segundo dia, {y} **{objects}**s. Qual o total de **{objects}**s que {names} encontrou?",
        "Um armário tem {x} **{objects}**s na prateleira de cima e {y} **{objects}**s na prateleira de baixo. Qual o total de **{objects}**s no armário?",
        "A loja recebeu uma entrega de {x} **{objects}**s grandes e {y} **{objects}**s de tamanho pequeno. Qual o total de **{objects}**s que a loja recebeu?",

    ],
    subtractionWithProblems: [
        "{names} comprou {x} adesivos. Ela usou {y} adesivos em seu caderno. Quantos adesivos restaram?",
        "No jardim havia {x} joaninhas. {y} delas voaram. Quantas joaninhas ficaram no jardim? 🐞",
        "{names} tinha {x} reais. Ele gastou {y} reais em um brinquedo. Com quantos reais ele ficou? 💰",
        "Havia {x} **{objects}**s na prateleira. {y} **{objects}**s foram vendidos. Qual a quantidade de **{objects}**s que tem na prateleira agora?",
        "Um ônibus levava {x} passageiros. Na primeira parada, {y} passageiros desceram. Quantos passageiros continuam no ônibus? 🚌",
        "O placar de um jogo estava {x} a {y}. Por quantos pontos um time está à frente do outro? ⚽",
        "O time de {names} marcou {x} pontos no total. Se {y} pontos foram marcados no primeiro tempo, quantos pontos foram marcados no segundo tempo?",
        "Havia {x} balões na festa. {y} balões estouraram. Quantos balões sobraram? 🎈",
        "Um livro tem {x} páginas. {names} já leu {y} páginas. Quantas páginas faltam para {names} terminar o livro? 📚",
        "Havia {x} **{objects}**s em uma caixa. {names} tirou {y} **{objects}**s para brincar. Qual a quantidade de **{objects}**s que resta na caixa?",
        "Uma fábrica processou {x} **{objects}**s hoje. {y} **{objects}**s foram considerados defeituosos. Qual a quantidade de **{objects}**s que está apto para venda?",

    ],
    multiplicationWithProblems: [
        "{names} tem {x} caixas, e em cada caixa há {y} lápis. Quantos lápis {names} tem ao todo?",
        "Uma semana tem {x} dias. {names} faz exercícios por {y} semanas. Por quantos dias ela fez exercícios? 🗓️",
        "Uma abelha tem {x} pernas. Quantas pernas {y} abelhas têm no total? 🐝",
        "{names} tem {x} bandejas de **{objects}**s, e cada bandeja contém {y} **{objects}**s. Qual o total de **{objects}**s?",
        "Um prédio tem {x} andares. Se em cada andar há {y} apartamentos, quantos apartamentos tem o prédio? 🏢",
        "Cada bilhete para o cinema custa {x} reais. Quanto {names} gastará para comprar {y} bilhetes? 🎟️",
        "Uma caixa de lápis de cor tem {x} cores diferentes. Se {names} tem {y} caixas, quantas cores diferentes {names} possui? 🖍️",
        "Em um teatro há {x} fileiras, e cada fileira tem {y} cadeiras. Quantas cadeiras há no teatro? 🎭",
        "O salário de {names} é de {x} reais por dia. Quanto ele ganhará trabalhando por {y} dias?",
        "Cada aluno precisa de {x} **{objects}**s para o projeto. Se há {y} alunos na turma, qual o total de **{objects}**s que o professor precisará?",
        "Uma impressora consegue imprimir {x} páginas por minuto. Quantas páginas ela imprimirá em {y} minutos? 🖨️",
        "Há {x} sacolas, e em cada sacola {names} colocou {y} **{objects}**s. Qual o total de **{objects}**s que ela colocou nas sacolas?",

    ],
    divisionWithProblems: [
        "{names} tem {x} **{objects}**s para dividir igualmente entre {y} amigos. Qual a quantia de **{objects}**s que cada amigo receberá?",
        "Uma régua tem {x} centímetros. Queremos dividir a régua em {y} partes iguais. Quantos centímetros terá cada parte? 📏",
        "Há {x} bolas. Queremos guardar {y} bolas em cada cesto. De quantos cestos precisaremos? ⚽",
        "Um professor tem {x} alunos e {y} mesas grandes. Quantos alunos ficarão em cada mesa, se a divisão for igual?",
        "Há {x} metros de fita. {names} precisa cortar pedaços de {y} metros cada. Quantos pedaços de fita ela conseguirá cortar? 🎗️",
        "Para fazer um bolo são necessários {y} ovos. Quantos bolos {names} poderá fazer com {x} ovos? 🍰",
        "Uma professora tem {x} figurinhas para distribuir igualmente para {y} alunos. Quantas figurinhas cada aluno receberá? 🖼️",
        "Um pacote de balas tem {x} balas. Se cada criança pode receber {y} balas, para quantas crianças o pacote será suficiente? 🍬",
        "Um muro tem {x} tijolos no total. Se há {y} tijolos em cada linha, quantas linhas de tijolos o muro tem? 🧱",
        "Uma pilha de {x} **{objects}**s precisa ser dividida em {y} pilhas menores e iguais. Quantos **{objects}**s terá cada pilha?",
        "{names} tem {x} **{objects}**s e quer colocá-los em caixas, cabendo {y} **{objects}**s em cada caixa. De quantas caixas ele precisará?",
        "Se {x} **{objects}**s custaram {y} reais, qual é o preço de um(a) único(a) **{objects}**?",
    ]
}

function getRangeByLevel(difficulty: string, type: string): number {
    const types = [
        'multiplication', 
        'multiplicationWithProblems', 
        'division', 
        'divisionWithProblems'
    ]

    const shortRangeMap: { [key: string]: number } = {
        'easy': 6,
        'medium': 10,
        'hard': 20
    }

    const defaultRangeMap: { [key: string]: number } = {
        'easy': 20,
        'medium': 50,
        'hard': 100
    }

    if (types.includes(type)) {
        return shortRangeMap[difficulty] ?? 10
    }

    return defaultRangeMap[difficulty] ?? 10
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
    // Substitui PLURAIS primeiro (ex: **{objects}**s)
    problemaFinal = problemaFinal.replace(/\*\*\{objects\}\*\*s/g, frutaPlural);
    
    // Substitui SINGULARES depois (ex: **{objects}**)
    problemaFinal = problemaFinal.replace(/\*\*\{objects\}\*\*/g, fruta);

    return problemaFinal;
}

function generateProblemValues(difficulty: string, type: ProblemKey, getRangeByLevel: (difficulty: string, type: string) => number) {
    // 1. Define o nível e o range
    const maxRange = getRangeByLevel(difficulty, type)
    
    // 2. Define a operação (ex: Soma) e os valores
    let x = Math.floor(Math.random() * (maxRange + 1))
    let y = Math.floor(Math.random() * (maxRange + 1))

    if (type === 'subtraction' || type === 'subtractionWithProblems') {
        if (x < y) {
            [x, y] = [y, x]
        }
    }

    if (type === 'division' || type === 'divisionWithProblems') {
        if (x < 4) {
            x = Math.floor(Math.random() * maxRange) + 1
        }
        if (y == 1) {
            y = Math.floor(Math.random() * maxRange) + 1
        }
        while (x % y != 0) {
            y = Math.floor(Math.random() * (maxRange + 1))
        }
    }

    return { x, y }
}

function createProblem() {   
    const type: ProblemKey = form.type as ProblemKey
    const difficulty = form.difficulty
    
    // 2. Define a operação (ex: Soma) e os valores
    const { x, y } = generateProblemValues(difficulty, type, getRangeByLevel)

    const problemTemplates = problems[type]

    if (!problemTemplates || problemTemplates.length === 0) {
        console.error(`Nenhum modelo de problema encontrado para o tipo: ${type}`)
        return null // Retorna nulo ou objeto de erro
    }
    
    // 3. Escolhe um prompt e as variáveis de contexto aleatoriamente
    const nomeAleatorio = names[Math.floor(Math.random() * names.length)]
    const objetoAleatorio = objects[Math.floor(Math.random() * objects.length)]
    const randomIndex = Math.floor(Math.random() * problemTemplates.length)
    const tarefaAleatoria = problemTemplates[randomIndex]
    
    const problemaPronto = formatarProblema(
        tarefaAleatoria, 
        nomeAleatorio, 
        x, 
        y, 
        objetoAleatorio 
    )

    return { problemaPronto, x, y }
}

const listOfProblems = ref<IProblems[] | null>(null)

function generateAndShowProblem() {
    const currentProblem = ref<string | null>(null)
    const problemData = createProblem()
    let answer = 0

    if (!problemData) {
        return
    }

    let x = problemData.x
    let y = problemData.y
    const novoProblema = problemData.problemaPronto
    currentProblem.value = novoProblema

    const operation = form.type

    switch (operation) {
        case 'addition':
        case 'additionWithProblems':
            answer = x + y
            break
        case 'subtraction':
        case 'subtractionWithProblems':
            answer = x - y
            break
        case 'multiplication':
        case 'multiplicationWithProblems':
            answer = x * y
            break
        case 'division':
        case 'divisionWithProblems':
            answer = x / y
            break
        default:
            return
    }

    const newProblem = {
        content: novoProblema,
        answer: answer
    }

    if (!listOfProblems.value) {
        listOfProblems.value = []
    }
    
    listOfProblems.value.push(newProblem)
}

</script>

<template>
    <div class="h-full flex md:justify-between lg:flex-row flex-1">
        <form @submit.prevent="submitTask" class="grid gap-3">
            <div class="grid px-20 items-center gap-10 py-5 lg:py-10 lg:grid-cols-2 xl:px-56">
                <div class="card w-full flex flex-col gap-5 items-center justify-between">
                    <div class="flex justify-between">
                        <h1 class="text-xl font-bold text-lilac">Registrar Tarefa</h1>
                    </div>
                    <div class="grid gap-5">
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Nome:</label>
                            <input
                                type="text"
                                v-model="form.title"
                                id="title"
                                name="title"
                                class="border rounded w-full py-2 px-3"
                                placeholder="Título da tarefa"
                                required
                            />
                        </div>
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Categoria:</label>
                            <select v-model="form.type" class="w-full border rounded py-2 px-3">
                                <option value="" disabled selected>Selecione a categoria da tarefa</option>
                                <option value="addition">Adição</option>
                                <option value="subtraction">Subtração</option>
                                <option value="multiplication">Multiplicação</option>
                                <option value="division">Divisão</option>
                                <option value="additionWithProblems">Adição com Problemas</option>
                                <option value="subtractionWithProblems">Subtração com Problemas</option>
                                <option value="multiplicationWithProblems">Multiplicação com Problemas</option>
                                <option value="divisionWithProblems">Divisão com Problemas</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Dificuldade:</label>
                            <select v-model="form.difficulty" class="w-full border rounded py-2 px-3">
                                <option value="" disabled selected>Selecione a dificuldade da tarefa</option>
                                <option value="easy">Fácil</option>
                                <option value="medium">Médio</option>
                                <option value="hard">Difícil</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Sala de Aula:</label>
                            <select v-model="form.classroom_id" class="w-full border rounded py-2 px-3">
                                <option value="" disabled selected>Selecione a Sala</option>
                                <option v-for="classroom in classrooms" :key="classroom.id" :value="classroom.id">{{ classroom.name }}</option>
                            </select>
                        </div>
                        <div @click="generateAndShowProblem()" class="bg-green text-center hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer">
                            Criar tarefa
                        </div>
                    </div>
                </div>
                <div class="card w-full px-10">
                    <div v-if="listOfProblems" class="flex flex-col gap-5 items-center justify-between">
                        <h2 class="text-xl font-bold text-lilac">
                            Tarefa de Matemática:
                        </h2>
                        <div class="grid gap-3 problem-area">
                            <div v-for="problem in listOfProblems" class="grid sm:flex gap-5 items-center">
                                <p>{{ problem.content }}</p>
                                <p class="bg-lilac text-white px-3 py-1 rounded-full text-center text-sm font-bold whitespace-nowrap">R: {{ problem.answer }}</p>
                            </div>
                        </div>
                        <button
                            class="bg-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline cursor-pointer"
                            type="submit"
                        >
                            Adicionar Tarefa
                        </button>
                    </div>
                    <div v-else>
                        <h2 class="text-xl font-bold text-lilac">
                            Nenhuma Tarefa Adicionada
                        </h2>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>