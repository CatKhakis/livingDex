<script setup>

  import './style.css';

  import "./scripts/sprite.js";
  import "./scripts/icon.js";

  import { GameClient, LocationClient } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum
  const gameAPI = new GameClient(); // create a GameClient
  const locationAPI = new LocationClient(); // create a GameClient

  import { ref } from 'vue'

  import pokemonList from "./components/pokemonList.vue";
  import dexList from "./components/dexList.vue";
  import habitat from "./components/habitat.vue";

  const selectedDex = ref({'name': 'original-unova'});

  async function updateDex(dex) {
    selectedDex.value = dex;

    updateLocations(dex);
  }

  async function updateLocations(dex) {
    const fullDex = await gameAPI.getPokedexByName(dex.name);

    if (fullDex.region) {
      locations.value = (await locationAPI.getRegionByName(fullDex.region.name)).locations;
    }
  }

  updateLocations(selectedDex.value);

  const locations = ref([]);
  
</script>

<template>

  <!-- <sprite id="chevron_pattern"></sprite> -->

  <Suspense>
    <div id="habitatList">
      <habitat 
        v-for="location in locations"
        :key="location.name"
        :object="location">
      </habitat>
    </div>
  </Suspense>
  

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

#pokemonList, #habitatList {
  overflow: scroll;
}

#habitatList {
  display: flex;
  flex-direction: column;
}


  
</style>
