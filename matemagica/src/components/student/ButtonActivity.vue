<script setup lang="ts">
const activity = { name: "Equações", route: "teacherDashboard" }
</script>

<template>
    <div class="w-1/5 h-40 p-3 rounded-2xl bg-amber-500 flex items-center text-center">
        <div class="w-1/2">imagem</div>
        <div class="w-1/2 grid">
            <span>{{ activity.name }}</span>
            <span>Progresso</span>
        </div>
    </div>
</template>