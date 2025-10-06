<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
      <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
            <RouterLink to="/" class="flex items-center gap-2 transition-smooth hover:scale-105">
                <div class="bg-gradient-primary rounded-2xl p-2 shadow-medium">
                <Sparkles class="w-6 h-6 text-white" />
                </div>
                <span class="text-2xl font-bold text-lilac">Matemágica</span>
            </RouterLink>

            <div class="hidden md:flex items-center gap-6">
                <RouterLink to="#features" class="text-foreground hover:text-primary transition-smooth font-medium">
                    Recursos
                </RouterLink>
                <RouterLink to="#benefits" class="text-foreground hover:text-primary transition-smooth font-medium">
                    Benefícios
                </RouterLink>
                <RouterLink to="#about" class="text-foreground hover:text-primary transition-smooth font-medium">
                    Sobre
                </RouterLink>
            </div>

            <div class="flex items-center gap-3">
                <!-- <Button variant="ghost" asChild @click="() => router.push( 'login' )> -->
                <button @click="() => router.push('login')">
                    Entrar
                </button>
                <!-- <Button variant="playful" asChild @click="() => router.push( 'register' )> -->
                <button @click="() => router.push('cadastre-se')">
                    Começar Grátis
                </button>
            </div>
        </div>
      </div>
    </nav>
</template>