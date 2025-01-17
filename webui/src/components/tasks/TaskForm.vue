<template>
  <form @submit.prevent="submitTask" class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-white">Nouvelle Tâche</h2>
      <p class="text-slate-400 mt-2">Créez une nouvelle tâche et assignez-la à un membre de l'équipe</p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
      {{ error }}
    </div>

    <div class="space-y-6">
      <!-- Projet -->
      <div class="space-y-2">
        <label for="project" class="block text-sm font-medium text-slate-400">
          Projet
        </label>
        <div class="relative">
          <select
            id="project"
            v-model="projectId"
            required
            :disabled="loading"
            class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
              focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
              appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="" disabled selected class="bg-slate-800">Sélectionner un projet</option>
            <option v-for="project in projects" :key="project.id" :value="project.id" class="bg-slate-800">
              {{ project.name }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Titre -->
      <div class="space-y-2">
        <label for="title" class="block text-sm font-medium text-slate-400">
          Titre
        </label>
        <input
          id="title"
          v-model="title"
          type="text"
          required
          :disabled="loading"
          placeholder="Titre de la tâche"
          class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
            focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <label for="description" class="block text-sm font-medium text-slate-400">
          Description
        </label>
        <textarea
          id="description"
          v-model="description"
          rows="4"
          :disabled="loading"
          placeholder="Description de la tâche"
          class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
            focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
            resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        ></textarea>
      </div>

      <!-- Assigné à -->
      <div class="space-y-2">
        <label for="assignedTo" class="block text-sm font-medium text-slate-400">
          Assigné à
        </label>
        <div class="relative">
          <select
            id="assignedTo"
            v-model="assignedTo"
            required
            :disabled="loading || loadingUsers"
            class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
              focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
              appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="" disabled selected class="bg-slate-800">Sélectionner un membre</option>
            <option v-for="user in users" :key="user.id" :value="user.id" class="bg-slate-800">
              {{ user.username }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div v-if="loadingUsers" class="text-sm text-cyan-500">Chargement des utilisateurs...</div>
      </div>

      <!-- Dates Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Date de début -->
        <div class="space-y-2">
          <label for="startDate" class="block text-sm font-medium text-slate-400">
            Date de début
          </label>
          <input
            id="startDate"
            v-model="startDate"
            type="date"
            required
            :disabled="loading"
            class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
              focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
        </div>

        <!-- Date de fin -->
        <div class="space-y-2">
          <label for="endDate" class="block text-sm font-medium text-slate-400">
            Date de fin
          </label>
          <input
            id="endDate"
            v-model="endDate"
            type="date"
            required
            :min="startDate"
            :disabled="loading"
            class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
              focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold
          hover:from-cyan-600 hover:to-cyan-700 focus:ring-4 focus:ring-cyan-500/30 focus:outline-none
          transition-all duration-200 flex items-center justify-center gap-2
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <span>{{ loading ? 'Création en cours...' : 'Ajouter la tâche' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const emit = defineEmits(['add-task']);

// Form fields
const title = ref('');
const description = ref('');
const assignedTo = ref('');
const projectId = ref('');
const startDate = ref('');
const endDate = ref('');

// UI states
const loading = ref(false);
const loadingUsers = ref(false);
const error = ref(null);
const users = ref([]);

// Charger la liste des utilisateurs
const fetchUsers = async () => {
  try {
    loadingUsers.value = true;
    error.value = null;
    const response = await fetch('http://localhost:5000/api/user');
    if (!response.ok) throw new Error('Erreur lors du chargement des utilisateurs');
    users.value = await response.json();
  } catch (e) {
    error.value = "Impossible de charger la liste des utilisateurs";
    console.error(e);
  } finally {
    loadingUsers.value = false;
  }
};

const validateDates = () => {
  if (!startDate.value || !endDate.value) {
    error.value = "Les dates sont requises";
    return false;
  }
  
  if (new Date(endDate.value) < new Date(startDate.value)) {
    error.value = "La date de fin doit être supérieure à la date de début";
    return false;
  }
  
  return true;
};

const submitTask = async () => {
  if (!title.value.trim()) {
    error.value = "Le titre est requis";
    return;
  }

  if (!validateDates()) {
    return;
  }

  try {
    loading.value = true;
    error.value = null;

    const taskData = {
      name: title.value,
      description: description.value,
      project_id: parseInt(projectId.value),
      assigned_to: parseInt(assignedTo.value),
      start_date: new Date(startDate.value).toISOString(),
      end_date: new Date(endDate.value).toISOString(),
      status: 'A faire',
      percentage: 0
    };

    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    if (!response.ok) throw new Error('Erreur lors de la création de la tâche');

    const newTask = await response.json();
    emit('add-task', newTask);
    resetForm();
  } catch (e) {
    error.value = e.message;
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  title.value = '';
  description.value = '';
  assignedTo.value = '';
  projectId.value = '';
  startDate.value = '';
  endDate.value = '';
  error.value = null;
};

onMounted(fetchUsers);
</script>