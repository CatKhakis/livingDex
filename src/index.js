import printMe from './print.js';

import './style.css';


const Pokedex = require("pokeapi-js-wrapper")
const customOptions = {
  cache: true,
  timeout: 5 * 1000, // 5s
  cacheImages: true
}
const pokedex = new Pokedex.Pokedex(customOptions)


const gridContainer = document.createElement('div');
gridContainer.id = 'gridContainer';



function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = 'pogeymon';
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());
document.body.appendChild(gridContainer);


pokedex.getPokedexsList()
    .then(function(response) {
        console.log(response);
    }
)

pokedex.getPokedexByName("updated-unova")
    .then(async function(response) {

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

            let id = url.substring(0, url.length - 1)
            id = id.substring(id.lastIndexOf('/') + 1);

            idText.innerHTML = id;

            const img = document.createElement('img');
            img.classList.add('gridSprite');

            topInfo.appendChild(idText);
            topInfo.appendChild(indexHolder);

            pokemon.appendChild(topInfo);
            
            pokemon.appendChild(img);
            gridContainer.appendChild(pokemon);

            pokedex.getPokemonByName(id)
                .then(function(response) {

                    img.src = response.sprites.front_default;
                }
            )
        }
    }
)