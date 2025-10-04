<script setup lang="ts">
import Benefits from '../components/inicial/Benefits.vue';
import Features from '../components/inicial/Features.vue';
import Footer from '../components/inicial/Footer.vue';
import Hero from '../components/inicial/Hero.vue';
import Navbar from '../components/inicial/Navbar.vue';
</script>

<template>
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Footer />
    </div>
</template>