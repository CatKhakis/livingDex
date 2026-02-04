<script setup>
    defineProps(['dexNumber', 'name'])

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
        <p id="dexNumber">{{ String(dexNumber).padStart(3, "0") }}</p>
        <p id="name">{{ name }}</p>
        
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
</style>
