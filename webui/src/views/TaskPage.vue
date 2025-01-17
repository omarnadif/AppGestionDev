<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8 px-4">
    <div class="container mx-auto max-w-7xl">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-cyan-500 flex items-center gap-3">
          <svg class="animate-spin h-8 w-8" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span class="text-lg font-medium">Chargement des tâches...</span>
        </div>
      </div>

      <div v-else>
        <!-- Header Section -->
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-8 shadow-xl">
          <h1 class="text-3xl font-bold text-white">Gestionnaire de Tâches</h1>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
          {{ error }}
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import TaskItem from '@/components/tasks/TaskItem.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'

const tasks = ref([]);
const statusFilter = ref('tous');
const percentageFilter = ref('tous');
const projectFilter = ref('tous');
const loading = ref(true);
const error = ref(null);

const statusOptions = ['tous', 'A faire', 'En cours', 'Terminée'];
const percentageOptions = [
  { value: 'tous', label: 'Tous' },
  { value: '0-25', label: '0-25%' },
  { value: '26-50', label: '26-50%' },
  { value: '51-75', label: '51-75%' },
  { value: '76-100', label: '76-100%' }
];

// Charger les tâches depuis l'API
const fetchTasks = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await fetch('http://localhost:5000/api/tasks/getTasks'); 
    if (!response.ok) throw new Error('Erreur lors du chargement des tâches');
    tasks.value = await response.json();
  } catch (e) {
    error.value = e.message;
    console.error(e);
  } finally {
    loading.value = false;
  }
};
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const statusMatch = statusFilter.value === 'tous' || task.status === statusFilter.value;
    const projectMatch = projectFilter.value === 'tous' || task.project_id === projectFilter.value;
    
    let percentageMatch = true;
    if (percentageFilter.value !== 'tous') {
      const taskPercentage = task.completion_percentage || 0;
      const [min, max] = percentageFilter.value.split('-').map(Number);
      percentageMatch = taskPercentage >= min && taskPercentage <= max;
    }
    
    return statusMatch && percentageMatch && projectMatch;
  });
});

const addTask = async (newTask) => {
  try {
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newTask.title,
        description: newTask.description,
        status: 'A faire',
        percentage: 0,
        project_id: newTask.project_id,
        assigned_to: newTask.assigned_to
      })
    });

    if (!response.ok) throw new Error('Erreur lors de la création de la tâche');
    await fetchTasks();
  } catch (e) {
    error.value = e.message;
    console.error(e);
  }
};

const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: newStatus,
        percentage: newStatus === 'Terminée' ? 100 : newStatus === 'A faire' ? 0 : 50
      })
    });

    if (!response.ok) throw new Error('Erreur lors de la mise à jour de la tâche');
    await fetchTasks();
  } catch (e) {
    error.value = e.message;
    console.error(e);
  }
};

const updateTaskPercentage = async (taskId, newPercentage) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        percentage: newPercentage,
        status: newPercentage === 0 ? 'A faire' : newPercentage === 100 ? 'Terminée' : 'En cours'
      })
    });

    if (!response.ok) throw new Error('Erreur lors de la mise à jour de la tâche');
    await fetchTasks();
  } catch (e) {
    error.value = e.message;
    console.error(e);
  }
};

const deleteTask = async (taskId) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) return;

  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Erreur lors de la suppression de la tâche');
    await fetchTasks();
  } catch (e) {
    error.value = e.message;
    console.error(e);
  }
};

onMounted(fetchTasks);
</script>