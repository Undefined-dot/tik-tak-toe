<script setup lang="ts">
    import { useCanvas } from '~/Hook/useCanvas';
    import { usePasstoplay } from '~/Hook/useCanvas';
    import { playWithAi } from '~/Hook/useCanvas';

    //onst mode = sessionStorage.getItem("mode")
    //const id = sessionStorage.getItem("gameId")
    const canvas = ref<HTMLCanvasElement>()
    const winnerX = ref(false)
    const winnerO = ref(false)
    const draw = ref(false)

    let Play = ref<usePasstoplay>()
    const scoreTacker = ref({})

    onMounted(() => {
        if (canvas.value) {
            Play.value = new playWithAi(
                canvas.value, 
                canvas.value.offsetWidth / 3, 
                canvas.value.offsetWidth / 3,
                100, 80
            )
        }
    })

    const scoreX = ref(0)

    const scoreO = ref(0)

    watch (scoreTacker, (newValue, oldValue) => {
        if (newValue.tours === "AI") {
            setTimeout(() => {
                 Play.value.fetchAI() // requette pour charger les donnees
                newValue.tours = "human"
            }, 3000);
            console.log(newValue.tours)
        }
    })

    /*function score (score: globalThis.Ref<number>, value: string) {
        if (!sessionStorage.getItem(value)) {
                score.value++
                sessionStorage.setItem(value, `${score.value}`);
        } else if(sessionStorage.getItem(value)) {
                let savescore = sessionStorage.getItem(value) as string
                score.value = parseInt(savescore)
                score.value++
                sessionStorage.setItem(value, `${score.value}`);
        }
    }

    function Reset () {
        sessionStorage.removeItem("scoreX")
        sessionStorage.removeItem("scoreO")
        window.location.reload();
    }

    watch(scoreTacker, (newValue, oldValue) => {
            if (Play.value.checkVictory('X', scoreTacker.value.victorygrid)) {
                winnerX.value = Play.value.checkVictory('X', scoreTacker.value.victorygrid)
                score(scoreX, "scoreX")
            } else if (Play.value.checkVictory('O', scoreTacker.value.victorygrid)) {
                winnerO.value = PlplayWithAi
            }
    })

    onMounted(() => {
        if (sessionStorage.getItem("scoreX")) {
            let savescore = sessionStorage.getItem("scoreX") as string
            scoreX.value = parseInt(savescore)
        }
        if (sessionStorage.getItem("scoreO")) {
            let savescore = sessionStorage.getItem("scoreO") as string
            scoreO.value = parseFloat(savescore)
        }
    })*/

    definePageMeta({
        middleware: ["auth"]
    })

</script>

<template>
    <div class="container">
        <canvas @click="($event: MouseEvent) => scoreTacker = Play?.position($event)" ref="canvas" width="390" height="390">

        </canvas>
        <!--Popup  :winnerX="winnerX"
                :winnerO="winnerO"
                :draw="draw"
        /-->
        <div class="wrapper">
            <div class="container-img">
                <img src="/public/crossx.svg" width="200"  height="200" alt="cross" />
                <img src="/public/ellipse.svg" width="150"  height="150" alt="cross" />
            </div>

            <div class="infoscore">
                <div>
                    <img src="/public/crossx.svg" width="50"  height="50" alt="cross" />
                    <h1>player1</h1>
                </div>
                <h1 class="score">{{ scoreX }}</h1>
            </div>
            <div class="infoscore2">
                <h1 class="score">{{ scoreO }}</h1>
                <div>
                    <img src="/public/ellipse.svg" width="40"  height="40" alt="cross" />
                    <h1>player2</h1>
                </div>
            </div>
            <div class="containerButon">
                <Button @click="Reset()" text="Reset" />
                <Button @click="Reset()" text="Change mode" />
            </div>
            
        </div>
    </div>
</template>

<style>
    .container {
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100vh;
        background: #e0e0e0;
    }

    .wrapper {
        width: 40%;
        height: 390px;
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

    @media screen and (max-width: 1024px) {
        .container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .wrapper {
            width: 0;
        }
        .container-img {
            display: none
        }
        .infoscore, .infoscore2 {
            position: absolute;
            z-index: 0;
        }
        .infoscore {
            top:10px;
            left: 0;
            right: 0;
            padding: 0 56px;
        }
        .infoscore2 {
            bottom:10px;
            left: 0;
            right: 0;
            padding: 0 56px;
        }
        .containerButon {
            display: none;
        }
    }
</style>