import React, { useState } from 'react';

import loginImage from './assets/kids-img-login.jpg';

// Componente para o logo "Matemágica"
const LogoIcon = () => (
  <svg className="h-8 w-auto text-purple-700" viewBox="0 0 200 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.63,32.63c-2.4,1.8-5.33,2.83-8.8,2.83-8.8,0-13.8-5.4-13.8-12.9,0-7.5,5-12.9,13.8-12.9,3.47,0,6.4,1.03,8.8,2.83l-2.5,3.8c-1.8-1.2-3.9-2-6.3-2-5.4,0-8.8,3.9-8.8,9.1s3.4,9.1,8.8,9.1c2.4,0,4.5-0.8,6.3-2Z"/>
    <text x="35" y="35" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="bold" fill="#581c87">Matemágica</text>
    <path fill="#a855f7" d="M30.3,5.8c-1.8-1.8-4.2-2.8-6.8-2.8-5.2,0-9.4,4.2-9.4,9.4s4.2,9.4,9.4,9.4c2.6,0,5-1,6.8-2.8l-2.5-2.5c-1.2,1.2-2.8,1.8-4.3,1.8-3.3,0-6-2.7-6-6s2.7-6,6-6c1.5,0,3.1,0.6,4.3,1.8Z" transform="translate(-10, -2) scale(0.8)"/>
  </svg>
);


// Componente principal da Página de Login
export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailOrUsername || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setError('');
    console.log('Tentativa de login com:', { login: emailOrUsername, password });
    
    // TODO: Implementar a chamada à API aqui
    // Ex: axios.post('/api/gateway/auth/login', { login: emailOrUsername, password })
    //     .then(response => { /* salvar token e redirecionar */ })
    //     .catch(err => { setError('Email/usuário ou senha inválidos.'); });
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 font-sans">
      
      {/* Coluna da Imagem (visível em telas grandes) */}
      <div className="hidden lg:block relative">
        <img
          src="./assets/kids-img-login.jpg"
          alt="Crianças estudando felizes"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      
      {/* Coluna do Formulário */}
      <div className="flex items-center justify-center bg-[#EFEBE6] p-6 sm:p-12">
        <div className="w-full max-w-sm space-y-8">
          
          {/* Cabeçalho com Logo */}
          <div className="flex flex-col items-center text-center">
            <LogoIcon />
            <h1 className="text-4xl font-bold text-gray-800 mt-6">
              Bem vindo(a)!
            </h1>
          </div>
          
          {/* Formulário de Login */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <input
                id="emailOrUsername"
                name="emailOrUsername"
                type="text"
                autoComplete="email"
                required
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Email ou Usuário"
                className="w-full appearance-none rounded-lg border-0 bg-[#E1D9D0] px-4 py-3 text-gray-900 placeholder-gray-500 ring-1 ring-inset ring-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full appearance-none rounded-lg border-0 bg-[#E1D9D0] px-4 py-3 text-gray-900 placeholder-gray-500 ring-1 ring-inset ring-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-[#4A5568] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2D3748] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors"
              >
                Entrar
              </button>
            </div>
          </form>

          {/* Link para Registro */}
          <p className="text-center text-sm text-gray-600">
            ou{' '}
            <a href="#" className="font-semibold text-purple-700 hover:text-purple-500">
              Registre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

