<script setup>

    import { ref, watch } from 'vue'
    import listItem from "./listItem.vue";

    import { GameClient } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum
    const api = new GameClient(); // create a GameClient

    const props = defineProps(['dex']);

    const pokemon = ref(await api.getPokedexByName(props.dex.name));

    watch(props, async () => {
        pokemon.value = await api.getPokedexByName(props.dex.name)
    })
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