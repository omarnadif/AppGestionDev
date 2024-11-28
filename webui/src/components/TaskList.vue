<script setup>
import { ref, computed } from 'vue';
import TaskItem from './TaskItem.vue';
import TaskForm from './TaskForm.vue';

const tasks = ref([]);
const statusFilter = ref('tous');
const percentageFilter = ref('tous');
const projectFilter = ref('tous');

// Options de filtrage
const statusOptions = ['tous', 'A faire', 'En cours', 'Terminée'];
const percentageOptions = [
  { value: 'tous', label: 'Tous' },
  { value: '0-25', label: '0-25%' },
  { value: '26-50', label: '26-50%' },
  { value: '51-75', label: '51-75%' },
  { value: '76-100', label: '76-100%' }
];


// Tâches filtrées
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

<template>
  <div class="task-manager">
    <h1>Gestionnaire de Tâches</h1>
    
    <TaskForm @add-task="addTask" />
    
    <!-- Filtres -->
    <div class="filters">

      <div class="filter-group">
        <label>État:</label>
        <select v-model="statusFilter">
          <option 
            v-for="status in statusOptions" 
            :key="status" 
            :value="status"
          >
            {{ status === 'tous' ? 'Tous les états' : status }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Pourcentage:</label>
        <select v-model="percentageFilter">
          <option 
            v-for="option in percentageOptions" 
            :key="option.value" 
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    
    <div class="task-list">
      <h2>Liste des tâches</h2>
      <div v-if="filteredTasks.length === 0" class="no-tasks">
        Aucune tâche ne correspond aux filtres sélectionnés
      </div>
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
</template>