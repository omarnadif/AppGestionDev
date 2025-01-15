<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8 px-4">
    <div class="container mx-auto max-w-7xl">
      <!-- Header Section -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-8 shadow-xl">
        <h1 class="text-3xl font-bold text-white">Gestionnaire de Tâches</h1>
      </div>

      <!-- Task Form -->
      <div class="mb-8">
        <TaskForm @add-task="addTask" />
      </div>

      <!-- Filters Section -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-8 shadow-xl">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- État Filter -->
          <div class="flex-1 space-y-2">
            <label class="block text-sm font-medium text-slate-400">
              État
            </label>
            <div class="relative">
              <select
                v-model="statusFilter"
                class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
                  focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
                  appearance-none"
              >
                <option 
                  v-for="status in statusOptions" 
                  :key="status" 
                  :value="status"
                  class="bg-slate-800"
                >
                  {{ status === 'tous' ? 'Tous les états' : status }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Percentage Filter -->
          <div class="flex-1 space-y-2">
            <label class="block text-sm font-medium text-slate-400">
              Pourcentage
            </label>
            <div class="relative">
              <select
                v-model="percentageFilter"
                class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
                  focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200
                  appearance-none"
              >
                <option 
                  v-for="option in percentageOptions" 
                  :key="option.value" 
                  :value="option.value"
                  class="bg-slate-800"
                >
                  {{ option.label }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tasks List Section -->
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-white">Liste des tâches</h2>
          <span class="text-slate-400">
            {{ filteredTasks.length }} tâche(s)
          </span>
        </div>

        <!-- No Tasks Message -->
        <div v-if="filteredTasks.length === 0" 
          class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 text-center shadow-xl">
          <div class="flex flex-col items-center gap-4">
            <div class="p-3 bg-slate-700/50 rounded-full">
              <svg class="w-8 h-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p class="text-slate-400">Aucune tâche ne correspond aux filtres sélectionnés</p>
          </div>
        </div>

        <!-- Tasks Grid -->
        <div class="grid grid-cols-1 gap-6">
          <TaskItem
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @update-status="updateTaskStatus"
            @update-percentage="updateTaskPercentage"
            @delete-task="deleteTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TaskItem from '@/components/tasks/TaskItem.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'


const tasks = ref([]);
const statusFilter = ref('tous');
const percentageFilter = ref('tous');
const projectFilter = ref('tous');

const statusOptions = ['tous', 'A faire', 'En cours', 'Terminée'];
const percentageOptions = [
  { value: 'tous', label: 'Tous' },
  { value: '0-25', label: '0-25%' },
  { value: '26-50', label: '26-50%' },
  { value: '51-75', label: '51-75%' },
  { value: '76-100', label: '76-100%' }
];

const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const statusMatch = statusFilter.value === 'tous' || task.status === statusFilter.value;
    const projectMatch = projectFilter.value === 'tous' || task.projectName === projectFilter.value;
    
    let percentageMatch = true;
    if (percentageFilter.value !== 'tous') {
      const taskPercentage = task.percentage || 0;
      const [min, max] = percentageFilter.value.split('-').map(Number);
      percentageMatch = taskPercentage >= min && taskPercentage <= max;
    }
    
    return statusMatch && percentageMatch && projectMatch;
  });
});

const addTask = (newTask) => {
  tasks.value.push({
    id: Date.now(),
    ...newTask,
    status: 'A faire',
    percentage: 0
  });
};

const updateTaskStatus = (taskId, newStatus) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
    switch(newStatus) {
      case 'A faire': task.percentage = 0; break;
      case 'En cours': task.percentage = 50; break;
      case 'Terminée': task.percentage = 100; break;
    }
  }
};

const updateTaskPercentage = (taskId, newPercentage) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.percentage = newPercentage;
    if (newPercentage === 0) task.status = 'A faire';
    else if (newPercentage === 100) task.status = 'Terminée';
    else task.status = 'En cours';
  }
};

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter(t => t.id !== taskId);
};
</script>