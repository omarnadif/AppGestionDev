<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const emit = defineEmits(['add-project', 'cancel']);

const projectName = ref('');
const description = ref('');
const startDate = ref('');
const endDate = ref('');
const responsibleId = ref('');
const users = ref([]);
const loading = ref(false);
const error = ref(null);

// Charger la liste des utilisateurs
const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:5000/api/users');
    if (!response.ok) throw new Error('Erreur lors du chargement des utilisateurs');
    users.value = await response.json();
  } catch (e) {
    error.value = "Impossible de charger la liste des utilisateurs";
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const submitProject = async () => {
  if (projectName.value.trim()) {
    try {
      loading.value = true;
      error.value = null;

      const projectData = {
        Name: projectName.value,
        Description: description.value,
        Responsible_id: parseInt(responsibleId.value),
        Start_date: new Date(startDate.value).toISOString(),
        End_date: new Date(endDate.value).toISOString()
      };

      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du projet');
      }

      const newProject = await response.json();
      emit('add-project', newProject);
      resetForm();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }
};

const resetForm = () => {
  projectName.value = '';
  description.value = '';
  startDate.value = '';
  endDate.value = '';
  responsibleId.value = '';
};

onMounted(fetchUsers);
</script>

<template>
  <form @submit.prevent="submitProject" class="project-form">
    <h2>Nouveau Projet</h2>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div class="form-group">
      <label for="projectName">Nom du projet</label>
      <input
        id="projectName"
        v-model="projectName"
        type="text"
        required
        placeholder="Nom du projet"
        :disabled="loading"
      >
    </div>
    
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="description"
        placeholder="Description du projet"
        :disabled="loading"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="responsible">Responsable</label>
      <select
        id="responsible"
        v-model="responsibleId"
        required
        :disabled="loading"
      >
        <option value="">Sélectionner un responsable</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.firstname }} {{ user.lastname }}
        </option>
      </select>
      <div v-if="loading" class="loading-text">Chargement des utilisateurs...</div>
    </div>

    <div class="form-group">
      <label for="startDate">Date de début</label>
      <input
        id="startDate"
        v-model="startDate"
        type="date"
        required
        :disabled="loading"
      >
    </div>

    <div class="form-group">
      <label for="endDate">Date de fin</label>
      <input
        id="endDate"
        v-model="endDate"
        type="date"
        required
        :disabled="loading"
        :min="startDate"
      >
    </div>
    
    <div class="form-actions">
      <button type="submit" :disabled="loading">
        {{ loading ? 'Création en cours...' : 'Créer le projet' }}
      </button>
      <button type="button" @click="$emit('cancel')" :disabled="loading" class="cancel-btn">
        Annuler
      </button>
    </div>
  </form>
</template>

<style scoped>
.project-form {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.error-message {
  background-color: #ffe6e6;
  color: #ff5252;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.loading-text {
  color: #666;
  font-size: 0.9em;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  background-color: #6c757d;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

input:disabled, 
select:disabled, 
textarea:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}
</style>