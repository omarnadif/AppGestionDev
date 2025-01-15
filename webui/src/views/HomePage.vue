<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
    <!-- Header Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
      <div class="text-center mb-16">
        <!-- Logo -->
<!--        <div class="flex items-center justify-center mb-6">-->
<!--          <img src="/images/logo.png" alt="Logo" class="w-6 h-6 object-contain" />-->
<!--          <span class="text-white font-semibold tracking-wider">TaskFlow</span>-->
<!--        </div>-->
        
        <!-- Hero Title -->
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
          <span class="bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent">
            Gérez vos projets
          </span>
          <br />
          avec excellence
        </h1>
        
        <!-- Hero Description -->
        <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Une solution complète pour transformer la gestion de vos projets. 
          Simplifiez, collaborez et atteignez vos objectifs.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold 
            hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 flex items-center group">
            Commencer maintenant
            <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" />
            </svg>
          </button>
          <button class="px-8 py-4 bg-slate-700/50 text-white rounded-lg font-semibold 
            hover:bg-slate-700 transition-all duration-200 border border-slate-600">
            Voir la démo
          </button>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
        <!-- Planification -->
        <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 
          transition-all duration-300 backdrop-blur-sm group">
          <div class="mb-4">
            <svg class="w-8 h-8 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-white text-xl font-semibold mb-3 group-hover:text-cyan-500 transition-colors">
            Planification intelligente
          </h3>
          <p class="text-slate-400">
            Organisez vos projets avec des outils de planification avancés et intuitifs.
          </p>
        </div>

        <!-- Collaboration -->
        <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-orange-500/50 
          transition-all duration-300 backdrop-blur-sm group">
          <div class="mb-4">
            <svg class="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-white text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">
            Collaboration en temps réel
          </h3>
          <p class="text-slate-400">
            Travaillez ensemble efficacement avec votre équipe, où que vous soyez.
          </p>
        </div>

        <!-- Analyses -->
        <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 
          transition-all duration-300 backdrop-blur-sm group">
          <div class="mb-4">
            <svg class="w-8 h-8 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-white text-xl font-semibold mb-3 group-hover:text-cyan-500 transition-colors">
            Analyses détaillées
          </h3>
          <p class="text-slate-400">
            Suivez la progression de vos projets avec des tableaux de bord personnalisables.
          </p>
        </div>

        <!-- Temps -->
        <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-orange-500/50 
          transition-all duration-300 backdrop-blur-sm group">
          <div class="mb-4">
            <svg class="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-white text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors">
            Gestion du temps
          </h3>
          <p class="text-slate-400">
            Optimisez la gestion du temps avec nos outils de suivi et de reporting.
          </p>
        </div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full -z-10" aria-hidden="true">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectLanding'
}
</script>