<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const form = reactive({
  email: '',
  username: '',
  password: '',
  error: ''
})

const handleRegister = async() => {
  const login = {
    email: form.email,
    username: form.username,
    password: form.password
  }

  try {
    const response = await axios.post('http://localhost:3000/users/register', login)
    if(response) {
      router.push({ name: 'login' })
    }
  } catch(error) {
    console.log('Tentativa de registro com falha')
  }
};
</script>

<template>
    <div class="min-h-screen w-full lg:grid lg:grid-cols-2 font-family-title">
      
      <!-- Coluna da Imagem (visível em telas grandes) -->
      <div class="hidden lg:block relative">
        <img
          src="../../public/kids-img-login.jpg"
          alt="Crianças estudando felizes"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <!-- Coluna do Formulário -->
      <div class="flex items-center justify-center bg-light-brown p-6 sm:p-12">
        <div class="w-full max-w-sm space-y-8">
        
      <section class="p-8 shadow-glow border-2 bg-white">
          <div class="space-y-6">
            <!-- Logo -->
            <div class="flex justify-center">
              <div @click="() => router.push('/')" class="flex items-center gap-2 transition-smooth hover:scale-105">
                <div class="bg-gradient-primary rounded-2xl p-3 shadow-medium">
                  <Sparkles class="w-8 h-8 text-white" />
                </div>
                <span class="text-3xl font-bold text-gradient-primary">Matemágica</span>
              </div>
            </div>

            <div class="text-center space-y-2">
              <h1 class="text-2xl font-bold">Criar Conta de Professor</h1>
              <p class="text-muted-foreground">Preencha os dados para começar</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleRegister" class="space-y-4">
              <div class="space-y-2">
                <Label htmlFor="name" class="text-base">Nome Completo</Label>
                <div class="relative">
                  <User class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    class="pl-12 h-12 text-base rounded-xl"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <Label htmlFor="email" class="text-base">E-mail</Label>
                <div class="relative">
                  <Mail class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    class="pl-12 h-12 text-base rounded-xl"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <Label htmlFor="password" class="text-base">Senha</Label>
                <div class="relative">
                  <Lock class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    class="pl-12 h-12 text-base rounded-xl"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <Label htmlFor="confirm-password" class="text-base">Confirmar Senha</Label>
                <div class="relative">
                  <Lock class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Digite a senha novamente"
                    class="pl-12 h-12 text-base rounded-xl"
                  />
                </div>
              </div>

              <div class="flex items-start gap-2">
                <input type="checkbox" id="terms" class="mt-1 rounded" />
                <label htmlFor="terms" class="text-sm text-muted-foreground">
                  Eu concordo com os
                  <span to="/termos" class="text-primary hover:underline">
                    Termos de Uso
                  </span>
                  e
                  <span to="/privacidade" class="text-primary hover:underline">
                    Política de Privacidade
                  </span>
                </label>
              </div>

              <Button type="submit" variant="playful" size="lg" class="w-full">
                Criar Conta
              </Button>
            </form>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-border"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-card px-4 text-muted-foreground">ou</span>
              </div>
            </div>

            <!-- Login link -->
            <div class="text-center">
              <span class="text-muted-foreground">Já tem uma conta? </span>
              <span @click="() => router.push('/login')" class="text-primary hover:underline font-bold">
                Faça login
              </span>
            </div>
          </div>
        </section>
      </div>
      </div>
      
      <!-- Coluna do Formulário
      <div class="flex items-center justify-center bg-light-brown p-6 sm:p-12">
        <div class="w-full max-w-sm space-y-8">
          
          Cabeçalho com Logo
          <div class="flex flex-col items-center text-center">
            <img src="../../public/logo.svg" alt="logo"class='absolute lg:top-0 lg:right-0 w-3xs bottom-0'/>
            <h1 class="text-4xl font-bold text-gray-800 mt-6">
              Bem vindo(a)!
            </h1>
            <span>Professor(a), insira seus dados para cadastrar-se</span>
          </div>
          
          Formulário de Login
          <form @submit.prevent="handleRegister" class="space-y-6">
            <div class="space-y-4">
                <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    v-model="form.email"
                    placeholder="Email"
                    class="w-full appearance-none rounded-lg border-0 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm"
                />
                <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    v-model="form.username"
                    placeholder="Usuário"
                    class="w-full appearance-none rounded-lg border-0 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm"
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    v-model="form.password"
                    placeholder="Senha"
                    class="w-full appearance-none rounded-lg border-0 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm"
                />
            </div>
            
            <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-lg bg-gray-700 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cor-2  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors"
              >
                Cadastrar
              </button>
            </div>
          </form>

          Link para Registro
          <p class="text-center text-sm text-gray-600">
            ou
            <a href="#" @click="() => router.push({ name: 'login' })" class="font-semibold text-cor-2 hover:text-cor-3">
                Efetuar Login
            </a>
          </p>
        </div>
      </div> -->
    </div>
</template>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>