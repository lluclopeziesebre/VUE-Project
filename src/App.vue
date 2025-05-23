<script setup>
// Aquí s'importen els components necessaris per a aquesta vista.
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow p-4">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Aquests són els estils globals que s'apliquen a tot el cos de la pàgina. */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}
</style>