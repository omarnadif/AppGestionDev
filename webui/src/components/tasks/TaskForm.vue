<template>
  <form @submit.prevent="submitTask" class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-white">Nouvelle Tâche</h2>
      <p class="text-slate-400 mt-2">Créez une nouvelle tâche et assignez-la à un membre de l'équipe</p>
    </div>

    <div class="space-y-6">
      <!-- Projet -->
      <div class="space-y-2">
        <label for="project" class="block text-sm font-medium text-slate-400">
          Projet
        </label>
        <div class="relative">
          <select
            id="project"
            v-model="projectId"
            required
            class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
              focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
              appearance-none"
          >
            <option value="" disabled selected class="bg-slate-800">Sélectionner un projet</option>
            <option v-for="project in props.projects" :key="project.id" :value="project.id" class="bg-slate-800">
              {{ project.name }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Titre -->
      <div class="space-y-2">
        <label for="title" class="block text-sm font-medium text-slate-400">
          Titre
        </label>
        <input
          id="title"
          v-model="title"
          type="text"
          required
          placeholder="Titre de la tâche"
          class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
            focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
        >
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <label for="description" class="block text-sm font-medium text-slate-400">
          Description
        </label>
        <textarea
          id="description"
          v-model="description"
          rows="4"
          placeholder="Description de la tâche"
          class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
            focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
            resize-none"
        ></textarea>
      </div>

      <!-- Assigné à -->
      <div class="space-y-2">
        <label for="assignedTo" class="block text-sm font-medium text-slate-400">
          Assigné à
        </label>
        <div class="relative">
          <select
            id="assignedTo"
            v-model="assignedTo"
            required
            class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
              focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
              appearance-none"
          >
            <option value="" disabled selected class="bg-slate-800">Sélectionner un membre</option>
            <option v-for="user in users" :key="user.id" :value="user.id" class="bg-slate-800">
              {{ user.name }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Dates Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Date de début -->
        <div class="space-y-2">
          <label for="startDate" class="block text-sm font-medium text-slate-400">
            Date de début
          </label>
          <input
            id="startDate"
            v-model="startDate"
            type="date"
            required
            class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
              focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
          >
        </div>

        <!-- Date de fin -->
        <div class="space-y-2">
          <label for="endDate" class="block text-sm font-medium text-slate-400">
            Date de fin
          </label>
          <input
            id="endDate"
            v-model="endDate"
            type="date"
            required
            :min="startDate"
            class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
              focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
          >
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold
          hover:from-cyan-600 hover:to-cyan-700 focus:ring-4 focus:ring-cyan-500/30 focus:outline-none
          transition-all duration-200 flex items-center justify-center gap-2"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 4v16m-8-8h16" />
        </svg>
        Ajouter la tâche
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['add-task']);

const title = ref('');
const description = ref('');
const assignedTo = ref('');
const projectId = ref('');
const startDate = ref('');
const endDate = ref('');

const submitTask = () => {
  if (title.value.trim() && projectId.value) {
    emit('add-task', {
      title: title.value,
      description: description.value,
      assignedTo: assignedTo.value,
      projectId: projectId.value,
      startDate: startDate.value,
      endDate: endDate.value,
      status: 'A faire',
      percentage: 0,
    });
    title.value = '';
    description.value = '';
    assignedTo.value = '';
    projectId.value = '';
    startDate.value = '';
    endDate.value = '';
  }
};

// Simulation d'une liste d'utilisateurs
const users = [
  { id: 'user1', name: 'Alice' },
  { id: 'user2', name: 'Bob' },
  { id: 'user3', name: 'Charlie' }
];
</script>