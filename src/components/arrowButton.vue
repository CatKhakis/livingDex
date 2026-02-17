<script setup>

    const props = defineProps(['text']);
    
</script>

<template>

    <sprite id="arrowButton">
        <p>{{ props.text }}</p>
    </sprite>

</template>

<style scoped>

    #arrowButton {
        margin-right: 25px;
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
        left: calc(var(--scale) * 8px);

        pointer-events: none;
    }
    
</style>
