// views/Tasks.vue
<template>
  <div class="tasks-view">
    <h1>Toutes les Tâches</h1>

    <div class="filters">
      <div class="filter-group">
        <label>Projet:</label>
        <select v-model="projectFilter">
          <option value="all">Tous les projets</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.name }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Statut:</label>
        <select v-model="statusFilter">
          <option value="all">Tous les statuts</option>
          <option value="A faire">A faire</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Assigné à:</label>
        <select v-model="assigneeFilter">
          <option value="all">Tous</option>
          <option value="me">Mes tâches</option>
        </select>
      </div>
    </div>

    <div class="tasks-list">
      <div v-for="task in filteredTasks" :key="task.id" class="task-card">
        <div class="task-header">
          <h3>{{ task.title }}</h3>
          <span class="project-tag">{{ getProjectName(task.projectId) }}</span>
        </div>
        <p>{{ task.description }}</p>
        <div class="task-meta">
          <span>Assigné à: {{ task.assignedTo }}</span>
          <span>Statut: {{ task.status }}</span>
          <div class="progress-bar">
            <div :style="{ width: `${task.percentage}%` }" class="progress-fill"></div>
          </div>
        </div>
      </div>
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