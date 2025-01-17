<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4 py-12 relative overflow-hidden">
    <!-- Form Container -->
    <div class="max-w-md w-full relative">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-2">
          <svg class="w-10 h-10 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" />
          </svg>
          <span class="text-cyan-500 font-semibold tracking-wider ml-2">PROGEST</span>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">
          {{ isLogin ? 'Connexion' : 'Inscription' }}
        </h1>
        <p class="text-slate-400">
          {{ isLogin ? 'Accédez à votre espace de gestion' : 'Créez votre compte' }}
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 shadow-xl">
        <form @submit.prevent="handleSubmit">
          <!-- Name fields (only for signup) -->
          <transition name="slide-fade">
            <div v-if="!isLogin" class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-slate-300 mb-2">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  v-model="formData.firstName"
                  placeholder="Jean"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
                    focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-slate-300 mb-2">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  v-model="formData.lastName"
                  placeholder="Dupont"
                  class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
                    focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>
          </transition>

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

          <!-- Password -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="text-sm font-medium text-slate-300">Mot de passe</label>
              <a v-if="isLogin" href="#" class="text-sm text-cyan-500 hover:text-cyan-400">Mot de passe oublié ?</a>
            </div>
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

          <!-- Confirm Password (only for signup) -->
          <transition name="slide-fade">
            <div v-if="!isLogin" class="mb-6">
              <label for="confirmPassword" class="block text-sm font-medium text-slate-300 mb-2">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                placeholder="••••••••"
                class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500
                  focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-200"
                required
              />
            </div>
          </transition>

          <!-- Remember Me (only for login) -->
          <transition name="slide-fade">
            <div v-if="isLogin" class="mb-6 flex items-center">
              <input
                type="checkbox"
                id="remember"
                v-model="formData.remember"
                class="w-4 h-4 border-slate-700 rounded bg-slate-900/50 text-cyan-500 focus:ring-cyan-500/20"
              />
              <label for="remember" class="ml-2 text-sm text-slate-300">Se souvenir de moi</label>
            </div>
          </transition>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold
              hover:from-cyan-600 hover:to-cyan-700 focus:ring-4 focus:ring-cyan-500/30 focus:outline-none
              transition-all duration-200 flex items-center justify-center group"
          >
            {{ isLogin ? 'Se connecter' : "S'inscrire" }}
            <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
            </svg>
          </button>

          <!-- Toggle Form Type -->
          <div class="text-center text-slate-400 mt-6">
            {{ isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?' }}
            <button 
              type="button"
              @click="toggleForm" 
              class="text-cyan-500 hover:text-cyan-400 font-medium bg-transparent hover:bg-transparent ml-1"
            >
              {{ isLogin ? 'Inscrivez-vous' : 'Connectez-vous' }}
            </button>
          </div>
        </form>
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
import { ref, reactive } from 'vue'

const isLogin = ref(true)

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  remember: false
})

const handleSubmit = () => {
  if (isLogin.value) {
    console.log('Login form submitted:', {
      email: formData.email,
      password: formData.password,
      remember: formData.remember
    });
  } else {
    console.log('Signup form submitted:', formData);
    // Réinitialiser les champs sensibles comme le mot de passe
    formData.password = '';
    formData.confirmPassword = '';
    // Basculer sur la page de connexion
    isLogin.value = true;
  }
};


const toggleForm = () => {
  isLogin.value = !isLogin.value
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>