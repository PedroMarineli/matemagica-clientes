<script setup lang="ts">
</script>

<template>
    <footer className="bg-background/50 border-t border-border py-12">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
            <!-- Brand -->
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                <div className="bg-gradient-primary rounded-2xl p-2 shadow-medium">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-lilac">Matemágica</span>
                </div>
                <p className="text-sm text-muted-foreground">
                Transformando o ensino de matemática através da inclusão e gamificação
                </p>
            </div>

            <!-- Links -->
            <div>
                <h4 className="font-bold mb-4">Produto</h4>
                <ul className="space-y-2">
                <li>
                    <Link to="#features" className="text-muted-foreground hover:text-lilac transition-smooth">
                    Recursos
                    </Link>
                </li>
                <li>
                    <Link to="#benefits" className="text-muted-foreground hover:text-lilac transition-smooth">
                    Benefícios
                    </Link>
                </li>
                <li>
                    <Link to="/cadastro" className="text-muted-foreground hover:text-lilac transition-smooth">
                    Começar
                    </Link>
                </li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold mb-4">Suporte</h4>
                <ul className="space-y-2">
                <li>
                    <Link to="/ajuda" className="text-muted-foreground hover:text-lilac transition-smooth">
                    Central de Ajuda
                    </Link>
                </li>
                <li>
                    <Link to="/contato" className="text-muted-foreground hover:text-lilac transition-smooth">
                    Contato
                    </Link>
                </li>
                <li>
                    <Link to="/documentacao" className="text-muted-foreground hover:text-lilac transition-smooth">
                    Documentação
                    </Link>
                </li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2">
                <li>
                    <Link to="/privacidade" className="text-muted-foreground hover:text-lilac transition-smooth">
                    Privacidade
                    </Link>
                </li>
                <li>
                    <Link to="/termos" className="text-muted-foreground hover:text-lilac transition-smooth">
                    Termos de Uso
                    </Link>
                </li>
                </ul>
            </div>
            </div>

            <!-- Bottom -->
            <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
                Feito com <Heart className="w-4 h-4 text-destructive fill-current" /> para educação inclusiva
            </p>
            <div className="flex items-center gap-4">
                <a href="mailto:contato@matemagica.com" className="text-muted-foreground hover:text-lilac transition-smooth">
                <Mail className="w-5 h-5" />
                </a>
            </div>
            </div>
        </div>
    </footer>
</template>