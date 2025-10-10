<script setup lang="ts">
const features = [
  {
    // icon: BookOpen,
    title: "Atividades Personalizadas",
    description: "Crie e atribua tarefas de matemática adaptadas às necessidades de cada aluno",
    color: "primary",
  },
  {
    // icon: Users,
    title: "Gestão de Turmas",
    description: "Organize salas virtuais e acompanhe múltiplos alunos de forma eficiente",
    color: "secondary",
  },
  {
    // icon: BarChart3,
    title: "Relatórios Visuais",
    description: "Visualize o progresso dos alunos através de gráficos e dashboards intuitivos",
    color: "accent",
  },
  {
    // icon: Gamepad2,
    title: "Interface Gamificada",
    description: "Ambiente lúdico e interativo que mantém as crianças engajadas",
    color: "primary",
  },
  {
    // icon: Star,
    title: "Avatares Personalizados",
    description: "Cada aluno tem seu próprio mascote para aumentar o vínculo com a plataforma",
    color: "secondary",
  },
  {
    // icon: Heart,
    title: "Design Inclusivo",
    description: "Interface acessível especialmente desenvolvida para crianças com TEA",
    color: "accent",
  }
]
</script>

<template>
    <section id="features" className="py-20 bg-background/30">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Recursos que fazem a <span className="text-lilac">diferença</span>
            </h2>
            <p className="text-xl text-muted-foreground">
                Ferramentas completas para transformar o ensino de matemática em uma experiência inclusiva e envolvente
            </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card
                    v-for="feature in features" 
                    :key="feature"
                    className="p-6 hover:shadow-medium transition-smooth hover:-translate-y-2 border-2 bg-card"
                >
                    <!-- <div className={`inline-flex p-4 rounded-2xl bg-${feature.color}/10 mb-4 shadow-soft`}>
                        <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                    </div> -->
                    <h3 className="text-xl font-bold mb-3">{{ feature.title }}</h3>
                    <p className="text-muted-foreground leading-relaxed">{{ feature.description }}</p>
                </Card>
            </div>
        </div>
    </section>
</template>