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

        display: none;
    }

    p {
        bottom: calc(var(--scale) * 4px);
        left: calc(var(--scale) * 8px);

        pointer-events: none;
    }
    
</style>
