<template>
  <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm m-0 mb-10 mt-3">
  <nav class="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
      <a class="sm:order-1 flex-none text-xl font-semibold focus:outline-none focus:opacity-80" href="/">Brand</a>
      <div class="sm:order-3 flex items-center gap-x-2">
        <div class="mt-3 text-center md:text-start md:flex md:justify-end md:items-center">
          <a class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="/projects">
            Connexion
          </a>
        </div>
      </div>
      <div id="hs-navbar-alignment" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2" aria-labelledby="hs-navbar-alignment-collapse">
        <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <RouterLink to="/projects" class="font-medium hover:opacity-80 focus:outline-none">Projets</RouterLink>
            <RouterLink to="/tasks" class="font-medium hover:opacity-80 focus:outline-none">Tâches</RouterLink>
            <RouterLink to="/profile" class="font-medium hover:opacity-80 focus:outline-none">Profil</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

