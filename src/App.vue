<script setup>
  import { ref } from 'vue'

  import "./components/sprite.js";

  import listItem from "./components/listItem.vue";

  import './style.css';

  const posts = ref([
    { id: 1, dexNumber: 1, title: 'Bulbasaur' },
    { id: 2, dexNumber: 2, title: 'Ivysaur' },
    { id: 3, dexNumber: 3, title: 'Venusaur' }
  ]);


import { GameClient, POKEDEXES } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum

(async () => {
  const api = new GameClient(); // create a GameClient

  await api
    .getPokedexById(POKEDEXES.NATIONAL)
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
})();
</script>

<template>

  <listItem
  	v-for="post in posts"
	  :key="post.id"
    :dexNumber="post.dexNumber"
  	:name="post.title"
	></listItem>

  <sprite id="chevron_pattern"></sprite>
</template>

<style scoped>
  
</style>
