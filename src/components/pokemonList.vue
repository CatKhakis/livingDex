<script setup>

    import { ref } from 'vue'
    import listItem from "./listItem.vue";

    import { GameClient, POKEDEXES } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum
    import {getPokedex} from "../main.js";
    const pokemon = await getPokedex(POKEDEXES.ORIGINAL_UNOVA);
</script>

<template>

    <listItem
        v-for="pokemon in pokemon.pokemon_entries"
        :key="pokemon.entry_number"
        :object="pokemon"
    ></listItem>
</template>

<style scoped>
</style>