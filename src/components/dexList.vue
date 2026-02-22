<script setup>

    import arrowButton from "./arrowButton.vue";
    import leftButton from "./leftButton.vue";
    import { ref } from 'vue'

    import { GameClient, LocationClient } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum
    const api = new LocationClient(); // create a GameClient

    const regionList = await api.listRegions();
    const dexList = ref({'dexes': [{'name': 'National', 'url': 'https://pokeapi.co/api/v2/pokedex/1/'}]});

    //loads each individual region (includes dex info) and overwrites corresponding simple region info
    for(const region in regionList.results) {

        regionList.results.splice(region, 1, await api.getRegionByName(regionList.results[region].name))
    }

    const selectedRegion = ref();

    function updateRegion(region) {

        selectedRegion.value = region.name;
        
        dexList.value.dexes.splice(1);
        dexList.value.dexes = dexList.value.dexes.concat(region.pokedexes)

        document.getElementById('regionList').style.setProperty('display', 'none');
        document.getElementById('arrowButton').style.setProperty('display', 'block');
    }

    function reset() {

        selectedRegion.value = '';
        dexList.value.dexes.splice(1);
        document.getElementById('regionList').style.setProperty('display', 'block');
        document.getElementById('arrowButton').style.setProperty('display', 'none');
    }
</script>

<template>

    <div id="dexSelector">

        <arrowButton :text="selectedRegion" @click="reset"></arrowButton>

        <div id="regionList" >

            <leftButton
                v-for="region in regionList.results"
                @click="updateRegion(region)"
                :text="region.name.charAt(0).toUpperCase() + region.name.slice(1)">
            </leftButton>
        </div>

        <div id="dexList">

            <leftButton
                v-for="dex in dexList.dexes"
                @click="$emit('updateDex', dex)"
                :text="dex.name">>
            </leftButton>
        </div>
    </div>

</template>

<style scoped>

    #dexSelector {
        width: calc(var(--scale) * 105px);
        margin-right: 50px;
    }

    #dexList, #regionList {
        width: 100%;
    }

    #regionList {
        margin-bottom: 20px;
    }

    p {
        bottom: calc(var(--scale) * 4px);
        left: calc(var(--scale) * 2px);

        pointer-events: none;
    }

</style>