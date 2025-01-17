<template>
    <div class="flex justify-between items-center mb-6">
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
  
    <div v-if="showNewTaskForm" class="mb-6">
      <TaskForm
        :users="users"
        @add-task="addTask"
        @cancel="showNewTaskForm = false"
      />
    </div>
  
    <div v-if="tasks.length === 0" class="text-center text-slate-400 py-8">
      Aucune tâche pour ce projet
    </div>
    <div v-else class="space-y-4">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :users="users"
        :projects="projects"
        @task-updated="fetchTasks"
        @delete-task="deleteTask"
        @update-status="(status) => updateTask(task.id, { status })"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import TaskForm from '@/components/tasks/TaskForm.vue'
  import TaskItem from '@/components/tasks/TaskItem.vue'
  
  const route = useRoute()
  const tasks = ref([])
  const users = ref([])
  const projects = ref([])
  const showNewTaskForm = ref(false)
  
  // Charger les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des utilisateurs')
      }
      users.value = await response.json()
    } catch (e) {
      console.error('Erreur lors du chargement des utilisateurs:', e)
    }
  }
  
  // Charger les projets
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/project')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des projets')
      }
      projects.value = await response.json()
    } catch (e) {
      console.error('Erreur lors du chargement des projets:', e)
    }
  }
  
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/project/${route.params.id}/tasks`)
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des tâches')
      }
      tasks.value = await response.json()
    } catch (e) {
      console.error(e)
    }
  }
  
  onMounted(async () => {
    await Promise.all([fetchUsers(), fetchProjects(), fetchTasks()])
  })
  
  // Ajouter une nouvelle tâche
  const addTask = async (newTask) => {
    try {
      const response = await fetch(`http://localhost:5000/api/project/${route.params.id}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTask.title,
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
  
      await fetchTasks()
      showNewTaskForm.value = false
    } catch (e) {
      console.error(e)
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
      console.error(e)
    }
  }
  
  // Supprimer une tâche
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE'
      })
  
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la tâche')
      }
  
      await fetchTasks()
    } catch (e) {
      console.error(e)
    }
  }
  </script>