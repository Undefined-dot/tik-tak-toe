<script setup lang="ts">

   import { usePasstoplay } from '~/Hook/usePasstopass';
   import { useAI } from '~/Hook/useAI';

    const canvas = ref<HTMLCanvasElement>()
    const winnerX = ref(false)
    const winnerO = ref(false)
    const draw = ref(false)
    const scoreX = ref(0)
    const scoreO = ref(0)
    let Play = ref()
    const scoreTacker = ref<any>()

    function Reset () {
        winnerX.value = false
        winnerO.value = false
        draw.value = false
        
        if (canvas.value) {
            Play.value.Draw()
            Play.value.Reset()
            Play.value.resetPlayer()
        }
    }

    function scoreRegister () {
        sessionStorage.setItem("scorex", `${scoreX.value}`)
        sessionStorage.setItem("score0", `${scoreO.value}`)
    }

    function showwinner (victory: any) {
        if (Play.value.checkVictory('X', victory.victorygrid)) {
                winnerX.value = true
                scoreX.value++
        } else if (Play.value.checkVictory('O', victory.victorygrid)) {
                winnerO.value = true
                scoreO.value++
            }
        else if (victory.player.length === 9) {
                draw.value = true
        }
        scoreRegister ()
    }

    watch(scoreTacker, (newValue, oldValue) => {
        const mode = sessionStorage.getItem("mode")

        if (mode === "ai") {
            if (newValue.tours === "playersO") {
                Play.value.gamewithAI() // requette pour charger les donnees
                newValue.tours = "playersX"
            }
            showwinner(newValue)
        } else {
            showwinner(newValue)
        }
    })

    onMounted(() => {
        let sessionx = sessionStorage.getItem("scorex") as string
        let sessiono = sessionStorage.getItem("score0")

        if (sessionx) scoreX.value = parseInt(sessionx)
        if (sessiono) scoreO.value = parseInt(sessiono)

        if (canvas.value) {
            Play.value = new usePasstoplay(
                canvas.value, 
                canvas.value.offsetWidth / 3, 
                canvas.value.offsetWidth / 3,
                100, 80
            )
        }
    })

    definePageMeta({
        //middleware: ["auth"]
    })

</script>

<template>
    <div class="container">
        <canvas class="desktop" @click="($event: MouseEvent) => scoreTacker = Play?.position($event)" ref="canvas" width="390" height="390">

        </canvas>
        <Popup  :winnerX="winnerX"
                :winnerO="winnerO"
                :draw="draw"
                :Reset="Reset"
        />
        <div class="wrapper">
            <h1>Pass to play</h1>
            <div class="container-img">
                <Playerx intColor="#3284D2" extColor="#3284D2" width="200" height="200" />
                <Playero intColor="#e0e0e0" extColor="#39BBD3" width="150" height="150" />
            </div>

            <div class="infoscore" :style="{border: scoreTacker?.turn % 2 === 0 ? '2px solid #3284D2' : '2px solid #e0e0e0'}">
                <div>
                    <Playerx intColor="#3284D2" extColor="#3284D2" width="50" height="50" />
                    <h1></h1>
                </div>
                <h1 class="score">{{ scoreX }}</h1>
            </div>
            <div class="infoscore2" :style="{border: scoreTacker?.turn % 2 === 1 ? '2px solid #39BBD3' : '2px solid #e0e0e0'}">
                <h1 class="score">{{ scoreO }}</h1>
                <div>
                    <Playero intColor="#e0e0e0" extColor="#39BBD3" width="50" height="50" />
                    <h1></h1>
                </div>
            </div>
            <div class="containerButon">
                <Button @click="Reset()" text="Reset">
                </Button>
                <Button @click="Reset()" text="Change mode" />
            </div>
        </div>
    </div>
</template>

<style>
    .container {
        max-width: 1244px;
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100vh;
        background: #e0e0e0;
        margin: auto;
    }

    .wrapper {
        position: relative;
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        color: var(--secondary);
    }

    .container-img {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .infoscore, .infoscore2 {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .infoscore div, .infoscore2 div {
        display: flex;
        align-items: center;
    }

    .infoscore div h1, .infoscore2 div h1 {
        margin-left: 4px;
    }

    .containerButon {
        width: 100%;
        gap:16px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 24px;
    }

    canvas {
        cursor: pointer;
        box-shadow:  5px 5px 10px #bebebe,
             -5px -5px 10px #ffffff;
    }

    @media screen and (max-width: 940px) {
        .container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column-reverse;
        }
        .wrapper {
            width: 50%;
            margin-bottom: 32px;
        }
        .container-img {
            display: none
        }
        button {
            font-size: 12px;
        }
    }
    @media screen and (max-width: 612px) {
        .wrapper {
            width: 70%;
        }
    }
    @media screen and (max-width:390px) {
        .wrapper {
            width: 100%;
        }
    }
</style>