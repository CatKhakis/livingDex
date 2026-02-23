<script setup>

    import { ref } from 'vue'

    import { GameClient, LocationClient } from 'pokenode-ts'; // import the GameClient and the Pokedexes enum
    const api = new LocationClient(); // create a GameClient

    const props = defineProps(['object'])

    const location = await api.getLocationByName(props.object.name)
    const name = ref();

    const grassDisplay = ref('hidden');
    const surfDisplay = ref('hidden');
    const fishDisplay = ref('hidden');

    for (const nameData of location.names) {

        if (nameData.language.name === 'en') {
            name.value = nameData.name;
        }
    }

    // for (const area of location.areas) {

    //     const areaDetail = await api.getLocationAreaByName(area.name);

    //     console.log(areaDetail);
    // }

    if (location.areas.length > 0) {

        for (const area of location.areas) {
            const areaData = await api.getLocationAreaByName(area.name)
            
            for (const encounter of areaData.encounter_method_rates) {
                
                switch(encounter.encounter_method.name) {
                    case 'rock-smash':
                    case 'dark-grass':
                    case 'walk':
                        grassDisplay.value = '';
                        break;

                    case 'surf':
                        surfDisplay.value = '';
                        break;

                    case 'super-rod':
                    case 'old-rod':
                    case 'good-rod':
                        fishDisplay.value = '';
                        break;

                    default:
                        console.log(encounter.encounter_method.name);
                }
            }

            if (areaData.encounter_method_rates.length === 0) {
                console.log(areaData);
            }
        }
    }

    

    // if (props.object.encounters.length > 0) {

    //     //console.log(name.value);
        
    //     for (const encounter of props.object.encounters) {

    //         for (const detail of encounter.areaObject.version_details) {

    //             if (detail.version.name === 'black' || detail.version.name === 'white') {
                    
    //                 for (const encounter_detail of detail.encounter_details) {

    //                     //console.log(`${encounter.dexID} ${encounter_detail.method.name}`)

    //                     if (encounter.dexID === '632') {
    //                         console.log(encounter);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    

</script>

<template>
    <div id="Habitat">
        <div id="Habitat_main">
            <sprite id="habitat_grass" :class="grassDisplay">
                <sprite id="habitat_seen"></sprite>
                <sprite id="habitat_caught"></sprite>
            </sprite>
            <sprite id="habitat_surf" :class="surfDisplay">
                <sprite id="habitat_seen"></sprite>
                <sprite id="habitat_caught"></sprite>
            </sprite>
            <sprite id="habitat_fish" :class="fishDisplay">
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

        <p>{{ name }}</p>
        <!-- <p>{{ props.object.encounters }}</p> -->
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

        min-height: calc(var(--scale) * 23px);

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
        top: calc(var(--scale) * 6px);
        left: calc(var(--scale) * 58px);
    }

    .hidden {
        display: none;
    }
    
</style>
