<template>
  <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl 
    hover:border-cyan-500/20 transition-all duration-300">
    <!-- Task Header -->
    <div class="flex items-start justify-between mb-6">
      <div class="flex-1">
        <div v-if="!isEditing">
          <h3 class="text-xl font-semibold text-white mb-2">{{ task.name }}</h3>
          <p :class="['line-clamp-2', task.description ? 'text-slate-400' : 'text-slate-500 italic']">
            {{ task.description || 'Aucune description' }}
          </p>
        </div>
        <div v-else class="space-y-4 w-full">
          <div>
            <label class="block text-sm text-slate-500 mb-1">Nom de la tâche</label>
            <input
              v-model="editedTask.name"
              type="text"
              class="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white
                focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
            >
          </div>
          <div>
            <label class="block text-sm text-slate-500 mb-1">Description</label>
            <textarea
              v-model="editedTask.description"
              rows="2"
              class="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white
                focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none resize-none"
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Status Badge -->
<div class="ml-4">
  <div v-if="!isEditing" 
    class="px-4 py-2 rounded-full text-sm font-medium"
    :class="{
      'bg-orange-500/10 text-orange-500': task.status === 'A faire',
      'bg-cyan-500/10 text-cyan-500': task.status === 'En cours',
      'bg-green-500/10 text-green-500': task.status === 'Terminée'
    }"
  >
    {{ task.status }}
  </div>
  <select
    v-else
    v-model="editedTask.status"
    class="appearance-none px-4 py-2 rounded-full text-sm font-medium 
      focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors duration-200
      disabled:opacity-50 disabled:cursor-not-allowed"
    :class="{
      'bg-orange-500/10 text-orange-500': editedTask.status === 'A faire',
      'bg-cyan-500/10 text-cyan-500': editedTask.status === 'En cours',
      'bg-green-500/10 text-green-500': editedTask.status === 'Terminée'
    }"
  >
    <option v-for="status in statusOptions" :key="status" :value="status" class="bg-slate-800">
      {{ status }}
    </option>
  </select>
</div>
   <!-- Task Details -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
  <!-- Left Column -->
  <div class="space-y-6 bg-slate-800/30 rounded-xl p-4">
    <div v-if="!isEditing">
      <span class="block text-sm text-slate-500 mb-2">Assigné à</span>
      <span class="text-white font-medium flex items-center gap-2">
        <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {{ getAssigneeName(task.assigned_to) }}
      </span>
    </div>
    <div v-else>
      <label class="block text-sm text-slate-500 mb-2">Assigné à</label>
      <select
        v-model="editedTask.assigned_to"
        class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white
          focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
      >
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.firstname }} {{ user.lastname }}
        </option>
      </select>
    </div>

    <div v-if="!isEditing">
      <span class="block text-sm text-slate-500 mb-2">Projet</span>
      <span class="text-white font-medium flex items-center gap-2">
        <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        {{ getProjectName(task.project_id) }}
      </span>
    </div>
    <div v-else>
      <label class="block text-sm text-slate-500 mb-2">Projet</label>
      <select
        v-model="editedTask.project_id"
        class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white
          focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
      >
        <option v-for="project in projects" :key="project.id" :value="project.id">
          {{ project.name }}
        </option>
      </select>
    </div>
  </div>
  
  <!-- Right Column -->
  <div class="space-y-6 bg-slate-800/30 rounded-xl p-4">
    <div v-if="!isEditing">
      <span class="block text-sm text-slate-500 mb-2">Date de début</span>
      <span class="text-white font-medium flex items-center gap-2">
        <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {{ formatDate(task.start_date) }}
      </span>
    </div>
    <div v-else>
      <label class="block text-sm text-slate-500 mb-2">Date de début</label>
      <input
        v-model="editedTask.start_date"
        type="date"
        class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white
          focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
      >
    </div>

    <div v-if="!isEditing">
      <span class="block text-sm text-slate-500 mb-2">Date de fin</span>
      <span class="text-white font-medium flex items-center gap-2">
        <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {{ formatDate(task.end_date) }}
      </span>
    </div>
    <div v-else>
      <label class="block text-sm text-slate-500 mb-2">Date de fin</label>
      <input
        v-model="editedTask.end_date"
        type="date"
        :min="editedTask.start_date"
        class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white
          focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none"
      >
    </div>
  </div>
</div>
    </div>

    <!-- Task Actions -->
    <div class="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-700">
      <!-- Edit/Save Buttons -->
      <template v-if="!isEditing">
        <button
          @click="startEditing"
          :disabled="loading"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-cyan-400 hover:text-cyan-300 
            hover:bg-cyan-500/10 transition-all duration-200 font-medium
            disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Modifier
        </button>
      </template>
      <template v-else>
        <button
          @click="saveChanges"
          :disabled="loading"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-green-400 hover:text-green-300 
            hover:bg-green-500/10 transition-all duration-200 font-medium
            disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
          Sauvegarder
        </button>
        <button
          @click="cancelEditing"
          :disabled="loading"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-slate-300 
            hover:bg-slate-500/10 transition-all duration-200 font-medium
            disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
          Annuler
        </button>
      </template>

      <!-- Delete Button -->
      <button
        v-if="!isEditing"
        @click="confirmDelete"
        :disabled="loading"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:text-red-300 
          hover:bg-red-500/10 transition-all duration-200 font-medium
          disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Supprimer
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  users: {
    type: Array,
    required: true
  },
  projects: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update-status', 'delete-task', 'update-task', 'task-updated']);

const statusOptions = ['A faire', 'En cours', 'Terminée'];
const loading = ref(false);
const isEditing = ref(false);
const editedTask = ref({ ...props.task });

const startEditing = () => {
  editedTask.value = { ...props.task };
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  editedTask.value = { ...props.task };
};

const saveChanges = async () => {
  loading.value = true;
  try {
    // Validation des champs requis
    if (!editedTask.value.name || !editedTask.value.status) {
      throw new Error('Le nom et le statut sont requis');
    }

    const response = await fetch(`http://localhost:5000/api/tasks/${editedTask.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: editedTask.value.name,
        description: editedTask.value.description,
        status: editedTask.value.status,
        project_id: editedTask.value.project_id,
        assigned_to: editedTask.value.assigned_to,
        start_date: editedTask.value.start_date,
        end_date: editedTask.value.end_date,
        completion_percentage: editedTask.value.completion_percentage
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Erreur lors de la mise à jour de la tâche');
    }

    const updatedTask = await response.json();
    emit('task-updated', updatedTask); // Émet un événement pour mettre à jour la liste des tâches
    isEditing.value = false;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    alert(error.message);
  } finally {
    loading.value = false;
  }
};


const getAssigneeName = (assignedId) => {
  const user = props.users.find(u => u.id === assignedId);
  return user ? `${user.firstname} ${user.lastname}` : 'Non assigné';
};

const getProjectName = (projectId) => {
  const project = props.projects.find(p => p.id === projectId);
  return project ? project.name : 'Non défini';
};

const formatDate = (date) => {
  if (!date) return 'Non définie';
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};


const confirmDelete = () => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    emit('delete-task', props.task.id);
  }
};
</script>