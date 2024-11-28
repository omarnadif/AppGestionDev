// views/Projects.vue
<template>
  <div class="projects-view">
    <div class="header">
      <h1>Projets</h1>
      <button @click="showNewProjectForm = true" class="new-project-btn">
        Nouveau Projet
      </button>
    </div>

    <div v-if="showNewProjectForm" class="project-form-container">
      <ProjectForm @add-project="addProject" />
    </div>

    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <div class="project-stats">
          <span>Tâches: {{ project.tasks.length }}</span>
          <span>Progression: {{ calculateProgress(project) }}%</span>
        </div>
        <div class="project-dates">
          <span>Début: {{ formatDate(project.startDate) }}</span>
          <span>Fin: {{ formatDate(project.endDate) }}</span>
        </div>
        <div class="project-actions">
          <router-link :to="`/projects/${project.id}`" class="view-btn">
            Voir détails
          </router-link>
          <button @click="deleteProject(project.id)" class="delete-btn">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectForm from '@/components/ProjectForm.vue'

const showNewProjectForm = ref(false)
const projects = ref([])

const calculateProgress = (project) => {
  if (!project.tasks.length) return 0
  const totalProgress = project.tasks.reduce((acc, task) => acc + (task.percentage || 0), 0)
  return Math.round(totalProgress / project.tasks.length)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const addProject = (project) => {
  projects.value.push({ ...project, id: Date.now(), tasks: [] })
  showNewProjectForm.value = false
}

const deleteProject = (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
    projects.value = projects.value.filter(p => p.id !== id)
  }
}
</script>