<script setup>

  import './style.css';

  import "./components/sprite.js";
  import "./components/icon.js";

  import pokemonList from "./components/pokemonList.vue";
  import dexList from "./components/dexList.vue";
  
</script>

<template>

  <!-- <sprite id="chevron_pattern"></sprite> -->

  <Suspense>
    <dexList></dexList>
  </Suspense>

  <Suspense>
    <div id="pokemonList"><pokemonList></pokemonList></div>
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
