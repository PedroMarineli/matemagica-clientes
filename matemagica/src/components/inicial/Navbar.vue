<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b shadow-soft">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between">
                <RouterLink to="/" class="flex items-center gap-2 transition-smooth hover:scale-105">
                    <img src="../../../public/logo.svg" alt="logo" class='lg:top-0 lg:right-0 lg:left-0 w-3xs bottom-0'/>
                </RouterLink>

                <div class="hidden md:flex items-center gap-6">
                    <RouterLink to="#features" class="hover:text-lilac transition-smooth font-medium">
                        Recursos
                    </RouterLink>
                    <RouterLink to="#benefits" class="hover:text-lilac transition-smooth font-medium">
                        Benefícios
                    </RouterLink>
                    <RouterLink to="#about" class="hover:text-lilac transition-smooth font-medium">
                        Sobre
                    </RouterLink>
                </div>

                <div class="flex items-center gap-3">
                    <!-- <Button variant="ghost" asChild @click="() => router.push( 'login' )> -->
                    <button @click="() => router.push('login')" class="cursor-pointer px-4 py-2 hover:bg-orange rounded-xl">
                        Entrar
                    </button>
                    <!-- <Button variant="playful" asChild @click="() => router.push( 'register' )> -->
                    <button @click="() => router.push('cadastre-se')" class="cursor-pointer bg-lilac text-white hover:scale-105 transition-bounce rounded-2xl shadow-medium font-bold px-4 py-2">
                        Começar Grátis
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>