<script setup>

    import { ref } from 'vue'

    import { GameClient, LocationClient } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum
    const api = new LocationClient(); // create a GameClient

    const props = defineProps(['object'])

    const location = await api.getLocationByName(props.object.name)
    const name = ref();

    const encounters = ref([]);

    const grassDisplay = ref('hidden');
    const surfDisplay = ref('hidden');
    const fishDisplay = ref('hidden');
    const specialDisplay = ref('hidden');

    for (const nameData of location.names) {

        if (nameData.language.name === 'en') {
            name.value = nameData.name;
        }
    }

    if (location.areas.length > 0) {

        for (const area of location.areas) {
            const areaData = await api.getLocationAreaByName(area.name)

            for (const encounter of areaData.pokemon_encounters) {

                encounters.value.push(encounter);
            }
        }
    }

    for (const encounter of encounters.value) {

        for (const detail of encounter.version_details) {
            
            for (const encounterDetail of detail.encounter_details)

            switch(encounterDetail.method.name) {
                case 'bridge-spots':
                case 'cave-spots':
                case 'grass-spots':
                case 'rock-smash':
                case 'dark-grass':
                case 'walk':
                    grassDisplay.value = '';
                    break;

                case 'surf-spots':
                case 'surf':
                    surfDisplay.value = '';
                    break;

                case 'super-rod-spots':
                case 'super-rod':
                case 'old-rod':
                case 'good-rod':
                    fishDisplay.value = '';
                    break;

                case 'gift':
                case 'gift-egg':
                case 'only-one':
                    specialDisplay.value = '';
                    break;

                default:
                    console.log(encounterDetail.method.name);
            }
        }
    }
    

</script>

<template>
    <div id="Habitat">
        <div id="Habitat_main">
            <sprite id="habitat_grass" :class="grassDisplay" class="habitatIndicator">
                <sprite id="habitat_seen"></sprite>
                <sprite id="habitat_caught"></sprite>
            </sprite>
            <sprite id="habitat_surf" :class="surfDisplay" class="habitatIndicator">
                <sprite id="habitat_seen"></sprite>
                <sprite id="habitat_caught"></sprite>
            </sprite>
            <sprite id="habitat_fish" :class="fishDisplay" class="habitatIndicator">
                <sprite id="habitat_seen"></sprite>
                <sprite id="habitat_caught"></sprite>
            </sprite>
            <sprite id="habitat_special" :class="specialDisplay" class="habitatIndicator">
                <sprite id="habitat_seen"></sprite>
                <sprite id="habitat_caught"></sprite>
            </sprite>
            <sprite id="habitat">
                <p>{{ name }}</p>
                <sprite id="habitat_completed"></sprite>
            </sprite>

            
        </div>

        <sprite id="habitatSelect_left" class="habitatSelect"></sprite>
        <sprite id="habitatSelect_right" class="habitatSelect"></sprite>
        <!-- <p>{{ props.object.encounters }}</p> -->
    </div>


</template>

<style scoped>

    .habitatSelect {
        position: absolute;

        top: 0;
        display: none;
    }

    #habitatSelect_right {
        right: 0;
    }

    #habitatSelect_left {
        
        left: calc(var(--scale) * -5px);
    }

    #Habitat:hover {
        .habitatSelect {
            display: block;
        }
        #habitat_seen {
            display: none;
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
/* 
        width: calc(var(--scale) * 190px); */
        width: fit-content;
        height: calc(var(--scale) * 23px);

        min-height: calc(var(--scale) * 23px);

        div {
            display: flex;
            /* position: absolute; */
            justify-content: flex-end;
        }

        #habitat {
            position:relative;
            margin-left: calc(var(--scale) * -5px);
            margin-right: calc(var(--scale) * 5px);
        }
    }

    #Habitat_main {
        display: flex;
        padding-top: calc(var(--scale) * 1px);
        padding-left: calc(var(--scale) * 3px);

        .habitatIndicator {
            position: relative;
            width: calc(var(--scale) * 21px);
            margin-left: calc(var(--scale) * -5px);
        }
    }


    #habitat_completed {
        display: none;
        left: calc(var(--scale) * 85px);
        top: calc(var(--scale) * 1px);

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
        top: calc(var(--scale) * 5px);
        left: calc(var(--scale) * 7px);
    }

    #habitat_caught, #habitat_seen, #habitat_completed {
        position: absolute;
    }

    .hidden {
        display: none;
    }
    
</style>
