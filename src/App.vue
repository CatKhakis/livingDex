<script setup>

  import './style.css';

  import "./scripts/sprite.js";
  import "./scripts/icon.js";

  import { ref } from 'vue'

  import pokemonList from "./components/pokemonList.vue";
  import dexList from "./components/dexList.vue";
  import habitat from "./components/habitat.vue";

  const selectedDex = ref({'name': 'National'});

  function updateDex(dex) {
    selectedDex.value = dex;
  }
  
</script>

<template>

  <!-- <sprite id="chevron_pattern"></sprite> -->

  <habitat></habitat>

  <Suspense>
    <dexList @update-dex="updateDex"></dexList>
  </Suspense>

  <Suspense>
    <div id="pokemonList"><pokemonList :dex="selectedDex"></pokemonList></div>
  </Suspense>

  

</template>

<style scoped>

#chevron_pattern {
  background-repeat: repeat-x;
  width: 100%;
  left: 0px;
  top: 50px;
  position: absolute;

  overflow: hidden;
}

#pokemonList {
  overflow: scroll;
}


  
</style>
