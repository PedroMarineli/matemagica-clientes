<script setup lang="ts">
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '../userStore';

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
    const response = await axios.post('http://localhost:3000/users/login', login)
    if(response) {
      const userData = response.data
      userStore.setUserData(userData)
      if(userType.userType == 'aluno') router.push({ name: 'student' })
      else router.push({ name: 'teacher' })
    }
  } catch(error) {
    console.log('Tentativa de login com falha', error)
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
                  <Mail class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
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
                  <Lock class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
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

              <div class="flex items-center justify-between text-sm">
                <label @click="() => router.push('/recuperar-senha')" class="text-lilac hover:underline font-medium">
                  Esqueceu a senha?
                </label>
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
          
          <!-- Cabeçalho com Logo
          <div class="flex flex-col items-center text-center">
            <img src="../../public/logo.svg" alt="logo"class='absolute lg:top-0 lg:right-0 w-3xs bottom-0'/>
            <h1 class="text-4xl font-bold text-gray-800 mt-6">
              Bem vindo(a)!
            </h1>
          </div>
          
          Formulário de Login
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-4">
              <input
                id="emailOrUsername"
                name="emailOrUsername"
                type="text"
                autoComplete="email"
                required
                v-model="form.emailOrUsername"
                placeholder="Email ou Usuário"
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
                Entrar
              </button>
            </div>
          </form>

          Link para Registro
          <p class="text-center text-sm text-gray-600">
            ou
            <a href="#" @click="() => router.push({ name: 'register' })" class="font-semibold text-cor-2 hover:text-cor-3">
              Registre-se
            </a>
          </p> -->
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