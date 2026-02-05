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

        // if (getRndInteger(0, 1) === 1) {
        //     catchIndicator.classList.add('caught');
        // }

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

                console.log(response);

                //img.src = response.sprites.front_default;
                //img.src = response.sprites.versions['generation-v']['black-white'].animated.front_default;
                img.src = response.sprites.versions['generation-viii']['icons'].front_default;
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