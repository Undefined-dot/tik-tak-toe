<script setup lang="ts">
import Button from '~/components/Button.vue';

let gameMode = ref("")
let copied = ref(true)
let show = ref(false)

function modifygamemode (event: Event) {
    let target = event.target as HTMLInputElement

    if (target) {
        gameMode.value = target.value
    }
}

function handleClick () {
    if (gameMode.value === "friends") {
        show.value = true
    }
}

function copy () {
    copied.value = true
}

</script>

<template>
        <div class="popupwinner" v-if="show">
                <div class="popcontainer">
                        <h1>Invite your friends</h1>
                        <div @click="copy()" class="invitation">
                            <div class="">

                            </div>
                            <div @click="copy()">
                                <img :style="{ display: copied === false ? 'none' : ''}" src="/public/copy.svg" alt="">
                                <img :style="{ display: copied === true ? 'none' : ''}" src="/public/check.svg" alt="">
                            </div>
                        </div>
                </div>
        </div>
        <div class="container">
                <h1>Select game mode</h1>

                <div class="wrapper">
                    <div :style="{background: gameMode === 'ai' ? '#4B6A86' : '#39BBD3'}">
                        <input @change="modifygamemode($event)" type="radio" name="game" value="ai" id="">
                        <p>with AI</p>
                    </div>

                    <div :style="{background: gameMode === 'friends' ? '#4B6A86' : '#39BBD3'}">
                        <input @change="modifygamemode($event)" type="radio" name="game" value="friends" id="">
                        <p>with Friends</p>
                    </div>

                    <div :style="{background: gameMode === 'online' ? '#4B6A86' : '#39BBD3'}">
                        <input @change="modifygamemode($event)" type="radio" name="game" value="online" id="">
                        <p>Online</p>
                    </div>

                    <div :style="{background: gameMode === 'passtoplay' ? '#4B6A86' : '#39BBD3'}">
                        <input @change="modifygamemode($event)" type="radio" name="game" value="passtoplay" id="">
                        <p>Pass to Play</p>
                    </div>
                </div>

                <Button @click="handleClick()" style="width: 416px;" text="Play" />
        </div>
</template>

<style>
    .container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .container h1{
        margin-bottom: 24px;
        color: var(--secondary);
    }
    .wrapper {
        width: 416px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 16px;
        place-content: center;
        place-items: center;
        margin-bottom: 24px;
    }
    .wrapper div {
        width: 200px;
        height: 200px;
        border-radius: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        color: #fff;
        cursor: pointer;
    }
    .wrapper div input {
        position: absolute;
        padding: 0 32px;
        font-size: 24px;
    }
    input {
        width: 200px;
        height: 200px;
        opacity: 0;
    }
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
        
        color: var(--secondary);
    }
    .popcontainer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .invitation {
        width: 100%;
        height: 50px;
        overflow: auto;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }
</style>