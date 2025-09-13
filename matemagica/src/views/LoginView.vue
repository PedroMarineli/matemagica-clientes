<script setup lang="ts">
    import { reactive } from 'vue';

    const form = reactive({
        emailOrUsername: '',
        password: '',
        error: ''
    })

    const handleLogin = async() => {
        const login = {
            emailOrUsername: form.emailOrUsername,
            password: form.password
        }

        // try { EXEMPLO DO VUE FEITO
        //     const response = await axios.post('/api/jobs', newJob)
        //     toast.success('Job Added Successfully')
        //     router.push(`/jobs/${response.data.id}`)
        // } catch(error) {
        //     console.error('Error fetching job', error)
        //     toast.error('Job Was Not Added')
        // }

        // PEDRAO
        // e.preventDefault();
        // if (!emailOrUsername || !password) {
        // setError('Por favor, preencha todos os campos.');
        // return;
        // }
        // setError('');
        // console.log('Tentativa de login com:', { login: emailOrUsername, password });
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
      <div class="flex items-center justify-center bg-gray-300 p-6 sm:p-12">
        <div class="w-full max-w-sm space-y-8">
          
          <!-- Cabeçalho com Logo -->
          <div class="flex flex-col items-center text-center">
            <img src="../../public/logo.svg" alt="logo"class='absolute lg:top-0 lg:right-0 w-3xs bottom-0'/>
            <h1 class="text-4xl font-bold text-gray-800 mt-6 ">
              Bem vindo(a)!
            </h1>
          </div>
          
          <!-- Formulário de Login -->
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
            
            <!-- <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p> -->

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-lg bg-cor-1 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cor-2  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors"
              >
                Entrar
              </button>
            </div>
          </form>

          <!-- Link para Registro -->
          <p class="text-center text-sm text-gray-600">
            <!-- ou{' '} -->
            <a href="#" class="font-semibold text-cor-2 hover:text-cor-3">
              Registre-se
            </a>
          </p>
        </div>
      </div>
    </div>
</template>