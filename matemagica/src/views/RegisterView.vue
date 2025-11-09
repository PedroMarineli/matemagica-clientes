<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { showNotification } from '../stores/notificationStore';

const router = useRouter();

const form = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  error: ''
})

const confirmPassword = () => {
  if (form.password != form.confirmPassword) {
    showNotification('Campos de "Senha" e "Confirmar senha" possuem dados incongruentes!', 'bg-red-500')
  }
  else handleRegister()
}

const handleRegister = async() => {
  const login = {
    username: form.username,
    email: form.email,
    password: form.password
  }

  try {
    const response = await axios.post('http://localhost:3000/users/register/teacher', login)
    if(response) {
      router.push({ name: 'login' })
    }
  } catch(error) {
    console.log('Tentativa de registro com falha')
  }
}
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
      <div class="flex items-center justify-center p-6 sm:p-12">
        <div class="max-w-full md:max-w-lg lg:max-w-2xl md:space-y-8 lg:w-1/2">
          <section class="card rounded-4xl py-12">
            <div class="space-y-6">
              <!-- Logo -->
              <div class="flex justify-center">
                <div @click="() => router.push('/')" class="flex items-center gap-2 transition-smooth hover:scale-105">
                  <img src="../../public/logo.svg" alt="logo"/>
                </div>
              </div>

              <div class="text-center space-y-2">
                <h1 class="text-2xl font-bold">Criar Conta de Professor</h1>
                <p class="text-muted-foreground">Preencha os dados para começar</p>
              </div>

              <form @submit.prevent="confirmPassword" class="space-y-4">
                <div class="space-y-2">
                  <label htmlFor="name" class="text-base">Nome Completo</label>
                  <div class="relative">
                    <!-- <User class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" /> -->
                    <input
                      id="username"
                      type="text"
                      required
                      v-model="form.username"
                      placeholder="Usuário"
                      class="input-register-login bg-background"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label htmlFor="email" class="text-base">E-mail</label>
                  <div class="relative">
                    <!-- <Mail class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" /> -->
                    <input
                      id="email"
                      type="text"
                      required
                      v-model="form.email"
                      placeholder="seuEmail@email.com"
                      class="input-register-login bg-background"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label htmlFor="password" class="text-base">Senha</label>
                  <div class="relative">
                    <!-- <Lock class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" /> -->
                    <input
                      id="password"
                      type="password"
                      required
                      v-model="form.password"
                      placeholder="Senha"
                      class="input-register-login bg-background"
                    />
                  </div>
                </div>

                <div class="space-y-2 mb-10">
                  <label htmlFor="confirm-password" class="text-base">Confirmar Senha</label>
                  <div class="relative">
                    <!-- <Lock class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" /> -->
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      v-model="form.confirmPassword"
                      placeholder="Digite a senha novamente"
                      class="input-register-login bg-background"
                    />
                  </div>
                </div>

                <button type="submit" class="w-full h-12 px-8 text-base bg-lilac text-white hover:scale-105 transition-bounce rounded-2xl shadow-medium hover:shadow-glow font-bold cursor-pointer">
                  Criar Conta
                </button>
              </form>

              <!-- Divider -->
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="bg-white px-4 text-muted-foreground">ou</span>
                </div>
              </div>

              <!-- Login link -->
              <div class="text-center">
                <span class="text-muted-foreground">Já tem uma conta? </span>
                <span @click="() => router.push('/login')" class="text-lilac hover:underline font-bold">
                  Faça login
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
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