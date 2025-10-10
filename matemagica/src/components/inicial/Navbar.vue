<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 transition-smooth hover:scale-105">
                <div className="bg-gradient-primary rounded-2xl p-2 shadow-medium">
                <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-lilac">Matemágica</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
                <Link to="#features" className="text-foreground hover:text-lilac transition-smooth font-medium">
                    Recursos
                </Link>
                <Link to="#benefits" className="text-foreground hover:text-lilac transition-smooth font-medium">
                    Benefícios
                </Link>
                <Link to="#about" className="text-foreground hover:text-lilac transition-smooth font-medium">
                    Sobre
                </Link>
            </div>

            <div className="flex items-center gap-3">
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