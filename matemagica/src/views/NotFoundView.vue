<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="mb-4 text-xl text-gray-600">Oops! Página não encontrada</p>
            <button @click="router.go(-1)" className="text-blue-500 underline hover:text-blue-700">
                Retornar
            </button>
        </div>
    </div>
</template>