<template>
  <div class="flex items-center justify-center  ">
    <!-- Form Section -->
    <div class="max-w-lg w-full bg-gray-100 rounded-lg shadow-lg p-8">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Inscrivez-vous ici</h1>
      </div>
      <form>
        <!-- Prénom -->
        <div class="mb-4">
          <label for="prenom" class="block text-sm font-medium text-gray-700">Prénom</label>
          <input
              type="text"
              id="prenom"
              placeholder="Jean"
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Nom -->
        <div class="mb-4">
          <label for="nom" class="block text-sm font-medium text-gray-700">Nom</label>
          <input
              type="text"
              id="nom"
              placeholder="Dupont"
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Numéro -->
        <div class="mb-4">
          <label for="numero" class="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
          <input
              type="tel"
              id="numero"
              placeholder="06 12 34 56 78"
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Adresse email</label>
          <input
              type="email"
              id="email"
              placeholder="vous@email.com"
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Mot de passe -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
              type="password"
              id="password"
              placeholder="********"
              class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Submit Button -->
        <div>
          <button
              type="submit"
              class="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
    <!-- End Form Section -->
  </div>
</template>

<script setup lang="ts">
</script>
