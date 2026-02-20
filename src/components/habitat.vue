<script setup>
    
</script>

<template>
    <div id="Habitat">
        <div id="Habitat_main">
            <sprite id="habitat_grass">
                <sprite id="habitat_seen"></sprite>
                <sprite id="habitat_caught"></sprite>
            </sprite>
            <sprite id="habitat_surf">
                <sprite id="habitat_seen"></sprite>
                <sprite id="habitat_caught"></sprite>
            </sprite>
            <sprite id="habitat_fish">
                <sprite id="habitat_seen"></sprite>
                <sprite id="habitat_caught"></sprite>
            </sprite>
            <sprite id="habitat"></sprite>

            <sprite id="habitat_completed"></sprite>
        </div>

        <div id="Habitat_selected">
            <sprite id="habitatSelect_left"></sprite>
            <sprite id="habitatSelect_right"></sprite>
        </div>

        <p>Route 20</p>
    </div>


</template>

<style scoped>

    #Habitat_selected sprite {
        display: none;
    }

    #Habitat:hover {
        #Habitat_selected sprite {
            display: block;
        }
        #habitat_caught {
            display: block;
        }
        #habitat_completed {
            display: block;
        }
    }

    #Habitat {
        position:relative;

        width: calc(var(--scale) * 190px);
        height: calc(var(--scale) * 23px);

        div {
            display: flex;
            position: absolute;
        }

        sprite {
            position: absolute;
        }
    }

    #Habitat_main {
        display: flex;
        padding-top: calc(var(--scale) * 1px);
        padding-left: calc(var(--scale) * 3px);

        #habitat_surf {
            left: calc(var(--scale) * 19px);
        }

        #habitat_fish {
            left: calc(var(--scale) * 35px);
        }

        #habitat {
            left: calc(var(--scale) * 51px);
        }
    }


    #habitat_completed {
        display: none;
        left: calc(var(--scale) * 133px);
        top: calc(var(--scale) * 2px);

    }

    #habitatSelect_right {
        left: calc(var(--scale) * 180px);
    }

    #habitat_seen, #habitat_caught {
        top: calc(var(--scale) * 6px);
        left: calc(var(--scale) * 4px);
    }

    #habitat_caught {
        display: none;
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

        top: calc(var(--scale) * 6px);
        left: calc(var(--scale) * 58px);
    }
    
</style>
