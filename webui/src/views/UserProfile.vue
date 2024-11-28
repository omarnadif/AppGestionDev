// views/UserProfile.vue
<template>
  <div class="profile-view">
    <h1>Mon Profil</h1>

    <div class="profile-content">
      <div class="profile-info">
        <div class="avatar-section">
          <button class="change-avatar-btn">Changer l'avatar</button>
        </div>

        <div class="user-details">
          <div class="detail-group">
            <label>Nom</label>
            <input v-model="profile.lastName" type="text">
          </div>
          <div class="detail-group">
            <label>Prénom</label>
            <input v-model="profile.firstName" type="text">
          </div>
          <div class="detail-group">
            <label>Email</label>
            <input v-model="profile.email" type="email">
          </div>
          <div class="detail-group">
            <label>Téléphone</label>
            <input v-model="profile.phone" type="tel">
          </div>
          
          <button @click="saveProfile" class="save-btn">Enregistrer les modifications</button>
        </div>
      </div>

      <div class="activity-section">
        <h2>Mon Activité</h2>
        <div class="stats">
          <div class="stat-card">
            <h3>Projets actifs</h3>
            <span>{{ userStats.activeProjects }}</span>
          </div>
          <div class="stat-card">
            <h3>Tâches en cours</h3>
            <span>{{ userStats.ongoingTasks }}</span>
          </div>
          <div class="stat-card">
            <h3>Tâches terminées</h3>
            <span>{{ userStats.completedTasks }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const profile = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '0123456789'
})

const userStats = ref({
  activeProjects: 3,
  ongoingTasks: 5,
  completedTasks: 12
})

const saveProfile = () => {
  // Simuler la sauvegarde du profil
  alert('Profil mis à jour avec succès!')
}
</script>

<style scoped>
.profile-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 30px;
}

.avatar-section {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.user-details {
  display: grid;
  gap: 15px;
}

.detail-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat-card {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.save-btn {
  margin-top: 20px;
  width: 100%;
}
</style>