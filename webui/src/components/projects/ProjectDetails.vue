<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-cyan-500 flex items-center gap-3">
        <svg class="animate-spin h-8 w-8" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <span class="text-lg font-medium">Chargement du projet...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen px-4">
      <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500 max-w-md w-full backdrop-blur-xl">
        <p class="text-center">{{ error }}</p>
      </div>
    </div>

    <!-- Project Content -->
<div v-else-if="project" class="container mx-auto px-4 py-8">
  <div class="flex flex-col space-y-8">
    <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl">
      <h2 class="text-xl font-semibold text-white mb-8">Détails du projet</h2>
      <div class="space-y-8">
        <!-- Nom et Description -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label class="text-sm text-slate-500 mb-2 block">Nom du projet</label>
            <p class="text-white text-lg">{{ project.name }}</p>
          </div>
          <div>
            <label class="text-sm text-slate-500 mb-2 block">Description</label>
            <p class="text-slate-400 text-lg">{{ project.description }}</p>
          </div>
        </div>

        <!-- Informations détaillées -->
        <div class="border-t border-slate-700 pt-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label class="text-sm text-slate-500 mb-2 block">Responsable</label>
              <p class="text-white">{{ getResponsibleName(project.responsible_id) }}</p>
            </div>
            <div>
              <label class="text-sm text-slate-500 mb-2 block">Date de début</label>
              <p class="text-white">{{ formatDate(project.start_date) }}</p>
            </div>
            <div>
              <label class="text-sm text-slate-500 mb-2 block">Date de fin</label>
              <p class="text-white">{{ formatDate(project.end_date) }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <label class="text-sm text-slate-500 mb-2 block">Créé le</label>
              <p class="text-white">{{ formatDateTime(project.created_at) }}</p>
            </div>
            <div>
              <label class="text-sm text-slate-500 mb-2 block">Dernière mise à jour</label>
              <p class="text-white">{{ formatDateTime(project.updated_at) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
        <!-- Tasks Section -->
        <TaskList :tasks="tasks" />
      </div>
    </div>

    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full -z-10" aria-hidden="true">
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TaskList from '@/components/tasks/TaskList.vue'

const route = useRoute()
const project = ref(null)
const tasks = ref([])
const users = ref([])
const loading = ref(true)
const error = ref(null)

// Formater les dates avec l'heure
const formatDateTime = (datetime) => {
  if (!datetime) return 'Non définie'
  return new Date(datetime).toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Formater les dates
const formatDate = (date) => {
  if (!date) return 'Non définie'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Fonction pour obtenir le nom du responsable
const getResponsibleName = (responsibleId) => {
  const user = users.value.find(u => u.id === responsibleId)
  return user ? `${user.firstname} ${user.lastname}` : 'Non défini'
}

// Charger la liste des utilisateurs
const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/user')
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des utilisateurs')
    }
    const data = await response.json()
    users.value = data
  } catch (e) {
    console.error('Erreur lors du chargement des utilisateurs:', e)
  }
}

// Charger les détails du projet
const fetchProject = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Charger d'abord les utilisateurs
    await fetchUsers()
    
    const response = await fetch(`http://localhost:5000/api/project/${route.params.id}`)
    if (!response.ok) {
      throw new Error(`Erreur lors du chargement du projet: ${response.status}`)
    }
    
    const data = await response.json()
    const foundProject = data.find(p => p.id === parseInt(route.params.id))
    
    if (!foundProject) {
      throw new Error('Projet non trouvé')
    }
    
    project.value = foundProject
    await fetchTasks()
  } catch (e) {
    console.error('Error in fetchProject:', e)
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Charger les tâches du projet
const fetchTasks = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/project/${route.params.id}/tasks`)
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des tâches')
    }
    const data = await response.json()
    tasks.value = data
  } catch (e) {
    console.error('Erreur lors du chargement des tâches:', e)
  }
}

onMounted(fetchProject)
</script>