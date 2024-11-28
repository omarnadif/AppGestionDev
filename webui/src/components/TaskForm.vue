<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['add-task']);

const title = ref('');
const description = ref('');
const assignedTo = ref('');
const projectId = ref('');
const startDate = ref('');
const endDate = ref('');

const submitTask = () => {
  if (title.value.trim() && projectId.value) {
    emit('add-task', {
      title: title.value,
      description: description.value,
      assignedTo: assignedTo.value,
      projectId: projectId.value,
      startDate: startDate.value,
      endDate: endDate.value,
      status: 'A faire',
      percentage: 0,
    });
    title.value = '';
    description.value = '';
    assignedTo.value = '';
    projectId.value = '';
    startDate.value = '';
    endDate.value = '';
  }
};

// Simulation d'une liste d'utilisateurs
const users = [
  { id: 'user1', name: 'Alice' },
  { id: 'user2', name: 'Bob' },
  { id: 'user3', name: 'Charlie' }
];
</script>

<template>
  <form @submit.prevent="submitTask" class="task-form">
    <h2>Nouvelle Tâche</h2>
    
    <div class="form-group">
      <label for="project">Projet</label>
      <select
        id="project"
        v-model="projectId"
        required
      >
        <option value="">Sélectionner un projet</option>
        <option v-for="project in props.projects" :key="project.id" :value="project.id">
          {{ project.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="title">Titre</label>
      <input
        id="title"
        v-model="title"
        type="text"
        required
        placeholder="Titre de la tâche"
      >
    </div>
    
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="description"
        placeholder="Description de la tâche"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="assignedTo">Assignée à</label>
      <select
        id="assignedTo"
        v-model="assignedTo"
        required
      >
        <option value="">Sélectionner un utilisateur</option>
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
    
    <button type="submit">Ajouter la tâche</button>
  </form>
</template>