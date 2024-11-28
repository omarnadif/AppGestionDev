<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['add-project']);

const projectName = ref('');
const description = ref('');
const startDate = ref('');
const endDate = ref('');
const manager = ref('');

const submitProject = () => {
  if (projectName.value.trim()) {
    emit('add-project', {
      name: projectName.value,
      description: description.value,
      manager: manager.value,
      startDate: startDate.value,
      endDate: endDate.value,
      tasks: []
    });
    projectName.value = '';
    description.value = '';
    startDate.value = '';
    endDate.value = '';
    manager.value = '';
  }
};

// Simulation d'une liste d'utilisateurs pour le responsable
const users = [
  { id: 'user1', name: 'Alice' },
  { id: 'user2', name: 'Bob' },
  { id: 'user3', name: 'Charlie' }
];
</script>

<template>
  <form @submit.prevent="submitProject" class="project-form">
    <h2>Nouveau Projet</h2>
    <div class="form-group">
      <label for="projectName">Nom du projet</label>
      <input
        id="projectName"
        v-model="projectName"
        type="text"
        required
        placeholder="Nom du projet"
      >
    </div>
    
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="description"
        placeholder="Description du projet"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="manager">Responsable</label>
      <select
        id="manager"
        v-model="manager"
        required
      >
        <option value="">Sélectionner un responsable</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="startDate">Date de début</label>
      <input
        id="startDate"
        v-model="startDate"
        type="date"
        required
      >
    </div>

    <div class="form-group">
      <label for="endDate">Date de fin</label>
      <input
        id="endDate"
        v-model="endDate"
        type="date"
        required
      >
    </div>
    
    <button type="submit">Créer le projet</button>
  </form>
</template>

<style scoped>
.project-form {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}
</style>