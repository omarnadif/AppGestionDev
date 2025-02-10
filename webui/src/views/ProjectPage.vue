<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
    <div class="container mx-auto px-4 py-8">
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-8 shadow-xl">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 class="text-3xl font-bold text-white">Projets</h1>
          <button
            @click="showNewProjectForm = true"
            class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold
              hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 flex items-center gap-2 group"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nouveau Projet
          </button>
        </div>
      </div>

      <div v-if="showNewProjectForm" class="mb-8">
        <ProjectForm 
          @add-project="addProject" 
          @cancel="showNewProjectForm = false"
          class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl" 
        />
      </div>

      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-cyan-500 flex items-center gap-3">
          <svg class="animate-spin h-8 w-8" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span class="text-lg font-medium">Chargement des projets...</span>
        </div>
      </div>

      <div v-else-if="error" class="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-500 backdrop-blur-xl">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="project in projects" :key="project.id" 
          class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl
            hover:border-cyan-500/50 transition-all duration-300 group">
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-cyan-500 transition-colors">
            {{ project.name }}
          </h3>
          <p class="text-slate-400 mb-4 line-clamp-2">{{ project.description }}</p>
          <div class="space-y-2 mb-6">
            <div class="flex items-center text-sm text-slate-500">
              <span>Début: {{ formatDate(project.start_date) }}</span>
            </div>
            <div class="flex items-center text-sm text-slate-500">
              <span>Fin: {{ formatDate(project.end_date) }}</span>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <router-link 
              :to="`/project/${project.id}`"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium
                hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 text-center"
            >
              Voir détails
            </router-link>
            <button 
              @click="deleteProject(project.id)"
              class="p-2 text-red-400 hover:text-red-300 transition-colors"
              title="Supprimer le projet"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProjectForm from '@/components/projects/ProjectForm.vue';
import { getTokenFromCookie } from '../utils/utils.js';


const formatDate = (date) => {
  if (!date) return "Date inconnue";
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const showNewProjectForm = ref(false);
const projects = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchProjects = async () => {
  try {
    loading.value = true;
    error.value = null;

    const token = getTokenFromCookie();
    console.log("Token récupéré :", token);
    if (!token) {
      throw new Error('Token introuvable. Veuillez vous connecter.');
    }

    console.log("Document Cookies :", document.cookie);


    const response = await fetch('http://localhost:5000/api/project/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include' // 🔥 Important pour envoyer les cookies
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des projets');
    }

    projects.value = await response.json();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProjects);
</script>
