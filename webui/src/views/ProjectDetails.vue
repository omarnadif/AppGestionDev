<template>
    <div v-if="loading" class="loading">
      Chargement du projet...
    </div>
  
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
  
    <div class="project-details" v-else-if="project">
      <div class="header">
        <h1>{{ project.Name }}</h1>
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
          <p>{{ project.Description }}</p>
          <p><strong>Responsable ID:</strong> {{ project.Responsible_id }}</p>
          <p><strong>Date de début:</strong> {{ formatDate(project.Start_date) }}</p>
          <p><strong>Date de fin:</strong> {{ formatDate(project.End_date) }}</p>
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
            :tasks="tasks"
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
  const tasks = ref([])
  const showNewTaskForm = ref(false)
  const loading = ref(true)
  const error = ref(null)
  
  const progress = computed(() => {
    if (!tasks.value?.length) return 0
    const total = tasks.value.reduce((acc, task) => acc + task.percentage, 0)
    return Math.round(total / tasks.value.length)
  })
  
  const formatDate = (date) => {
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
      
      const response = await fetch(`http://localhost:5000/api/projects/${route.params.id}`)
      if (!response.ok) {
        throw new Error('Erreur lors du chargement du projet')
      }
      
      project.value = await response.json()
      await fetchTasks() // Charger les tâches après avoir chargé le projet
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }
  
  // Charger les tâches du projet
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${route.params.id}/tasks`)
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
      const response = await fetch(`http://localhost:5000/api/projects/${route.params.id}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newTask.title,
          description: newTask.description,
          status: 'A faire',
          percentage: 0,
          start_date: newTask.startDate,
          end_date: newTask.endDate,
          assigned_to: newTask.assignedTo
        })
      })
  
      if (!response.ok) {
        throw new Error('Erreur lors de la création de la tâche')
      }
  
      await fetchTasks() // Recharger les tâches
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
  
      await fetchTasks() // Recharger les tâches
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
  
      await fetchTasks() // Recharger les tâches
    } catch (e) {
      error.value = e.message
    }
  }
  
  onMounted(fetchProject)
  </script>

  <style scoped>
    
  .loading {
    text-align: center;
    padding: 20px;
    color: #666;
  }
  
  .error {
    color: #ff5252;
    text-align: center;
    padding: 20px;
    background-color: #ffe6e6;
    border-radius: 4px;
    margin: 20px 0;
  }

  
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