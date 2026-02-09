import './style.css';

import { createApp } from 'vue'
import App from './App.vue'

import { PokemonClient, GameClient, POKEDEXES } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum

console.log(await getPokedex(POKEDEXES.ORIGINAL_UNOVA));

export async function getPokedex(dex) {
    const api = new GameClient(); // create a GameClient

    return await api.getPokedexById(dex);
};

export async function getPokemonById(pokemonName) {
    const api = new PokemonClient(); // create a GameClient

    return await api.getPokemonById(pokemonName);
};


createApp(App).mount('#app')

import './assets/B2.sav';

const response = await fetch(require('./assets/B2.sav'));
let bytes = await response.bytes();

// byteArray();

//console.log(bytes.toHex())

async function byteArray() {
    const hexView = document.querySelector("#hexView");
    const textView = document.querySelector("#textView");

    let row = 0;
    let rowDiv = document.createElement("div");
    rowDiv.classList.add('byteRow');

    let rowDiv_text = document.createElement("div");
    rowDiv_text.classList.add('byteRow');

    for (let i = 0; i < 2000; i++) {

        let byteDiv = document.createElement("div");
        let textDiv = document.createElement("div");

        byteDiv.classList.add('byteDiv');
        textDiv.classList.add('charDiv');

        let byte = document.createElement("p");
        let text = document.createElement("p");

        byte.innerText = bytes[i].toString(16).padStart(2, '0').toUpperCase();
        byte.classList.add('byteText');

        
        text.innerText = String.fromCharCode(bytes[i].toString(10));
        text.classList.add('byteText');

        if (bytes[i] === 0) {
            byte.classList.add('empty');
        }

        byteDiv.appendChild(byte);
        rowDiv.appendChild(byteDiv);

        textDiv.appendChild(text);
        rowDiv_text.appendChild(textDiv);

        row++;

        if ((row + 8) % 16 === 0) {
            let byteDiv = document.createElement("div");
            byteDiv.classList.add('byteDiv');
            rowDiv.appendChild(byteDiv);
        }

        if (row % 16 === 0) {

            hexView.appendChild(rowDiv);
            rowDiv = document.createElement("div");
            rowDiv.classList.add('byteRow');

            textView.appendChild(rowDiv);
            rowDiv_text = document.createElement("div");
            rowDiv_text.classList.add('byteRow');
        }

        hexView.appendChild(rowDiv);
        textView.appendChild(rowDiv_text);
    }
}

/*
const response = await fetch(require('./B2.sav'));
const textFile = await response.bytes();
const string = new TextDecoder().decode(textFile);
console.log(string);

const saveBytes = new Uint8Array('B2.sav')
console.log(saveBytes);

const float32 = new Float32Array(await saveFile);

console.log(await float32);
*/

