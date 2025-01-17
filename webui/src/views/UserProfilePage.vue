<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8 px-4 relative overflow-hidden">
    <div class="container mx-auto max-w-6xl">
      <!-- Header -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-8 shadow-xl">
        <h1 class="text-3xl font-bold text-white">Mon Profil</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Section -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Avatar & Personal Info -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl">
            <!-- Avatar Section -->
            <div class="flex flex-col items-center mb-8">
              <div class="relative mb-4">
                <!-- Avatar Image -->
                <div class="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                  <img
                    v-if="profile.avatar"
                    :src="profile.avatar"
                    alt="Avatar"
                    class="w-full h-full object-cover"
                  />
                  <svg
                    v-else
                    class="w-16 h-16 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <!-- Upload Avatar Button -->
                <label
                  for="avatarInput"
                  class="mt-4 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
                >
                  Changer l'avatar
                </label>
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  @change="uploadAvatar"
                  class="hidden"
                />
              </div>
            </div>

            <!-- Personal Information Form -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-400">Prénom</label>
                <input
                  v-model="profile.firstName"
                  type="text"
                  class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
                    focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-400">Nom</label>
                <input
                  v-model="profile.lastName"
                  type="text"
                  class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
                    focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-400">Email</label>
                <input
                  v-model="profile.email"
                  type="email"
                  class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
                    focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-400">Téléphone</label>
                <input
                  v-model="profile.phone"
                  type="tel"
                  class="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white
                    focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            <!-- Save Button -->
            <div class="mt-8">
              <button
                @click="saveProfile"
                class="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold
                  hover:from-cyan-600 hover:to-cyan-700 focus:ring-4 focus:ring-cyan-500/30 focus:outline-none
                  transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import{getTokenFromCookie} from '../utils/utils.js'

const profile = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '0123456789',
  avatar: null // URL de l'avatar
})

const uploadAvatar = async (event) => {
  const file = event.target.files[0];
  if (!file) {
    alert('Aucune image sélectionnée.');
    return;
  }

  
  const token = getTokenFromCookie();
  if (!token) {
    alert('Vous devez être connecté pour changer votre avatar.');
    console.error('Token introuvable dans le localStorage');
    return;
  }

  // Préparer les données à envoyer
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    // Envoi de la requête avec le token
    const response = await fetch('http://localhost:5000/api/user/avatar', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête Authorization
      },
      body: formData, // Envoyer les données
    });

    const result = await response.json();

    if (response.ok) {
      // Mettre à jour l'URL de l'avatar dans le profil
      profile.value.avatar = result.avatarUrl;
    } else {
      alert(`Erreur : ${result.error || 'Une erreur est survenue'}`);
    }
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’avatar :', error);
  }
};


const saveProfile = () => {
  alert('Profil mis à jour avec succès!')
}
</script>
