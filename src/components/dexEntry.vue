<script setup>
    const props = defineProps(['object', 'versions'])
    import { ref } from 'vue';

    import { GameClient, PokemonClient } from 'pokenode-ts';
    const pokemonAPI = new PokemonClient(); // create a GameClient


    const encounterAreas = await pokemonAPI.getPokemonLocationAreaById(props.object.pokemon_species.url.substring(42).replace(/\/$/, ''))

    //saves values to new array. this causes duplicate data to be stored inside each pokemon object. this needs to be fixed.
    const newAreas = [];
    

    if (encounterAreas.length === 0) {

        //pokemon in this criteria must be obtained via evolution or event

    } else {
        for (const area of encounterAreas) {

            if(checkVersion(area.version_details)) {

                newAreas.push(area);
            }
        }
    }

    //removes data inside initial array since only the newAreas array is used. this solves the duplicate data problem but does not feel like a clean solution.
    //possible solution could be adding on the new data to the initial array and then once this is complete deleting all the entries before the new data.
    //Best solution would be culling all unnecessary data and leaving the relevant data.
    encounterAreas.splice(0);

    console.log(props.object.pokemon_species.name);
    console.log(newAreas);


    function checkVersion(details) {
        for (const detail of details) {
            for (const version of props.versions) {

                if (detail.version.name === version.name) {
                    return true;
                }
            }
        }

        return false;
    }

    function toggleCatch(event) {

        if (event.target.id === "caught") {
            event.target.id = "uncaught";
        } else {
            event.target.id = "caught";
        } 
    }
</script>

<template>

    <sprite id="listitem">
        <sprite id="uncaught" @click="(event) => toggleCatch(event)"></sprite>
        <p id="dexNumber">{{ String(props.object.entry_number).padStart(3, "0") }}</p>
        <p id="name">{{ props.object.pokemon_species.name }}</p>

        <icon :id="`dex${props.object.pokemon_species.url.substring(42).replace(/\/$/, '')}`"></icon>
    </sprite>

</template>

<style scoped>
    #listitem {
        display: flex;
        position:relative;
    }

    #listitem sprite {
        position: absolute;
        top: calc(var(--scale) * 4px);
        left: calc(var(--scale) * 41px);
    }

    p {
        top: calc(var(--scale) * 5px);
    }

    #dexNumber {

        left: calc(var(--scale) * 55px);
    }

    #name {

        left: calc(var(--scale) * 84px);
    }

    #listitem {
        margin-bottom: calc(var(--scale) * 3px);
    }

    icon {
        position: absolute;
        width: calc(var(--scale) * 32px);
        height: calc(var(--scale) * 32px);

        top: calc(var(--scale) * -9px);
    }
</style>
