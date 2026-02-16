<script setup>
    import {getPokemonById} from "../main.js";

    const props = defineProps(['object'])

    function toggleCatch(event) {

        if (event.target.id === "caught") {
            event.target.id = "uncaught";
        } else {
            event.target.id = "caught";
        } 
    }

    const urlArray = String(props.object.pokemon_species.url).split("/");
    const nationalID = urlArray[urlArray.length-2];
    
    // const pokemon = await getPokemonById(nationalID);
    
    // const icon = pokemon.sprites.versions['generation-vii'].icons.front_default
    const iconDex = `dex${nationalID}`
    
    
</script>

<template>

    <sprite id="listitem">
        <sprite id="uncaught" @click="(event) => toggleCatch(event)"></sprite>
        <p id="dexNumber">{{ String(props.object.entry_number).padStart(3, "0") }}</p>
        <p id="name">{{ props.object.pokemon_species.name }}</p>

        <icon :id="iconDex"></icon>
        <!-- <img :src="icon"> -->

        
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
        position: absolute;

        color: #dedede;
        font-family: 'bw2text';
        font-size: 32px;
        text-shadow: 0px 2px #848484;

        margin-block-start: 0;
        margin-inline-start: 0;

        margin: 0px;

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
