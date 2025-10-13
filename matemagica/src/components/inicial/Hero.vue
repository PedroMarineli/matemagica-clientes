<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <!-- Background decorative elements -->
        <div class="absolute inset-0 gradient-background opacity-50"></div>
        <div class="absolute top-20 left-10 w-20 h-20 bg-orange/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-40 right-20 w-32 h-32 bg-lilac/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/3 right-10 w-24 h-24 bg-green/20 rounded-full blur-3xl animate-pulse delay-500"></div>

        <div class="container mx-auto px-4 relative z-10">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Left column - Content -->
            <div class="space-y-8 text-center lg:text-left">
                <div class="inline-flex items-center gap-2 bg-light-lilac px-4 py-2 rounded-full text-lilac font-medium">
                    <span>Aprendizado mágico de matemática</span>
                </div>

                <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    Transforme o ensino de <span class="text-lilac">matemática</span> em uma aventura
                </h1>

                <p class="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                    Uma plataforma educacional gamificada especialmente desenvolvida para auxiliar professores no ensino de matemática para crianças com TEA
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button variant="playful" class="h-14 px-10 text-lg group text-white bg-lilac hover:scale-105 transition-bounce rounded-2xl shadow-medium font-bold">
                        <RouterLink to="/cadastro">
                            Começar Agora
                        </RouterLink>
                    </button>
                    <button class="h-14 px-10 text-lg font-bold group border-2 border-lilac bg-background text-lilac rounded-xl">
                        <RouterLink to="#features">Ver Como Funciona</RouterLink>
                    </button>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-6 pt-8 border-t border-gray-300">
                    <div class="text-center lg:text-left">
                        <div class="text-3xl font-bold text-lilac flex items-center justify-center lg:justify-start gap-2">
                            <Heart class="w-6 h-6 fill-current" />
                            100%
                        </div>
                        <div class="text-sm text-muted-foreground">Inclusivo</div>
                    </div>
                    <div class="text-center lg:text-left">
                        <div class="text-3xl font-bold text-green flex items-center justify-center lg:justify-start gap-2">
                            <Star class="w-6 h-6 fill-current" />
                            Lúdico
                        </div>
                        <div class="text-sm text-muted-foreground">Gamificado</div>
                    </div>
                    <div class="text-center lg:text-left">
                        <div class="text-3xl font-bold text-orange flex items-center justify-center lg:justify-start gap-2">
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
                <div class="absolute -top-4 -right-4 bg-orange text-accent-foreground px-4 py-2 rounded-2xl shadow-medium animate-bounce font-bold text-lg">
                    1 + 1 = 2
                </div>
                <div class="absolute -bottom-4 -left-4 bg-green text-green-foreground px-4 py-2 rounded-2xl shadow-medium animate-bounce delay-500 font-bold text-lg">
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