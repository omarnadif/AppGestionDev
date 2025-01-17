<template>
  <header class="fixed top-0 z-50 w-full">
    <!-- Glassmorphism Background -->
    <div class="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/95 to-slate-800/95 backdrop-blur-md border-b border-white/5"></div>

    <nav class="relative max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <RouterLink
              to="/"
              class="flex items-center gap-2 group"
          >
            <div class="relative overflow-hidden rounded-xl group-hover:scale-110 transition-all duration-300">
              <img src="/images/logo.png" alt="Logo" class="w-6 h-6 object-contain" />
            </div>
            <div>
              <span class="text-lg font-bold text-white">
                TaskFlow
              </span>
            </div>
          </RouterLink>
        </div>

        <!-- Navigation Links - Desktop -->
        <div class="hidden md:flex md:items-center md:space-x-8">
          <RouterLink
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="relative px-3 py-2 text-sm font-medium text-white/70 hover:text-white
              transition-all duration-200 group"
              v-slot="{ isActive }"
          >
            <!-- Hover & Active Effect -->
            <span class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg
              opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  :class="{ 'opacity-100': isActive }"
            ></span>

            <!-- Background Glow Effect -->
            <span class="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0
              opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
                  :class="{ 'opacity-100': isActive }"
            ></span>

            <!-- Text -->
            <span class="relative">
              {{ item.name }}
            </span>

            <!-- Bottom Line -->
            <span
                class="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-500 to-blue-500
                transform origin-left scale-x-0 transition-transform duration-300 rounded-full"
                :class="{ 'scale-x-100': isActive }"
            ></span>
          </RouterLink>
        </div>

        <!-- Auth Button -->
        <div class="hidden md:block">
          <RouterLink
            to="/login"
            class="relative inline-flex items-center gap-2 px-4 py-2 group"
        <!-- User Menu or Login Button -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- User Menu when logged in -->
          <div v-if="isLoggedIn" class="relative">
            <button
                @click="toggleUserMenu"
                class="flex items-center justify-center w-10 h-10 rounded-full
              bg-slate-700/50 hover:bg-slate-600/50 transition-colors duration-200"
            >
              <!-- Avatar or Default Icon -->
              <img
                  v-if="userAvatar"
                  :src="userAvatar"
                  alt="User Avatar"
                  class="w-full h-full object-cover rounded-full"
              />
              <svg v-else class="w-6 h-6 text-white/70 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
            >
              <div
                  v-if="isUserMenuOpen"
                  class="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-white/10 rounded-lg shadow-xl py-2"
              >
                <RouterLink
                    to="/profile"
                    class="block px-4 py-2 text-sm text-white/70 hover:bg-slate-700 hover:text-white transition-colors"
                    @click="closeUserMenu"
                >
                  Profil
                </RouterLink>
                <button
                    @click="logout"
                    class="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </transition>
          </div>

          <!-- Login Button when not logged in -->
          <RouterLink
              v-else
              to="/login"
              class="relative inline-flex items-center gap-2 px-4 py-2 group"
          >
            <!-- Button Background -->
            <span class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg
              group-hover:opacity-90 transition-opacity duration-300"></span>

            <!-- Button Glow -->
            <span class="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500
              opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300"></span>

            <!-- Button Content -->
            <svg class="relative w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span class="relative text-sm font-semibold text-white">
              Connexion
            </span>
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="relative p-2 rounded-lg text-white/70 hover:text-white
              transition-colors duration-200 focus:outline-none"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg
              opacity-0 hover:opacity-100 transition-opacity duration-200"></span>
            
            <svg 
              class="w-6 h-6 transition-transform duration-300"
              :class="{ 'rotate-180': isMenuOpen }"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path 
                v-if="!isMenuOpen" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </header>

  <!-- Spacer per l'header fisso -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Routeur pour la navigation
const router = useRouter()

// États réactifs pour le menu et l'authentification
const isUserMenuOpen = ref(false)
const isLoggedIn = ref(false)
const userAvatar = ref(null)

// Éléments de navigation
const navigationItems = [
  {name: 'Projets', path: '/projects'},
  {name: 'Tâches', path: '/tasks'},
  {name: 'Profil', path: '/profile'}
]

// Avatar par défaut
const DEFAULT_AVATAR = 'assets/images/logo.png'

/**
 * Récupère le jeton d'authentification depuis les cookies
 * @returns {string} Le jeton d'authentification
 */
const getTokenFromCookie = () => {
  const cookieToken = document.cookie.replace(/(?:(?:^|.*; *)token *= *([^;]*).*$)|^.*$/, "$1")
  return cookieToken
}

/**
 * Vérifie le statut de connexion et récupère les données utilisateur
 */
const checkLoginStatus = async () => {
  const token = getTokenFromCookie()

  if (token) {
    try {
      const response = await fetch('http://localhost:5000/api/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        isLoggedIn.value = true

        // Définit l'avatar de l'utilisateur
        userAvatar.value = userData.avatar
            ? `http://localhost:5000/${userData.avatar}`
            : DEFAULT_AVATAR
      } else {
        // Token invalide
        isLoggedIn.value = false
        userAvatar.value = null
      }
    } catch (error) {
      console.error('Erreur de vérification:', error)
      isLoggedIn.value = false
      userAvatar.value = null
    }
  } else {
    isLoggedIn.value = false
    userAvatar.value = null
  }
}

/**
 * Bascule l'ouverture/fermeture du menu utilisateur
 */
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

/**
 * Ferme le menu utilisateur
 */
const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

/**
 * Déconnecte l'utilisateur
 */
const logout = () => {
  // Supprime le jeton d'authentification
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

  // Redirige vers la page de connexion
  router.push('/login')
}

// Vérifie le statut de connexion au montage du composant
onMounted(checkLoginStatus)
</script>