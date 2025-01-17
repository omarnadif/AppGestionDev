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
      <!-- Project Header -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-8 shadow-xl">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 class="text-3xl font-bold text-white">{{ project.name }}</h1>
          <div class="flex items-center gap-2">
            <span class="text-slate-400">{{ progress }}% complété</span>
            <div class="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                :style="{ width: `${progress}%` }" 
                class="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Project Details -->
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl">
          <h2 class="text-xl font-semibold text-white mb-6">Détails du projet</h2>
          <div class="space-y-4">
            <div class="text-slate-400">{{ project.description }}</div>
            <div class="border-t border-slate-700 pt-4">
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="text-sm text-slate-500">Responsable</label>
                  <p class="text-white">{{ project.responsible_id }}</p>
                </div>
                <div>
                  <label class="text-sm text-slate-500">Date de début</label>
                  <p class="text-white">{{ formatDate(project.start_date) }}</p>
                </div>
                <div>
                  <label class="text-sm text-slate-500">Date de fin</label>
                  <p class="text-white">{{ formatDate(project.end_date) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tasks Section -->
        <div class="lg:col-span-2">
          <!-- Tasks Header -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-6 shadow-xl">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold text-white">Tâches</h2>
              <button
                @click="showNewTaskForm = true"
                class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium
                  hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 flex items-center gap-2"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nouvelle tâche
              </button>
            </div>
          </div>

          <!-- New Task Form -->
          <div v-if="showNewTaskForm" class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-6 shadow-xl">
            <TaskForm 
              @add-task="addTask"
              @cancel="showNewTaskForm = false"
            />
          </div>

          <!-- Tasks List -->
          <div v-if="tasks.length === 0" class="text-center text-slate-400 py-8">
            Aucune tâche pour ce projet
          </div>
          <div v-else class="space-y-4">
            <div v-for="task in tasks" :key="task.id" 
              class="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 p-4 shadow-lg">
              <TaskItem 
                :task="task"
                @update="updateTask"
                @delete="deleteTask"
              />
            </div>
          </div>
        </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskItem from '@/components/tasks/TaskItem.vue'

const route = useRoute()
const project = ref(null)
const tasks = ref([])
const showNewTaskForm = ref(false)
const loading = ref(true)
const error = ref(null)

// Calculer le pourcentage global de progression
const progress = computed(() => {
  if (!tasks.value?.length) return 0
  const total = tasks.value.reduce((acc, task) => {
    return acc + (task.percentage || 0)
  }, 0)
  return Math.round(total / tasks.value.length)
})

// Formater les dates
const formatDate = (date) => {
  if (!date) return 'Non définie'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Charger les détails du projet
const fetchProject = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch(`http://localhost:5000/api/project/${route.params.id}`)
    if (!response.ok) {
      throw new Error('Erreur lors du chargement du projet')
    }
    project.value = await response.json()
    await fetchTasks()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Charger les tâches du projet
const fetchTasks = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/project/${route.params.id}`)
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des tâches')
    }
    tasks.value = await response.json()
  } catch (e) {
    error.value = e.message
  }
}

// Ajouter une nouvelle tâche
const addTask = async (newTask) => {
  try {
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newTask.title,
        description: newTask.description,
        status: 'En attente',
        project_id: route.params.id,
        percentage: 0,
        start_date: newTask.startDate,
        end_date: newTask.endDate,
        assigned_to: newTask.assignedTo
      })
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la tâche')
    }

    await fetchTasks()
    showNewTaskForm.value = false
  } catch (e) {
    error.value = e.message
  }
}

// Mettre à jour une tâche
const updateTask = async (taskId, updates) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la tâche')
    }

    await fetchTasks()
  } catch (e) {
    error.value = e.message
  }
}

// Supprimer une tâche
const deleteTask = async (taskId) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) return

  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la tâche')
    }

    await fetchTasks()
  } catch (e) {
    error.value = e.message
  }
}

onMounted(fetchProject)
</script>