import printMe from './print.js';

import './style.css';
import './B2.sav';

const response = await fetch(require('./B2.sav'));
let bytes = await response.bytes();

byteArray();

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




const Pokedex = require("pokeapi-js-wrapper")
const customOptions = {
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true
}
const pokedex = new Pokedex.Pokedex(customOptions)

const gridContainer = document.querySelector("#gridContainer");
const pokedexSelect = document.querySelector("#pokedexSelect");



pokedex.getPokedexsList()
    .then(function(response) {

        for (const dex of response.results) {

            let selectItem = document.createElement("option");
            selectItem.value = dex.name;
            selectItem.innerHTML = dex.name;
            pokedexSelect.appendChild(selectItem);
        }
    }
)

pokedexSelect.addEventListener('change', function (e) { 

    pokedex.getPokedexByName(e.target.selectedOptions[0].value)
        .then(function(response) {updateDex(response)})
});


pokedex.getPokedexByName("updated-unova")
    .then(function(response) {updateDex(response)})



async function updateDex(response) {

    gridContainer.innerHTML = '';

    for (const entry of response.pokemon_entries) {

        let name = entry.pokemon_species.name;
        let url = entry.pokemon_species.url;

        const pokemon = document.createElement('div');
        pokemon.classList.add('pokemonTile');

        const topInfo = document.createElement('div');
        topInfo.classList.add('topInfo');
        
        const idText = document.createElement('div');
        idText.classList.add('idText');

        const indexHolder = document.createElement('div');
        indexHolder.classList.add('indexHolder');

        const catchDiv = document.createElement('div');
        catchDiv.classList.add("catchDiv");

        const catchIndicator = document.createElement('div');
        catchIndicator.classList.add('catchIndicator');

        if (getRndInteger(0, 1) === 1) {
            catchIndicator.classList.add('caught');
        }

        catchIndicator.addEventListener('click', function(event) {updateCatch(event)});


        let id = url.substring(0, url.length - 1)
        id = id.substring(id.lastIndexOf('/') + 1);

        idText.innerHTML = id;

        const img = document.createElement('img');
        img.classList.add('gridSprite');

        topInfo.appendChild(idText);
        topInfo.appendChild(indexHolder);

        pokemon.appendChild(topInfo);
        
        catchDiv.appendChild(catchIndicator);
        
        pokemon.appendChild(catchDiv);
        pokemon.appendChild(img);
        gridContainer.appendChild(pokemon);

        pokedex.getPokemonByName(id)
            .then(function(response) {

                img.src = response.sprites.front_default;
            }
        )
    }
}

function updateCatch(event) {

    const target = event.target;

    if (target.classList[1]) {
        target.classList.remove("caught");
    } else {
        target.classList.add("caught");
    }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}