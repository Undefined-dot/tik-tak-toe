<script setup lang="ts">

    let playground = ref([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ])

    let victorygrid = ref ([
        ['0', '0', '0'],
        ['0', '0', '0'],
        ['0', '0', '0']
    ])

    const coord = ref({x: -1, y: -1, turn: 0})

    const canvas = ref<HTMLCanvasElement>()

    const width = ref(0)
    const height = ref(0)

    const location = ref(-1)

    const player = ref<number[]>([])

    const scoreX = ref(0)

    const scoreO = ref(0)
    

    const svgCross = `
    <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-outside-1_4_186" maskUnits="userSpaceOnUse" x="9.66553" y="9.82501" width="55" height="55" fill="black">
            <rect fill="white" x="9.66553" y="9.82501" width="55" height="55"/>
            <path d="M52.014 21.2391C51.2331 20.4581 49.9669 20.458 49.1858 21.2389L38.7548 31.6674C37.9738 32.4483 36.7076 32.4482 35.9266 31.6672L25.4985 21.2392C24.7174 20.4582 23.4511 20.4582 22.6701 21.2392L21.0797 22.8295C20.2987 23.6106 20.2987 24.8769 21.0798 25.658L31.5076 36.0858C32.2887 36.8668 32.2887 38.1332 31.5076 38.9142L21.0797 49.3421C20.2987 50.1231 20.2987 51.3894 21.0797 52.1705L22.6701 53.7608C23.4511 54.5419 24.7174 54.5419 25.4985 53.7608L35.9266 43.3328C36.7076 42.5518 37.9738 42.5517 38.7548 43.3326L49.1858 53.7611C49.9669 54.542 51.2331 54.542 52.014 53.761L53.6045 52.1705C54.3856 51.3894 54.3856 50.1231 53.6045 49.3421L43.1767 38.9142C42.3957 38.1332 42.3957 36.8668 43.1767 36.0858L53.6045 25.658C54.3856 24.8769 54.3856 23.6106 53.6045 22.8295L52.014 21.2391Z"/>
        </mask>
        <path d="M52.014 21.2391C51.2331 20.4581 49.9669 20.458 49.1858 21.2389L38.7548 31.6674C37.9738 32.4483 36.7076 32.4482 35.9266 31.6672L25.4985 21.2392C24.7174 20.4582 23.4511 20.4582 22.6701 21.2392L21.0797 22.8295C20.2987 23.6106 20.2987 24.8769 21.0798 25.658L31.5076 36.0858C32.2887 36.8668 32.2887 38.1332 31.5076 38.9142L21.0797 49.3421C20.2987 50.1231 20.2987 51.3894 21.0797 52.1705L22.6701 53.7608C23.4511 54.5419 24.7174 54.5419 25.4985 53.7608L35.9266 43.3328C36.7076 42.5518 37.9738 42.5517 38.7548 43.3326L49.1858 53.7611C49.9669 54.542 51.2331 54.542 52.014 53.761L53.6045 52.1705C54.3856 51.3894 54.3856 50.1231 53.6045 49.3421L43.1767 38.9142C42.3957 38.1332 42.3957 36.8668 43.1767 36.0858L53.6045 25.658C54.3856 24.8769 54.3856 23.6106 53.6045 22.8295L52.014 21.2391Z" fill="#3284D2"/>
        <path d="M53.6045 22.8295L60.6756 15.7585L53.6045 22.8295ZM43.1767 38.9142L36.1056 45.9853L43.1767 38.9142ZM53.6045 52.1705L60.6756 59.2416L53.6045 52.1705ZM53.6045 49.3421L60.6756 42.271L53.6045 49.3421ZM49.1858 53.7611L42.1155 60.833L49.1858 53.7611ZM52.014 53.761L44.943 46.6899L52.014 53.761ZM35.9266 43.3328L28.8555 36.2617L35.9266 43.3328ZM38.7548 43.3326L31.6846 50.4045L38.7548 43.3326ZM22.6701 53.7608L29.7411 46.6897L22.6701 53.7608ZM25.4985 53.7608L18.4274 46.6897L25.4985 53.7608ZM21.0797 52.1705L14.0087 59.2416L21.0797 52.1705ZM21.0798 25.658L14.0087 32.7291L21.0798 25.658ZM25.4985 21.2392L18.4274 28.3103L25.4985 21.2392ZM35.9266 31.6672L28.8555 38.7383L35.9266 31.6672ZM49.1858 21.2389L56.256 28.3108L49.1858 21.2389ZM52.014 21.2391L59.0851 14.168L52.014 21.2391ZM42.1155 14.167L31.6846 24.5955L45.8251 38.7393L56.256 28.3108L42.1155 14.167ZM42.9976 24.5961L32.5695 14.1681L18.4274 28.3103L28.8555 38.7383L42.9976 24.5961ZM15.599 14.1682L14.0087 15.7585L28.1508 29.9006L29.7411 28.3103L15.599 14.1682ZM14.0087 32.7291L24.4366 43.1569L38.5787 29.0147L28.1508 18.5869L14.0087 32.7291ZM24.4366 31.8431L14.0087 42.271L28.1508 56.4131L38.5787 45.9853L24.4366 31.8431ZM14.0087 59.2416L15.599 60.8319L29.7411 46.6897L28.1508 45.0994L14.0087 59.2416ZM32.5695 60.8319L42.9976 50.4039L28.8555 36.2617L18.4274 46.6897L32.5695 60.8319ZM31.6846 50.4045L42.1155 60.833L56.256 46.6892L45.8251 36.2607L31.6846 50.4045ZM59.0851 60.832L60.6756 59.2416L46.5335 45.0994L44.943 46.6899L59.0851 60.832ZM60.6756 42.271L50.2478 31.8432L36.1056 45.9853L46.5335 56.4131L60.6756 42.271ZM50.2478 43.1569L60.6756 32.729L46.5335 18.5869L36.1056 29.0147L50.2478 43.1569ZM60.6756 15.7585L59.0851 14.168L44.943 28.3101L46.5335 29.9006L60.6756 15.7585ZM60.6756 32.729C65.3619 28.0427 65.3619 20.4448 60.6756 15.7585L46.5335 29.9006C43.4093 26.7764 43.4093 21.7111 46.5335 18.5869L60.6756 32.729ZM50.2478 31.8432C53.372 34.9674 53.372 40.0327 50.2478 43.1569L36.1056 29.0147C31.4194 33.701 31.4193 41.299 36.1056 45.9853L50.2478 31.8432ZM60.6756 59.2416C65.3619 54.5553 65.3619 46.9573 60.6756 42.271L46.5335 56.4131C43.4093 53.2889 43.4093 48.2236 46.5335 45.0994L60.6756 59.2416ZM42.1155 60.833C46.802 65.5184 54.3992 65.5179 59.0851 60.832L44.943 46.6899C48.0669 43.566 53.1317 43.5657 56.256 46.6892L42.1155 60.833ZM42.9976 50.4039C39.8737 53.5278 34.8089 53.5281 31.6846 50.4045L45.8251 36.2607C41.1386 31.5754 33.5414 31.5758 28.8555 36.2617L42.9976 50.4039ZM15.599 60.8319C20.2853 65.5182 27.8832 65.5182 32.5695 60.8319L18.4274 46.6897C21.5516 43.5655 26.6169 43.5655 29.7411 46.6897L15.599 60.8319ZM14.0087 42.271C9.32238 46.9573 9.32238 54.5553 14.0087 59.2416L28.1508 45.0994C31.275 48.2236 31.275 53.2889 28.1508 56.4131L14.0087 42.271ZM24.4366 43.1569C21.3124 40.0327 21.3124 34.9673 24.4366 31.8431L38.5787 45.9853C43.265 41.299 43.265 33.701 38.5787 29.0147L24.4366 43.1569ZM14.0087 15.7585C9.32238 20.4448 9.32238 28.0428 14.0087 32.7291L28.1508 18.5869C31.275 21.7111 31.275 26.7764 28.1508 29.9006L14.0087 15.7585ZM32.5695 14.1681C27.8832 9.48186 20.2853 9.48187 15.599 14.1682L29.7411 28.3103C26.617 31.4345 21.5516 31.4345 18.4274 28.3103L32.5695 14.1681ZM31.6846 24.5955C34.8089 21.4719 39.8737 21.4722 42.9976 24.5961L28.8555 38.7383C33.5414 43.4242 41.1386 43.4246 45.8251 38.7393L31.6846 24.5955ZM56.256 28.3108C53.1317 31.4344 48.0669 31.4341 44.943 28.3101L59.0851 14.168C54.3992 9.4821 46.802 9.48164 42.1155 14.167L56.256 28.3108Z" fill="#3284D2" mask="url(#path-1-outside-1_4_186)"/>
    </svg>
    `;

    const svgCircle = `
    <svg width="75" height="75" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="45" fill="#e0e0e0" stroke="#39BBD3" stroke-width="30"/>
    </svg>
    `


    function position (event: any) {
        const rect = canvas.value?.getBoundingClientRect()

        if (rect) {
            // Calculez les coordonnées du clic par rapport au canvas
            const x = event.clientX - rect?.left;
            const y = event.clientY - rect?.top;

            coord.value.x = Math.floor(x / 130) 
            coord.value.y = Math.floor(y / 130) 
            coord.value.turn++

            location.value =  playground.value[coord.value.y][coord.value.x]

            if ( coord.value.turn % 2 === 0 ) {
                victorygrid.value[coord.value.y][coord.value.x] = 'X'
            } else {
                victorygrid.value[coord.value.y][coord.value.x] = 'O'
            }
            player.value = [...player.value, location.value]
        }
    }

    function drawcrossorcricle (ctx : any , svg: BlobPart, row: number, cols: number) {
        const image = new Image();
        image.onload = function() {
            ctx.drawImage(image, cols * 130 + 25, row * 130 + 25, 80, 80);
        };
        const svgBlob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});
        const url = URL.createObjectURL(svgBlob);
        image.src = url;
    }


    function Draw () {
        if (canvas.value) {
            let context = canvas.value?.getContext("2d")

            width.value = (window.innerWidth - 75) / 2
            height.value = (window.innerHeight - 75) / 2

            //canvas.value.style.backgroundColor = "#fff000"
           
            for (let i = 0; i <= playground.value.length -1; i++) {
                for (let j = 0; j <= playground.value[i].length; j++) {
                    if (context) {
                        //context.clearRect(45, 45, 60, 60);
                        context.clearRect(j * 130, i * 130, 130, 130);

                        context.shadowOffsetX = 3;
                        context.shadowOffsetY = 3;
                        context.shadowBlur = 7;
                        context.shadowColor = '#bebebe';
                        
                       
                        
                        context.fillStyle = '#e0e0e0'
                        context.fillRect(j * 130 + 15,i * 130 + 15, 100, 100);

                        context.shadowOffsetX = -3;
                        context.shadowOffsetY = -3;
                        context.shadowBlur = 7;
                        context.shadowColor = '#fff';
                        
                       
                        
                        context.fillStyle = '#e0e0e0'
                        context.fillRect(j * 130 + 15,i * 130 + 15, 100, 100);
                    }
                 }
            }
        }
    }

    watch(coord.value, (newCoord, oldCoord) => {
        let context = canvas.value?.getContext("2d")
        if (context) {
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 0;
            context.shadowColor = '#fff';
            if (newCoord.turn % 2 === 0) {
                drawcrossorcricle(context, svgCross, newCoord.y, newCoord.x)
            } else if (newCoord.turn % 2 === 1) {
                drawcrossorcricle(context, svgCircle, newCoord.y, newCoord.x)
            }
        }
    })

    function drawverification (tab: number[]) {
        if (tab.length === 9) {
            return true
        }
        return false
    }

    function checkVictory(player: string, victoryGrid: string[][]) {
        // Vérification des lignes
        for (let i = 0; i < 3; i++) {
            if (victoryGrid[i][0] === player && victoryGrid[i][1] === player && victoryGrid[i][2] === player) {
                return true;
            }
        }

        // Vérification des colonnes
        for (let i = 0; i < 3; i++) {
            if (victoryGrid[0][i] === player && victoryGrid[1][i] === player && victoryGrid[2][i] === player) {
                return true;
            }
        }

        // Vérification des diagonales
        if (victoryGrid[0][0] === player && victoryGrid[1][1] === player && victoryGrid[2][2] === player) {
            return true;
        }
        if (victoryGrid[0][2] === player && victoryGrid[1][1] === player && victoryGrid[2][0] === player) {
            return true;
        }

        return false;
    }

    watch(victorygrid.value, (newValue, oldValue) => {
            if (checkVictory('X', newValue)) {
                    if (!sessionStorage.getItem("scoreX")) {
                        scoreX.value++
                        sessionStorage.setItem('scoreX', `${scoreX.value}`);
                    } else if(sessionStorage.getItem("scoreX")) {
                        scoreX.value = parseFloat(sessionStorage.getItem("scoreX"))
                        scoreX.value++
                        sessionStorage.setItem('scoreX', `${scoreX.value}`);
                    }
                    
            } else if (checkVictory('O', newValue)) {
                if (!sessionStorage.getItem("scoreO")) {
                        scoreO.value++
                        sessionStorage.setItem('scoreO', `${scoreX.value}`);
                    } else if(sessionStorage.getItem("scoreO")) {
                        scoreO.value = parseFloat(sessionStorage.getItem("scoreO"))
                        scoreO.value++
                        sessionStorage.setItem('scoreO', `${scoreX.value}`);
                    }
            }
    })

    onMounted(() => {
        Draw()
        if (sessionStorage.getItem("scoreX")) {
            scoreX.value = parseFloat(sessionStorage.getItem("scoreX"))
        }
        if (sessionStorage.getItem("scoreO")) {
            scoreO.value = parseFloat(sessionStorage.getItem("scoreO"))
        }
    })

</script>

<template>
    <div class="container">
        <canvas @click="($event: MouseEvent) => position($event)" ref="canvas" width="390" height="390">

        </canvas>
        <div v-if="checkVictory('X', victorygrid) || checkVictory('O', victorygrid) || drawverification(player)" class="popupwinner">
            <div v-if="checkVictory('X', victorygrid)" class="popcontainer">
                <h1>The winner is : </h1>
                <div>
                    <img src="/public/crossx.svg" width="200"  height="200" alt="cross" />
                </div>
            </div>
            <div v-else-if="checkVictory('O', victorygrid)" class="popcontainer">
                <h1>The winner is : </h1>
                <div>
                    <img src="/public/ellipse.svg" width="150"  height="150" alt="cross" />
                </div>
            </div>
            <div v-else="drawverification(player)" class="popcontainer">
                <h1>DRAW!</h1>
                <div>
                    <img src="/public/crossx.svg" width="200"  height="200" alt="cross" />
                    <img src="/public/ellipse.svg" width="150"  height="150" alt="cross" />
                </div>
            </div>
        </div>
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

        </div>
    </div>
</template>

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
        color: var(--secondary);
    }
    .popcontainer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
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
    }
</style>