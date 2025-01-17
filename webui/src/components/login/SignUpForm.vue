<template>
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-2">
          <svg class="w-10 h-10 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" />
          </svg>
          <span class="text-cyan-500 font-semibold tracking-wider ml-2">PROGEST</span>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Inscription</h1>
        <p class="text-slate-400">Créez votre compte pour commencer</p>
      </div>
  
      <!-- Form Card -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 shadow-xl">
        <form @submit.prevent="handleSignup">
          <!-- Error Message -->
          <div v-if="error" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {{ error }}
          </div>
  
          <div class="grid grid-cols-2 gap-6 mb-6">
            <!-- Firstname -->
            <div>
              <label for="firstname" class="block text-sm font-medium text-slate-300 mb-2">Prénom</label>
              <input
                type="text"
                id="firstname"
                v-model="formData.firstname"
                placeholder="John"
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
                  focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                required
              />
            </div>
  
            <!-- Lastname -->
            <div>
              <label for="lastname" class="block text-sm font-medium text-slate-300 mb-2">Nom</label>
              <input
                type="text"
                id="lastname"
                v-model="formData.lastname"
                placeholder="Doe"
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
                  focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                required
              />
            </div>
          </div>
  
          <!-- Email -->
          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              placeholder="vous@email.com"
              class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
                focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
              required
            />
          </div>
  
          <!-- Phone -->
          <div class="mb-6">
            <label for="phone" class="block text-sm font-medium text-slate-300 mb-2">Téléphone</label>
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              placeholder="0600000000"
              class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
                focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
              required
            />
          </div>
  
          <!-- Password -->
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-slate-300 mb-2">Mot de passe</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
                focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
              required
            />
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold
              hover:from-cyan-600 hover:to-cyan-700 focus:ring-4 focus:ring-cyan-500/30 focus:outline-none
              transition-all duration-200 flex items-center justify-center group disabled:opacity-50"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {{ loading ? 'Inscription en cours...' : 'S\'inscrire' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, defineEmits } from 'vue'
  
  const emit = defineEmits(['signup-success'])
  const loading = ref(false)
  const error = ref(null)
  
  const formData = reactive({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: ''
  })
  
  const handleSignup = async () => {
    try {
      loading.value = true
      error.value = null
  
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
  
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de l\'inscription')
      }
  
      const data = await response.json()
      console.log('Inscription réussie:', data)
      
      // Émettre l'événement au lieu de rediriger
      emit('signup-success', {
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname
      })
    } catch (e) {
      error.value = e.message
      console.error('Erreur d\'inscription:', e)
    } finally {
      loading.value = false
    }
  }
  </script>