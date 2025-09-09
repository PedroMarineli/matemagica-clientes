import React, { useState } from 'react';

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
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 font-sans">
      
      {/* Coluna da Imagem (visível em telas grandes) */}
      <div className="hidden lg:block relative">
        <img
          src="/kids-img-login.jpg"
          alt="Crianças estudando felizes"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      
      {/* Coluna do Formulário */}
      <div className="flex items-center justify-center bg-[#EFEBE6] p-6 sm:p-12">
        <div className="w-full max-w-sm space-y-8">
          
          {/* Cabeçalho com Logo */}
          <div className="flex flex-col items-center text-center">
            <img src="/logo.svg" alt="logo"className='absolute top-0 right-0 w-3xs'/>
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

