<script setup>
defineProps(['title'])
</script>

<template>

    <div class="holder">
        <div></div>
        <div></div>
        <div></div>
        <div><p>{{ title }}</p></div>
        <div></div>
    </div>


</template>

<style scoped>
    .holder {
        display: flex;
        height: 42px;

        margin-bottom: 6px;
    }

    .holder div {
        height: inherit;

        background-image: url('../assets/spritesheetLarge.png');
        background-size: 1024px 768px;

        image-rendering: crisp-edges;
    }

    .holder div:nth-child(1) {
        width: 14px;
        
        background-position: 0px -224px;
    }

    .holder div:nth-child(2) {
        width: 38px;

        background-color: #181818;
        background-image: none;
    }

    .holder div:nth-child(3) {
        width: 12px;
        
        background-position: -18px -224px;
    }

    .holder div:nth-child(4) {
        width: 224px;

        background-color: #181818;
        background-image: none;


        
    }

    .holder div:nth-child(5) {
        width: 14px;
        
        background-position: -34px -224px;
    }

    p {
        color: #dedede;
        font-family: 'bw2text';
        font-size: 32px;
        text-shadow: 0px 2px #848484;

        display: block;
        margin-block-start: 0;
        margin-inline-start: 0;

        margin-top: 10px;
        margin-left: 32px;
    }
</style>
