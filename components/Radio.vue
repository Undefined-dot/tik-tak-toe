<template>
    <div :style="{background: gamemode === mode ? '#39BBD3' : '#4B6A86'}">
        <input @change="handleChange" type="radio" name="game" :value="mode">
        <p>{{ label }}</p>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
        defineProps({
            label: String,
            mode: String,
            width: String,
            gamemode: String
        })
         const emits = defineEmits(["changegamemode"])

         function handleChange (event: Event) {
            let target = event.target as HTMLInputElement

            if (target) {
                emits("changegamemode", target.value)
            }
         }
</script>

<style>
    .wrapper2 div {
        width: 200px;
        height: 200px;
        border-radius: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        color: #fff;
    }
    .wrapper3 div{
        width: 300px; 
        height: 300px; 
        display: flex; 
        flex-direction: column; 
        align-items:center;
        justify-content: center;
        position: relative;
        color: #fff;
        border-radius: 40px;
    }
    .wrapper2 div input, .wrapper3 div input {
        position: absolute;
        padding: 0 32px;
        font-size: 24px;
        cursor: pointer;
    }
    input {
        width: 100%;
        height: 100%;
        opacity: 0;
    }
</style>