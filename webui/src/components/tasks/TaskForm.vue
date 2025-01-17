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
        :disabled="loading || loadingProjects"
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
    <div v-if="loadingProjects" class="text-sm text-cyan-500">Chargement des projets...</div>
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
  {{ user.firstname }} {{ user.lastname }}
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
        class="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold
          hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        {{ loading ? 'Création en cours...' : 'Ajouter la tâche' }}
      </button>
      <button
        type="button"
        @click="$emit('cancel')"
        :disabled="loading"
        class="px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600"
      >
        Annuler
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const emit = defineEmits(['add-task', 'cancel']);

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
const loadingProjects = ref(false);
const error = ref(null);
const users = ref([]);
const projects = ref([]); // Nouveau ref pour les projets

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

// Nouvelle fonction pour récupérer les projets
const fetchProjects = async () => {
  try {
    loadingProjects.value = true;
    error.value = null;
    const response = await fetch('http://localhost:5000/api/project');
    if (!response.ok) throw new Error('Erreur lors du chargement des projets');
    projects.value = await response.json();
  } catch (e) {
    error.value = "Impossible de charger la liste des projets";
    console.error(e);
  } finally {
    loadingProjects.value = false;
  }
};

const submitTask = async () => {
  if (!title.value.trim() || !projectId.value || !assignedTo.value) {
    error.value = "Tous les champs requis doivent être remplis";
    return;
  }

  if (!validateDates()) return;

  try {
    loading.value = true;
    error.value = null;

    const taskData = {
      name: title.value.trim(),
      description: description.value?.trim() || '',
      project_id: Number(projectId.value),
      assigned_to: Number(assignedTo.value),
      start_date: startDate.value,
      end_date: endDate.value,
      status: 'A faire',
      completion_percentage: 0 
    };

    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.log('Error response:', errorData);
      throw new Error(errorData || 'Erreur lors de la création de la tâche');
    }

    try {
      const result = await response.json();
      console.log('Created task:', result);
      emit('add-task', result.task);
      resetForm();
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      throw new Error('Erreur lors de la lecture de la réponse du serveur');
    }
  } catch (e) {
    error.value = e.message;
    console.error('Submit error:', e);
  } finally {
    loading.value = false;
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

const resetForm = () => {
  title.value = '';
  description.value = '';
  assignedTo.value = '';
  projectId.value = '';
  startDate.value = '';
  endDate.value = '';
  error.value = null;
};

// Chargement initial des données
onMounted(async () => {
  await Promise.all([fetchUsers(), fetchProjects()]);
});
</script>