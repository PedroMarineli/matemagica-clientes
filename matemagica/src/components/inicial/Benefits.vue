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
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Benefícios para <span className="text-gradient-primary">todos</span>
            </h2>
            <p className="text-xl text-muted-foreground">
                Uma solução que atende professores e alunos de forma única
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <!-- Para Professores -->
            <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-bold shadow-soft">
                        👩‍🏫 Para Professores
                    </div>
                    <h3 className="text-3xl font-bold">Simplifique seu trabalho</h3>
                    <ul className="space-y-4">
                        <li v-for="teacherBenefit in teacherBenefits" :key="teacherBenefit" className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-lg text-muted-foreground">{{ teacherBenefit }}</span>
                        </li>
                    </ul>
            </div>

            <!-- Para Alunos -->
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full text-secondary font-bold shadow-soft">
                    👧🧒 Para Alunos
                </div>
                <h3 className="text-3xl font-bold">Aprenda brincando</h3>
                <ul className="space-y-4">
                    <li v-for="studentBenefit in studentBenefits" :key="studentBenefit" className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-lg text-muted-foreground">{{ studentBenefit }}</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </section>
</template>