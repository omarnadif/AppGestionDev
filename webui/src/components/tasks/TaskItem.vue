<template>
  <div 
    class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl 
      hover:border-cyan-500/20 transition-all duration-300"
  >
    <!-- Task Header -->
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-white mb-2">{{ task.name }}</h3>
        <p class="text-slate-400">{{ task.description }}</p>
      </div>
      
      <!-- Status Badge -->
      <div class="relative">
        <select
          :value="task.status"
          @change="updateStatus($event.target.value)"
          :disabled="loading"
          class="appearance-none px-4 py-2 rounded-full text-sm font-medium 
            focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{
            'bg-orange-500/10 text-orange-500': task.status === 'A faire',
            'bg-cyan-500/10 text-cyan-500': task.status === 'En cours',
            'bg-green-500/10 text-green-500': task.status === 'Terminée'
          }"
        >
          <option v-for="status in statusOptions" :key="status" :value="status" class="bg-slate-800">
            {{ status }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg class="w-4 h-4 current" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Task Details -->
    <div class="grid grid-cols-2 gap-4 mb-4 text-sm text-slate-400">
      <div>
        <span class="block text-slate-500">Assigné à:</span>
        <span>{{ task.assigned_to || 'Non assigné' }}</span>
      </div>
      <div>
        <span class="block text-slate-500">Projet:</span>
        <span>{{ task.project_id || 'Non défini' }}</span>
      </div>
    </div>

    <!-- Progress Section -->
    <div class="space-y-4">
      <!-- Progress Bar & Percentage -->
      <div class="flex items-center gap-4">
        <div class="flex-grow h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            class="h-full transition-all duration-300 rounded-full"
            :style="{ width: `${currentPercentage}%` }"
            :class="{
              'bg-orange-500': currentPercentage < 30,
              'bg-cyan-500': currentPercentage >= 30 && currentPercentage < 70,
              'bg-green-500': currentPercentage >= 70
            }"
          ></div>
        </div>
        <span class="text-sm text-slate-400 min-w-[3rem]">
          {{ currentPercentage }}%
        </span>
      </div>

      <!-- Slider -->
      <div class="relative">
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="10"
          :value="currentPercentage"
          @input="updatePercentage"
          :disabled="loading"
          class="w-full h-2 bg-slate-700 rounded-lg cursor-pointer appearance-none
            focus:outline-none focus:ring-2 focus:ring-cyan-500/20
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:bg-cyan-400
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
      </div>
    </div>

    <!-- Task Actions -->
    <div class="flex justify-end mt-6">
      <button
        @click="confirmDelete"
        :disabled="loading"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:text-red-300 
          hover:bg-red-500/10 transition-all duration-200 font-medium
          disabled:opacity-50 disabled:cursor-not-allowed"
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
import { ref, computed, defineEmits, defineProps } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update-status', 'delete-task', 'update-percentage']);

const statusOptions = ['A faire', 'En cours', 'Terminée'];
const loading = ref(false);

const currentPercentage = computed(() => {
  return props.task.percentage ?? getDefaultPercentage(props.task.status);
});

const getDefaultPercentage = (status) => {
  switch(status) {
    case 'A faire': return 0;
    case 'En cours': return 50;
    case 'Terminée': return 100;
    default: return 0;
  }
};

const updateStatus = async (newStatus) => {
  loading.value = true;
  try {
    await emit('update-status', props.task.id, newStatus);
  } finally {
    loading.value = false;
  }
};

const updatePercentage = async (event) => {
  loading.value = true;
  try {
    const newPercentage = parseInt(event.target.value);
    await emit('update-percentage', props.task.id, newPercentage);
  } finally {
    loading.value = false;
  }
};

const confirmDelete = () => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    emit('delete-task', props.task.id);
  }
};
</script>