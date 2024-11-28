<template>
  <div class="projects-view">
    <div class="header">
      <h1>Projets</h1>
      <button @click="showNewProjectForm = true" class="new-project-btn">
        Nouveau Projet
      </button>
    </div>

    <div v-if="showNewProjectForm" class="project-form-container">
      <ProjectForm @add-project="addProject" @cancel="showNewProjectForm = false" />
    </div>

    <div v-if="loading" class="loading">
      Chargement des projets...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <h3>{{ project.Name }}</h3>
        <p>{{ project.Description }}</p>
        <div class="project-dates">
          <span>Début: {{ formatDate(project.Start_date) }}</span>
          <span>Fin: {{ formatDate(project.End_date) }}</span>
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
import { ref, onMounted } from 'vue'
import ProjectForm from '@/components/ProjectForm.vue'

const showNewProjectForm = ref(false)
const projects = ref([])
const loading = ref(true)
const error = ref(null)

// Fonction pour charger les projets depuis l'API
const fetchProjects = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch('http://localhost:5000/api/project')
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des projets')
    }
    projects.value = await response.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Fonction pour ajouter un nouveau projet
const addProject = async (project) => {
  try {
    const response = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: project.name,
        Description: project.description,
        Start_date: project.startDate,
        End_date: project.endDate,
        Responsible_id: project.responsibleId
      })
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la création du projet')
    }

    await fetchProjects() // Recharger la liste des projets
    showNewProjectForm.value = false
  } catch (e) {
    error.value = e.message
  }
}

// Fonction pour supprimer un projet
const deleteProject = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du projet')
      }

      await fetchProjects() // Recharger la liste des projets
    } catch (e) {
      error.value = e.message
    }
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Charger les projets au montage du composant
onMounted(fetchProjects)
</script>

<style scoped>
.projects-view {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.project-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.project-dates {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0;
  font-size: 0.9em;
  color: #666;
}

.project-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.view-btn {
  background-color: #42b983;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
}

.delete-btn {
  background-color: #ff5252;
}

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
</style>