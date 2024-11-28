<script setup>
import { ref } from 'vue';
import TaskList from './components/TaskList.vue';
import ProjectForm from './components/ProjectForm.vue';

const projects = ref([]);

const addProject = (newProject) => {
  projects.value.push({
    id: Date.now(),
    ...newProject
  });
};
</script>

<template>
  <div id="app">
    <h1>Gestionnaire de Projets et Tâches</h1>
    
    <ProjectForm @add-project="addProject" />
    <TaskList :projects="projects" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
</style>