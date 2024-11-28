<template>
  <Navbar/>
  <HomePage msg="Accueil"/>
</template>

<script>
import HomePage from './components/HomePage.vue'
import Navbar from './components/ui/NavBar.vue'
import './assets/main.css'
import 'preline/dist/preline.js';

export default {
  name: 'App',
  components: {
    HomePage,
    Navbar
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>