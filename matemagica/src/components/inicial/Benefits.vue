<script setup lang="ts">
const teacherBenefits = [
    "Economize tempo com criação automatizada de atividades",
    "Acompanhe o progresso individual de cada aluno",
    "Personalize atividades de acordo com o nível de cada criança",
    "Tenha relatórios visuais e fáceis de entender",
    "Organize turmas e tarefas em um só lugar",
]

const studentBenefits = [
    "Aprenda matemática de forma divertida e visual",
    "Interface amigável e fácil de navegar",
    "Tenha seu próprio avatar personalizado",
    "Receba feedback imediato sobre suas respostas",
    "Sinta-se motivado com conquistas e progresso visível",
]
</script>

<template>
    <section id="benefits" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">
                Benefícios para <span class="text-lilac">todos</span>
            </h2>
            <p class="text-xl text-muted-foreground">
                Uma solução que atende professores e alunos de forma única
            </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <!-- Para Professores -->
            <div class="space-y-6">
                    <div class="inline-flex items-center gap-2 bg-light-lilac px-4 py-2 rounded-full text-lilac font-bold">
                        👩‍🏫 Para Professores
                    </div>
                    <h3 class="text-3xl font-bold">Simplifique seu trabalho</h3>
                    <ul class="space-y-4">
                        <li v-for="teacherBenefit in teacherBenefits" :key="teacherBenefit" class="flex items-start gap-3">
                            <CheckCircle2 class="w-6 h-6 text-lilac flex-shrink-0 mt-0.5" />
                            <span class="text-lg text-muted-foreground">{{ teacherBenefit }}</span>
                        </li>
                    </ul>
            </div>

            <!-- Para Alunos -->
            <div class="space-y-6">
                <div class="inline-flex items-center gap-2 bg-light-green px-4 py-2 rounded-full text-green font-bold">
                    👧🧒 Para Alunos
                </div>
                <h3 class="text-3xl font-bold">Aprenda brincando</h3>
                <ul class="space-y-4">
                    <li v-for="studentBenefit in studentBenefits" :key="studentBenefit" class="flex items-start gap-3">
                        <CheckCircle2 class="w-6 h-6 text-green flex-shrink-0 mt-0.5" />
                        <span class="text-lg text-muted-foreground">{{ studentBenefit }}</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </section>
</template>