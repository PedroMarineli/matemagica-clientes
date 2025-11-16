<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../userStore';
import { showNotification } from '../stores/notificationStore';
import type { IUserdata } from '../interfaces/IUsers';
import api from '../services/api';

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
  email: '',
  password: '',
  error: ''
})

type UserRole = 'professor' | 'aluno'
interface UserState {
    userType: UserRole
}

const userType = reactive<UserState>({
    userType: 'professor'
})

const handleLogin = async() => {
  const login = {
    username: form.email,
    password: form.password
  }

  try {
    const response = await api.post('http://localhost:3000/users/login', login)
    if(response) {
      const userData: IUserdata = response.data
      userStore.setUserData(userData)
      if (userData.user.type == 'student' && userType.userType == 'aluno') router.push({ name: 'student' })
      else if (userData.user.type == 'teacher' && userType.userType == 'professor') router.push({ name: 'teacher' })
      else showNotification('Você está tentando logar no campo errado!', 'bg-red-500')
    }
  } catch(error) {
    showNotification('Login ou senha incorretos! Tente novamente.', 'bg-red-500')
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

        <!-- Right side - Login form -->
        <section class="card rounded-4xl py-12">
          <div class="space-y-6">
            <!-- Logo -->
            <div class="flex justify-center">
              <div @click="() => router.push('/')" class="flex items-center gap-2 transition-smooth hover:scale-105 cursor-pointer">
                <img src="../../public/logo.svg" alt="logo"/>
              </div>
            </div>

            <!-- User type selector -->
            <div class="flex gap-2 bg-background rounded-2xl p-1">
              <button
                @click="userType.userType = ('professor')"
                class="flex-1 py-3 rounded-xl font-bold transition-smooth cursor-pointer"
                :class="[ userType.userType === 'professor'
                    ? 'bg-lilac text-lilac-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground' ]"
              >
                👩‍🏫 Professor
              </button>
              <button
                @click="userType.userType = ('aluno')"
                class="flex-1 py-3 rounded-xl font-bold transition-smooth cursor-pointer"
                :class="[ userType.userType === 'aluno'
                    ? 'bg-orange text-accent-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground' ]"
              >
                👧 Aluno
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleLogin" class="space-y-4">
              <div class="space-y-2">
                <label htmlFor="email" class="text-base">
                  {{ userType.userType === "professor" ? "E-mail" : "Usuário" }}
                </label>
                <div class="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    v-model="form.email"
                    :placeholder="userType.userType === 'professor' ? 'seu@email.com' : 'seu_usuario'"
                    class="input-register-login bg-background"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label htmlFor="password" class="text-base">Senha</label>
                <div class="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    v-model="form.password"
                    placeholder="••••••••"
                    class="input-register-login bg-background"
                  />
                </div>
              </div>

              <button 
                type="submit"
                class="w-full h-12 px-8 text-base bg-lilac text-white hover:scale-105 transition-bounce rounded-2xl shadow-medium hover:shadow-glow font-bold cursor-pointer"
                :class="[ userType.userType === 'aluno'
                  ? 'bg-orange text-black shadow-soft'
                  : 'bg-lilac text-white hover:text-foreground' ]"
              >
                Entrar
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

            <!-- Sign up link -->
            <div class="text-center">
              <span class="text-muted-foreground">Não tem uma conta? </span>
              <label @click="() => router.push('/cadastre-se')" class="text-lilac hover:underline font-bold">
                Cadastre-se grátis
              </label>
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