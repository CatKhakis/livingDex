<script setup>

  import { ref } from 'vue'

  import './style.css';

  import "./scripts/sprite.js";
  import "./scripts/icon.js";

  import { GameClient, LocationClient } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum
  const gameAPI = new GameClient(); // create a GameClient
  const locationAPI = new LocationClient(); // create a GameClient

  import dexList from "./components/dexList.vue";
  import habitat from "./components/habitat.vue";
  import dexEntry from "./components/dexEntry.vue";

  const selectedDex = ref({'name': 'original-unova'});
  const locations = ref([]);
  const pokemon = ref([]);
  const versions = ref([]);

  const locationIndices = [];

  updateDex(selectedDex.value);


  async function updateDex(dex) {
    selectedDex.value = dex;

    pokemon.value = await gameAPI.getPokedexByName(selectedDex.value.name);
    versions.value = (await gameAPI.getVersionGroupByName(pokemon.value.version_groups[0].name)).versions;

    updateLocations(dex);
  }

  async function updateLocations(dex) {
    const fullDex = await gameAPI.getPokedexByName(dex.name);

    if (fullDex.region) {
      locations.value = (await locationAPI.getRegionByName(fullDex.region.name)).locations;

      for (const location of locations.value) {
        //location.encounters;
        

        for (const index of locationIndices) {

          if(!location.encounters) {
            location.encounters = [];
          }

          if (index.areaObject.location_area.name.includes(location.name)) {
            location.encounters.push(index);
          }
        }
      }
    }
  }


  function forwardArea(id, area) {
    locationIndices.push({'dexID': id, 'areaObject': area});
    //console.log(id);
    //console.log(area);
    //console.log(await locations.value);
    //console.log(locationIndices);
  }
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
    <div id="pokemonList">
      <dexEntry
        v-for="pokemon in pokemon.pokemon_entries"
        :key="pokemon.pokemon_species.url.substring(42).replace(/\/$/, '')"
        :object="pokemon"
        :versions="versions"
        @area="forwardArea"
      ></dexEntry>
  </div>
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
