<script setup>

    import arrowButton from "./arrowButton.vue";
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
    }

    function reset() {

        selectedRegion.value = '';
        dexList.value.dexes.splice(1);
        document.getElementById('regionList').style.setProperty('display', 'block');
    }
</script>

<template>

    <div id="dexSelector">

        <arrowButton :text="selectedRegion" @click="reset"></arrowButton>

        <div id="regionList" >

            <sprite id="list" 
                v-for="region in regionList.results"
                @click="updateRegion(region)">

                <p>{{ region.name.charAt(0).toUpperCase() + region.name.slice(1) }}</p>
            </sprite>
        </div>

            <div id="dexList">

                <sprite id="list" 
                    v-for="dex in dexList.dexes"
                    @click="$emit('updateDex', dex)">
                    
                    
                    <p>{{ dex.name }}</p>
                </sprite>
            </div>
    </div>

</template>

<style scoped>

    #dexList, #regionList {
        margin-right: 50px;
    }

    #dexList sprite, #regionList sprite {
        margin-bottom: calc(var(--scale) * 1px);
        position:relative;
    }

    #regionList {
        margin-bottom: 20px;
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