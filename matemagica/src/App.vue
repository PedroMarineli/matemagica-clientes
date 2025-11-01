<script setup lang="ts">
import { RouterView } from 'vue-router';
import GlobalNotification from './components/globalNotification.vue';
</script>

<template>
  <GlobalNotification />
  <RouterView />
</template>
