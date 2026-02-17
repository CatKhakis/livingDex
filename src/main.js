import { createApp } from 'vue'
import App from './App.vue'

import { PokemonClient, GameClient, POKEDEXES } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum

export async function getPokedex(dex) {
    const api = new GameClient(); // create a GameClient

    return await api.getPokedexById(dex);
};

export async function getPokemonById(pokemonName) {
    const api = new PokemonClient(); // create a GameClient

    return await api.getPokemonById(pokemonName);
};

createApp(App).mount('#app');