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
                <div class="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center">
                  <svg class="w-16 h-16 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <button class="mt-4 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-cyan-500/20">
                  Changer l'avatar
                </button>
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
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>

        <!-- Activity Section -->
        <div class="space-y-8">
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-xl">
            <h2 class="text-xl font-semibold text-white mb-6">Mon Activité</h2>
            
            <div class="space-y-4">
              <!-- Projets actifs -->
              <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-cyan-500/10 rounded-lg">
                      <svg class="w-6 h-6 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-slate-400">Projets actifs</p>
                      <p class="text-2xl font-semibold text-white">{{ userStats.activeProjects }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tâches en cours -->
              <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-orange-500/10 rounded-lg">
                      <svg class="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-slate-400">Tâches en cours</p>
                      <p class="text-2xl font-semibold text-white">{{ userStats.ongoingTasks }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tâches terminées -->
              <div class="p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-green-500/10 rounded-lg">
                      <svg class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm text-slate-400">Tâches terminées</p>
                      <p class="text-2xl font-semibold text-white">{{ userStats.completedTasks }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full -z-10" aria-hidden="true">
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl"></div>
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
  alert('Profil mis à jour avec succès!')
}
</script>