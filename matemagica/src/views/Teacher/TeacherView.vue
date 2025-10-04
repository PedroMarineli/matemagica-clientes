<script setup lang="ts">

</script>

<template>
    <!-- Main content -->
    <main className="lg:col-span-3 space-y-6">
        <!-- Welcome section -->
        <Card className="p-6 bg-gradient-primary text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Bem-vinda, Ana! 👋</h1>
                    <p className="text-white/90">Aqui está o resumo das suas turmas hoje</p>
                </div>
                <Sparkles className="w-16 h-16 opacity-50" />
            </div>
        </Card>

        <!-- Stats -->
        <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-6 hover:shadow-medium transition-smooth">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-2xl">
                        <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">24</p>
                        <p className="text-sm text-muted-foreground">Alunos</p>
                    </div>
                </div>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
                <div className="bg-secondary/10 p-3 rounded-2xl">
                    <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Salas</p>
                </div>
                </div>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-smooth">
            <div className="flex items-center gap-4">
                <div className="bg-accent/10 p-3 rounded-2xl">
                <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Tarefas Ativas</p>
                </div>
            </div>
            </Card>
        </div>

        <!-- Recent activity -->
        <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
            <div v-for="item in [1, 2, 3, 4]" :key="item" className="space-y-3">
                <div :key="item" className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-smooth">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        👧
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold">Lucas completou "Adição Básica"</p>
                        <p className="text-sm text-muted-foreground">Há 2 horas • Sala 3A</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-success">95%</p>
                    </div>
                </div>
            </div>
        </Card>
    </main>
</template>