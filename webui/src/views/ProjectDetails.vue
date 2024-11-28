<template>
    <div class="project-details" v-if="project">
      <div class="header">
        <h1>{{ project.name }}</h1>
        <div class="project-status">
          <div class="progress-bar">
            <div :style="{ width: `${progress}%` }" class="progress-fill"></div>
          </div>
          <span>{{ progress }}% complété</span>
        </div>
      </div>
  
      <div class="project-info">
        <div class="info-section">
          <h3>Détails</h3>
          <p>{{ project.description }}</p>
          <p><strong>Responsable:</strong> {{ project.manager }}</p>
          <p><strong>Date de début:</strong> {{ formatDate(project.startDate) }}</p>
          <p><strong>Date de fin:</strong> {{ formatDate(project.endDate) }}</p>
        </div>
  
        <div class="tasks-section">
          <div class="tasks-header">
            <h3>Tâches</h3>
            <button @click="showNewTaskForm = true">Ajouter une tâche</button>
          </div>
  
          <TaskForm 
            v-if="showNewTaskForm" 
            @add-task="addTask"
            @cancel="showNewTaskForm = false"
          />
  
          <TaskList 
            :tasks="project.tasks"
            @update-task="updateTask"
            @delete-task="deleteTask"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import TaskForm from '@/components/TaskForm.vue'
  import TaskList from '@/components/TaskList.vue'
  
  const route = useRoute()
  const project = ref(null)
  const showNewTaskForm = ref(false)
  
  const progress = computed(() => {
    if (!project.value?.tasks.length) return 0
    const total = project.value.tasks.reduce((acc, task) => acc + task.percentage, 0)
    return Math.round(total / project.value.tasks.length)
  })
  
  const formatDate = (date) => new Date(date).toLocaleDateString()
  
  const addTask = (newTask) => {
    project.value.tasks.push({
      ...newTask,
      id: Date.now(),
      status: 'A faire',
      percentage: 0
    })
    showNewTaskForm.value = false
  }
  
  const updateTask = (taskId, updates) => {
    const taskIndex = project.value.tasks.findIndex(t => t.id === taskId)
    if (taskIndex !== -1) {
      project.value.tasks[taskIndex] = { ...project.value.tasks[taskIndex], ...updates }
    }
  }
  
  const deleteTask = (taskId) => {
    project.value.tasks = project.value.tasks.filter(t => t.id !== taskId)
  }
  
  onMounted(async () => {
    // Simuler le chargement des données du projet
    project.value = {
      id: route.params.id,
      name: 'Projet Example',
      description: 'Description détaillée du projet...',
      manager: 'John Doe',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      tasks: []
    }
  })
  </script>
  
  <style scoped>
  .project-details {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .header {
    margin-bottom: 30px;
  }
  
  .project-status {
    margin-top: 20px;
  }
  
  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #42b983;
    transition: width 0.3s ease;
  }
  
  .project-info {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 30px;
  }
  
  .info-section, .tasks-section {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
  }
  
  .tasks-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  </style>