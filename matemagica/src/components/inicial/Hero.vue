<script setup lang="ts">
</script>

<template>
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <!-- Background decorative elements -->
        <div class="absolute inset-0 gradient-background opacity-50"></div>
        <div class="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-40 right-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/3 right-10 w-24 h-24 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-500"></div>

        <div class="container mx-auto px-4 relative z-10">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Left column - Content -->
            <div class="space-y-8 text-center lg:text-left">
                <div class="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium shadow-soft">
                <Sparkles class="w-4 h-4" />
                <span>Aprendizado mágico de matemática</span>
                </div>

                <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Transforme o ensino de <span class="text-lilac">matemática</span> em uma aventura
                </h1>

                <p class="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Uma plataforma educacional gamificada especialmente desenvolvida para auxiliar professores no ensino de matemática para crianças com TEA
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="playful" size="xl" asChild class="group">
                    <Link to="/cadastro">
                    Começar Agora
                    <Sparkles class="w-5 h-5 group-hover:rotate-12 transition-smooth" />
                    </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                    <Link to="#features">Ver Como Funciona</Link>
                </Button>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div class="text-center lg:text-left">
                    <div class="text-3xl font-bold text-primary flex items-center justify-center lg:justify-start gap-2">
                    <Heart class="w-6 h-6 fill-current" />
                    100%
                    </div>
                    <div class="text-sm text-muted-foreground">Inclusivo</div>
                </div>
                <div class="text-center lg:text-left">
                    <div class="text-3xl font-bold text-secondary flex items-center justify-center lg:justify-start gap-2">
                    <Star class="w-6 h-6 fill-current" />
                    Lúdico
                    </div>
                    <div class="text-sm text-muted-foreground">Gamificado</div>
                </div>
                <div class="text-center lg:text-left">
                    <div class="text-3xl font-bold text-accent flex items-center justify-center lg:justify-start gap-2">
                    <Sparkles class="w-6 h-6 fill-current" />
                    Fácil
                    </div>
                    <div class="text-sm text-muted-foreground">Intuitivo</div>
                </div>
                </div>
            </div>

            <!-- Right column - Mascot -->
            <div class="relative flex items-center justify-center">
                <div class="relative">
                <!-- Glow effect -->
                <div class="absolute inset-0 bg-gradient-primary blur-3xl opacity-30 rounded-full"></div>
                
                <!-- Mascot image -->
                <img 
                    src="../../assets/mascot-hero.png"
                    alt="Mascote Matemágica" 
                    class="relative w-full max-w-md lg:max-w-lg animate-float shadow-glow rounded-3xl"
                />

                <!-- Floating elements -->
                <div class="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-2xl shadow-medium animate-bounce font-bold text-lg">
                    1 + 1 = 2
                </div>
                <div class="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-2xl shadow-medium animate-bounce delay-500 font-bold text-lg">
                    ⭐ 5 x 2 = 10
                </div>
                </div>
            </div>
            </div>
      </div>
    </section>
</template>

<style>
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}
.animate-float {
    animation: float 3s ease-in-out infinite;
}
.delay-500 {
    animation-delay: 0.5s;
}
.delay-1000 {
    animation-delay: 1s;
}
</style>