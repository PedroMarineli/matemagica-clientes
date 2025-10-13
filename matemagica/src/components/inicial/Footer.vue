<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <footer class="bg-background/50 border-t border-gray-300 py-12">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
            <!-- Brand -->
            <div class="space-y-4">
                <div class="flex items-center gap-2">
                    <img src="../../../public/logo.svg" alt="logo" class='lg:top-0 lg:right-0 lg:left-0 w-3xs bottom-0'/>
                </div>
                <p class="text-sm text-muted-foreground">
                    Transformando o ensino de matemática através da inclusão e gamificação
                </p>
            </div>

            <!-- Links -->
            <div>
                <h4 class="font-bold mb-4">Produto</h4>
                <ul class="space-y-2">
                <li>
                    <RouterLink to="#features" class="text-muted-foreground hover:text-lilac transition-smooth">
                    Recursos
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="#benefits" class="text-muted-foreground hover:text-lilac transition-smooth">
                    Benefícios
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/cadastro" class="text-muted-foreground hover:text-lilac transition-smooth">
                    Começar
                    </RouterLink>
                </li>
                </ul>
            </div>

            <div>
                <h4 class="font-bold mb-4">Suporte</h4>
                <ul class="space-y-2">
                <li>
                    <RouterLink to="/ajuda" class="text-muted-foreground hover:text-lilac transition-smooth">
                    Central de Ajuda
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/contato" class="text-muted-foreground hover:text-lilac transition-smooth">
                    Contato
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/documentacao" class="text-muted-foreground hover:text-lilac transition-smooth">
                    Documentação
                    </RouterLink>
                </li>
                </ul>
            </div>

            <div>
                <h4 class="font-bold mb-4">Legal</h4>
                <ul class="space-y-2">
                <li>
                    <RouterLink to="/privacidade" class="text-muted-foreground hover:text-lilac transition-smooth">
                    Privacidade
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/termos" class="text-muted-foreground hover:text-lilac transition-smooth">
                    Termos de Uso
                    </RouterLink>
                </li>
                </ul>
            </div>
            </div>

            <!-- Bottom -->
            <div class="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-sm text-muted-foreground flex items-center gap-1">
                Feito com <Heart class="w-4 h-4 text-destructive fill-current" /> para educação inclusiva
            </p>
            <div class="flex items-center gap-4">
                <a href="mailto:contato@matemagica.com" class="text-muted-foreground hover:text-lilac transition-smooth">
                <Mail class="w-5 h-5" />
                </a>
            </div>
            </div>
        </div>
    </footer>
</template>