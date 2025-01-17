<template>
  <form @submit.prevent="submitProject" class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-white">Nouveau Projet</h2>
      <p class="text-slate-400 mt-2">Créez un nouveau projet et assignez-le à un responsable</p>
    </div>
 
    <!-- Error Message -->
    <div v-if="error" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ error }}
      </div>
    </div>
 
    <div class="space-y-6">
      <!-- Nom du projet -->
      <div class="space-y-2">
        <label for="projectName" class="block text-sm font-medium text-slate-400">
          Nom du projet
        </label>
        <input
          id="projectName"
          v-model="projectName"
          type="text"
          required
          placeholder="Entrez le nom du projet"
          :disabled="loading"
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
          placeholder="Décrivez votre projet"
          :disabled="loading"
          class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
            focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
            resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        ></textarea>
      </div>
 
      <!-- Responsable -->
      <div class="space-y-2">
        <label for="responsible" class="block text-sm font-medium text-slate-400">
          Responsable
        </label>
        <div class="relative">
          <select
            id="responsible"
            v-model="responsibleId"
            required
            :disabled="loading"
            class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
              focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
          >
            <option value="" disabled selected class="bg-slate-800">Sélectionner un responsable</option>
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
        <div v-if="loadingUsers" class="text-sm text-cyan-500 flex items-center gap-2">
          <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Chargement des utilisateurs...
        </div>
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
            :disabled="loading"
            :min="startDate"
            class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
              focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
        </div>
      </div>
 
      <!-- Form Actions -->
      <div class="flex items-center gap-4 pt-4">
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold
            hover:from-cyan-600 hover:to-cyan-700 focus:ring-4 focus:ring-cyan-500/30 focus:outline-none
            transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          {{ loading ? 'Création en cours...' : 'Créer le projet' }}
        </button>
        <button
          type="button"
          @click="$emit('cancel')"
          :disabled="loading"
          class="px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold
            hover:bg-slate-600 focus:ring-4 focus:ring-slate-500/30 focus:outline-none
            transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Annuler
        </button>
      </div>
    </div>
  </form>
 </template>
 
 <script setup>
 import { ref, onMounted, defineEmits } from 'vue';
 
 const emit = defineEmits(['add-project', 'cancel']);
 
 const projectName = ref('');
 const description = ref('');
 const startDate = ref('');
 const endDate = ref('');
 const responsibleId = ref('');
 const users = ref([]);
 const loading = ref(false);
 const loadingUsers = ref(false);
 const error = ref(null);
 
 // Charger la liste des utilisateurs
 const fetchUsers = async () => {
  try {
    loadingUsers.value = true;
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
 
 const submitProject = async () => {
  if (!projectName.value.trim()) {
    error.value = "Le nom du projet est requis";
    return;
  }
 
  if (!validateDates()) {
    return;
  }
 
  try {
    loading.value = true;
    error.value = null;
 
    const projectData = {
      name: projectName.value,
      description: description.value,
      responsible_id: parseInt(responsibleId.value),
      start_date: new Date(startDate.value).toISOString(),
      end_date: new Date(endDate.value).toISOString()
    };
 
    const response = await fetch('http://localhost:5000/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    });
 
    if (!response.ok) {
      throw new Error('Erreur lors de la création du projet');
    }
 
    const newProject = await response.json();
    emit('add-project', newProject);
    resetForm();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
 };
 
 const resetForm = () => {
  projectName.value = '';
  description.value = '';
  startDate.value = '';
  endDate.value = '';
  responsibleId.value = '';
  error.value = null;
 };
 
 onMounted(fetchUsers);
 </script>