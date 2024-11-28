<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <div id="app">
    <header>
      <nav class="nav-bar">
        <RouterLink to="/" class="nav-link">Accueil</RouterLink>
        <RouterLink to="/projects" class="nav-link">Projets</RouterLink>
        <RouterLink to="/tasks" class="nav-link">Tâches</RouterLink>
        <RouterLink to="/profile" class="nav-link">Profil</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-bar {
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.router-link-active {
  background-color: #34495e;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Styles globaux */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}

/* Classes utilitaires */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.grid {
  display: grid;
  gap: 1rem;
}

.flex {
  display: flex;
  gap: 1rem;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

/* Animation de transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>