<script setup>
import { defineEmits, defineProps, computed } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update-status', 'delete-task', 'update-percentage']);

const statusOptions = ['A faire', 'En cours', 'Terminée'];

// Calculer le pourcentage en fonction du statut
const getDefaultPercentage = computed(() => {
  switch(props.task.status) {
    case 'A faire': return 0;
    case 'En cours': return 50;
    case 'Terminée': return 100;
    default: return props.task.percentage || 0;
  }
});

const updateStatus = (newStatus) => {
  emit('update-status', props.task.id, newStatus);
};

const updatePercentage = (event) => {
  const newPercentage = parseInt(event.target.value);
  emit('update-percentage', props.task.id, newPercentage);
};

const deleteTask = () => {
  emit('delete-task', props.task.id);
};
</script>

<template>
  <div class="task-item" :class="task.status.toLowerCase().replace(' ', '-')">
    <div class="task-content">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
      
      <div class="progress-container">
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: `${task.percentage || getDefaultPercentage}%` }"
          ></div>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="10"
          :value="task.percentage || getDefaultPercentage"
          @input="updatePercentage"
          class="percentage-slider"
        >
        <span class="percentage-text">{{ task.percentage || getDefaultPercentage }}%</span>
      </div>
    </div>
    
    <div class="task-actions">
      <select
        :value="task.status"
        @change="updateStatus($event.target.value)"
      >
        <option
          v-for="status in statusOptions"
          :key="status"
          :value="status"
        >
          {{ status }}
        </option>
      </select>
      
      <button
        @click="deleteTask"
        class="delete-btn"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.task-form {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.task-item {
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.task-item.a-faire {
  border-left: 4px solid #ffd700;
}

.task-item.en-cours {
  border-left: 4px solid #4caf50;
}

.task-item.terminee {
  border-left: 4px solid #2196f3;
}

.task-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.delete-btn {
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

/* Nouveaux styles pour la barre de progression */
.progress-container {
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex-grow: 1;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #42b983;
  transition: width 0.3s ease;
}

.percentage-slider {
  width: 100px;
}

.percentage-text {
  min-width: 45px;
  text-align: right;
}
</style>