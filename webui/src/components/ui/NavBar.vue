<template>
  <header class="fixed top-0 z-50 w-full">
    <!-- Glassmorphism Background -->
    <div class="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/95 to-slate-800/95 backdrop-blur-md border-b border-white/5"></div>
    
    <nav class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <RouterLink 
            to="/" 
            class="flex items-center gap-3 group"
          >
            <div class="relative overflow-hidden rounded-xl p-2 group-hover:scale-110 transition-all duration-300">
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg class="relative w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" />
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-lg font-bold text-white">
                ProGest
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

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <div v-if="isMenuOpen" class="absolute inset-x-0 top-full mt-2 p-2 bg-slate-900/95 backdrop-blur-md rounded-lg border border-white/5 shadow-xl md:hidden">
          <div class="space-y-1">
            <RouterLink 
              v-for="item in navigationItems" 
              :key="item.path" 
              :to="item.path"
              class="block px-3 py-2 rounded-lg text-base font-medium text-white/70 hover:text-white
                hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10
                transition-all duration-200"
              @click="isMenuOpen = false"
            >
              {{ item.name }}
            </RouterLink>
            
            <RouterLink
              to="/login"
              class="block mt-4 px-3 py-2 rounded-lg text-base font-medium text-white
                bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90
                transition-opacity duration-200"
              @click="isMenuOpen = false"
            >
              Connexion
            </RouterLink>
          </div>
        </div>
      </transition>
    </nav>
  </header>

  <!-- Spacer pour le fixed header -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const navigationItems = [
  { name: 'Projets', path: '/projects' },
  { name: 'Tâches', path: '/tasks' },
  { name: 'Profil', path: '/profile' }
]
</script>