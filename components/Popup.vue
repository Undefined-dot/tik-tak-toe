<template>
    <div v-if="winnerX || winnerO || draw" class="popupwinner">
        <div v-if="winnerX" class="popcontainer">
            <h1>The winner is</h1>
            <div>
                <img src="/public/crossx.svg" width="200" height="200" alt="cross" />
            </div>
            <Button @click="reload" text="OK" />
        </div>
        <div v-else-if="winnerO" class="popcontainer">
            <h1>The winner is</h1>
            <div>
                <img src="/public/ellipse.svg" width="150" height="150" alt="cross" />
            </div>
            <Button @click="reload" text="OK" />
        </div>
        <div v-else-if="draw" class="popcontainer">
            <h1>DRAW!</h1>
            <div style="display: flex; align-items: center; justify-content: center;">
                <img src="/public/crossx.svg" width="200" height="200" alt="cross" />
                <img src="/public/ellipse.svg" width="150" height="150" alt="cross" />
            </div>
            <Button @click="reload" text="OK" />
        </div>
    </div>
</template>

<script setup lang="ts">
// importation

import Button from './Button.vue';

// Déclaration des props dans un seul appel
defineProps({
    winnerX: {
        type: Boolean,
        required: true,
    },
    winnerO: {
        type: Boolean,
        required: true,
    },
    draw: {
        type: Boolean,
        required: true,
    },
});

function reload () {
    window.location.reload();
}

</script>


<style>
    .popupwinner {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom:0;
        z-index: 1;
        background-color: rgba(0, 0, 0, .3);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popcontainer{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width:100%;
        max-width: 390px;
        height: 390px;
        background-color: #e0e0e0;
        border-radius: 24px;
        text-align: center;
        font-size: 1.5rem;
        padding: 0 32px;
        color: var(--secondary);
    }
    .popcontainer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

