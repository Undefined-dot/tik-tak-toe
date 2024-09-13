<template>
    <div class="popupwinner2" v-if="show">
                <div class="popcontainer2">
                        <h1>Invite your friends</h1>
                        <div class="invitation">
                            <div class="">

                            </div>
                            <div style="padding: 0 10px;" @click.capture="() => copied = true">
                                <img :style="{ display: copied ? 'none' : ''}" src="/public/copy.svg" alt="">
                                <img :style="{ display: !copied ? 'none' : ''}" src="/public/check.svg" alt="">
                            </div>
                        </div>
                        <Button @click="handleClick" text="OK" />
                </div>
        </div>
</template>

<script setup lang="ts">
    defineProps({
        show: Boolean
    })
    const emits = defineEmits(["hidde"])
    const copied = ref(false)

    function handleClick () {
        emits("hidde", false)
        copied.value = false
    }
</script>

<style>
    .popupwinner2 {
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

    .popcontainer2{
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
        padding: 0 16px;
        color: var(--secondary);
    }
    .invitation {
        width: 95%;
        height: 50px;
        overflow: auto;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }
</style>