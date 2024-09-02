<script setup lang="ts">

    let playground = ref([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ])

    const coord = ref({x: -1, y: -1})

    const canvas = ref<HTMLCanvasElement>()

    const width = ref(0)
    const height = ref(0)

    const location = ref(-1)
    

    const svgCross = `
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M39.6833 116.007L39.6833 116.007C44.3695 120.693 51.9675 120.693 56.6538 116.007L74.682 97.9788L92.7155 116.008C97.402 120.693 104.999 120.693 109.685 116.007L102.614 108.936L109.685 116.007L115.694 109.998L109.266 103.57L115.694 109.998C120.381 105.311 120.381 97.7135 115.694 93.0272L108.623 100.098L115.694 93.0272L97.6671 75L115.694 56.9728C120.381 52.2864 120.381 44.6885 115.694 40.0022L115.694 40.0022L109.685 33.993C104.999 29.3071 97.402 29.3066 92.7155 33.992L74.682 52.0212L56.6538 33.9931C51.9675 29.3068 44.3695 29.3069 39.6833 33.9931L33.6742 40.0022C28.9879 44.6885 28.9879 52.2865 33.6742 56.9728L51.7016 75L33.6742 93.0272C28.9879 97.7135 28.9879 105.312 33.6742 109.998L39.6833 116.007Z" fill="#3284D2" stroke="#3284D2" stroke-width="20"/>
    </svg>
    `;

    const svgCircle = `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="45" fill="white" stroke="#39BBD3" stroke-width="30"/>
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

            location.value =  playground.value[coord.value.y][coord.value.x]

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

    watch(coord.value, (newCoord, oldCoord) => {
        let context = canvas.value?.getContext("2d")
        drawcrossorcricle(context, svgCross, newCoord.y, newCoord.x)
    })


    function Draw () {
        if (canvas.value) {
            let context = canvas.value?.getContext("2d")

            width.value = (window.innerWidth - 75) / 2
            height.value = (window.innerHeight - 75) / 2

            console.log(coord.value.x)

            //canvas.value.style.backgroundColor = "#fff000"
           
            for (let i = 0; i <= playground.value.length -1; i++) {
                for (let j = 0; j <= playground.value[i].length; j++) {
                    if (context) {
                        //context.clearRect(45, 45, 60, 60);
                        context.strokeRect(j * 130, i * 130, 130, 130);
                        context.strokeRect(j * 130 + 25,i * 130 + 25, 80, 80);
                    }
                 }
            }
        }
    }

    onMounted(() => {
        Draw()
    })

</script>

<template>
    <div class="container">
        <canvas @click="($event: MouseEvent) => position($event)" ref="canvas" width="390" height="390">

        </canvas>
    </div>
</template>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    }
</style>