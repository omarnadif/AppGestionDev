<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden py-8 px-4">
    <div class="container mx-auto max-w-7xl">
      <!-- Header Section -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-8 shadow-xl">
        <h1 class="text-3xl font-bold text-white">Toutes les Tâches</h1>
      </div>

      <!-- Filters Section -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-8 shadow-xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Project Filter -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-400">Projet</label>
            <select
              v-model="projectFilter"
              class="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white
                focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
            >
              <option value="all">Tous les projets</option>
              <option v-for="project in projects" :key="project.id" :value="project.id">
                {{ project.name }}
              </option>
            </select>
          </div>

          <!-- Status Filter -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-400">Statut</label>
            <select
              v-model="statusFilter"
              class="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white
                focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="A faire">À faire</option>
              <option value="En cours">En cours</option>
              <option value="Terminée">Terminée</option>
            </select>
          </div>

          <!-- Assignee Filter -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-400">Assigné à</label>
            <select
              v-model="assigneeFilter"
              class="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white
                focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
            >
              <option value="all">Tous</option>
              <option value="me">Mes tâches</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tasks Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="task in filteredTasks" 
          :key="task.id" 
          class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl
            hover:border-cyan-500/50 transition-all duration-300"
        >
          <!-- Task Header -->
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">{{ task.title }}</h3>
            <span class="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-sm font-medium">
              {{ getProjectName(task.projectId) }}
            </span>
          </div>

          <!-- Task Description -->
          <p class="text-slate-400 mb-6 line-clamp-2">{{ task.description }}</p>

          <!-- Task Meta -->
          <div class="space-y-4">
            <!-- Assigned To -->
            <div class="flex items-center text-sm text-slate-500">
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Assigné à: {{ task.assignedTo }}
            </div>

            <!-- Status -->
            <div class="flex items-center text-sm">
              <span 
                :class="{
                  'text-orange-500': task.status === 'A faire',
                  'text-cyan-500': task.status === 'En cours',
                  'text-green-500': task.status === 'Terminée'
                }"
                class="flex items-center"
              >
                <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <path v-if="task.status === 'Terminée'" d="M9 12l2 2 4-4" />
                </svg>
                {{ task.status }}
              </span>
            </div>

            <!-- Progress Bar -->
            <div class="relative pt-1">
              <div class="flex items-center justify-between text-xs mb-1">
                <span class="text-slate-500">Progression</span>
                <span class="text-slate-500">{{ task.percentage }}%</span>
              </div>
              <div class="overflow-hidden h-2 text-xs flex rounded-full bg-slate-700">
                <div
                  :style="{ width: `${task.percentage}%` }"
                  :class="{
                    'bg-orange-500': task.percentage < 30,
                    'bg-cyan-500': task.percentage >= 30 && task.percentage < 70,
                    'bg-green-500': task.percentage >= 70
                  }"
                  class="transition-all duration-500 ease-out"
                ></div>
              </div>
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
import { ref, computed } from 'vue'

const projectFilter = ref('all')
const statusFilter = ref('all')
const assigneeFilter = ref('all')

const tasks = ref([])
const projects = ref([])

const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const projectMatch = projectFilter.value === 'all' || task.projectId === projectFilter.value
    const statusMatch = statusFilter.value === 'all' || task.status === statusFilter.value
    const assigneeMatch = assigneeFilter.value === 'all' || 
      (assigneeFilter.value === 'me' && task.assignedTo === 'currentUserId')
    
    return projectMatch && statusMatch && assigneeMatch
  })
})

const getProjectName = (projectId) => {
  const project = projects.value.find(p => p.id === projectId)
  return project ? project.name : 'Projet inconnu'
}
</script>