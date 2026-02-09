<script setup>

  import "./components/sprite.js";
  import './style.css';

  import pokemonList from "./components/pokemonList.vue";

  

</script>

<template>


  <sprite id="chevron_pattern"></sprite>

  <Suspense>
    <pokemonList></pokemonList>
  </Suspense>
  
  
  

</template>

<style scoped>
  
</style>
