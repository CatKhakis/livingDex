<script setup>

    import { ref } from 'vue'

    import { GameClient, LocationClient } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum
    const api = new LocationClient(); // create a GameClient

    const regions = await api.listRegions();
    const fullRegions = [];

    //console.log(regions.results)

    // for (const region of regions.results) {
    //     fullRegions.push(await api.getRegionByName(region.name));
    // }

    console.log(fullRegions);

    const selectedRegion = ref();

    function update(event) {
        if (event) {
            selectedRegion.value = event.target.children[0].innerHTML;
        }
    }
    

</script>

<template>

    <div id="dexList">

        <sprite id="list"><p>National</p></sprite>

        <sprite id="list" 
            @click="update"
            v-for="region in regions.results">

            <p>{{ region.name.charAt(0).toUpperCase() + region.name.slice(1) }}</p>
        </sprite>

        <p>{{ selectedRegion }}</p>
    </div>
    <!-- <listItem
        v-for="pokemon in pokemon.pokemon_entries"
        :key="pokemon.entry_number"
        :object="pokemon"
    ></listItem> -->

</template>

<style scoped>

    #dexList {
        margin-right: 50px;
    }

    #dexList sprite {
        margin-bottom: calc(var(--scale) * 1px);
        position:relative;
    }

    p {
        position: absolute;

        color: #dedede;
        font-family: 'bw2text';
        font-size: 32px;
        text-shadow: 0px 2px #848484;

        margin-block-start: 0;
        margin-inline-start: 0;

        margin: 0px;

        bottom: calc(var(--scale) * 4px);
        left: calc(var(--scale) * 2px);

        pointer-events: none;
    }

</style>