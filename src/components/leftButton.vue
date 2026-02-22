<script setup>

    const props = defineProps(['text']);
    
</script>

<template>

    <div class="leftButton">

        <sprite id="list">
            <p>{{ props.text }}</p>
        </sprite>

        <sprite id="list-cap"></sprite>
    </div>

</template>

<style scoped>

    .leftButton {
        display: flex;
        flex-direction: row;

        margin-bottom: calc(var(--scale) * 1px);
    }

    #list {
        width: 100%;
        background-repeat: repeat-x;
        position:relative;

        overflow: hidden;
    }

    p {
        bottom: calc(var(--scale) * 4px);
        left: calc(var(--scale) * 8px);

        pointer-events: none;
    }

    
    
</style>
