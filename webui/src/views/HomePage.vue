/ views/HomePage.vue (anciennement Home.vue)
<template>
  <div class="home-page">
    <h1>Bienvenue sur la Gestion de Projets</h1>
    <div class="dashboard">
      <div class="stats-card">
        <h3>Projets actifs</h3>
        <p>{{ activeProjects }}</p>
      </div>
      <div class="stats-card">
        <h3>Tâches en cours</h3>
        <p>{{ ongoingTasks }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeProjects = ref(5)
const ongoingTasks = ref(12)
</script>

