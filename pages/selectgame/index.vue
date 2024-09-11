<script setup lang="ts">
import Button from '~/components/Button.vue';
import { useRouter, useRoute } from 'vue-router'
import { useInsFetch } from '~/Hook/useInsfetch';
import Close from '~/components/Close.vue';

const gameMode = ref(reactive({ mode: 'easy' }))
const copied = ref(false)
const show = ref(false)
const errors = ref()

const nuxtApp = useNuxtApp()



function modifygamemode (event: Event) {
    let target = event.target as HTMLInputElement

    if (target) {
        gameMode.value.mode = target.value
    }
}

function handleClick () {
    errors.value = ""
    const token = useCookie("user")
    if (gameMode.value.mode === "friends") {
        show.value = true
    } else if (gameMode.value.mode === "ai") {
        const aiFetch = useInsFetch(
            "https://703d-129-0-99-219.ngrok-free.app/launch-ia-game",
            "POST",
            {
                "userToken": token.value,
                "expireTokenTime": 0,
                "gameId": ""
            }
        )
        const { data, error } = aiFetch.fetch
        if (error.value) {
            errors.value = "something went wrong"
            console.log("hello")
        }
        const donnees = data.value as any
        if (donnees) {
            console.log(donnees)
            //window.location.href = donnees.redirect
        }
    }
}

watch(gameMode, (newMode, oldMode) => {
    nuxtApp.provide('gameMode', newMode)
})

definePageMeta({
    middleware: ["auth"]
})

onMounted(() => {
    const route = useRoute()
    const router = useRouter()
  // Vérifier si l'URL a des query parameters
  if (route.query.user_token) {
    // Construire une nouvelle URL sans les query parameters
    const cleanPath = route.path  // Cette valeur sera 'example.com/product'

    // Remplacer l'URL actuelle par l'URL nettoyée sans query params
    router.replace(cleanPath)
    }
  })

</script>

<template>
    <div v-if="errors" class="error">
        <Close @click="() => errors = undefined" width="16" height="16" intColor="#FFFFFF" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;" />
        {{ errors }}
    </div>
        <div class="popupwinner" v-if="show">
                <div class="popcontainer">
                        <h1>Invite your friends</h1>
                        <div class="invitation">
                            <div class="">

                            </div>
                            <div style="padding: 0 10px;" @click.capture="() => copied = true">
                                <img :style="{ display: copied ? 'none' : ''}" src="/public/copy.svg" alt="">
                                <img :style="{ display: !copied ? 'none' : ''}" src="/public/check.svg" alt="">
                            </div>
                        </div>
                        <Button @click="show = false; copied = false" text="OK" />
                </div>
        </div>
        <div class="container2">
                <h1>Select game mode</h1>

                <div class="wrapper2">
                    <div :style="{background: gameMode.mode === 'ai' ? '#4B6A86' : '#39BBD3'}">
                        <input @change="modifygamemode($event)" type="radio" name="game" value="ai" id="">
                        <p>with AI</p>
                    </div>

                    <div :style="{background: gameMode.mode === 'friends' ? '#4B6A86' : '#39BBD3'}">
                        <input @change="modifygamemode($event)" type="radio" name="game" value="friends" id="">
                        <p>with Friends</p>
                    </div>

                    <div :style="{background: gameMode.mode === 'online' ? '#4B6A86' : '#39BBD3'}">
                        <input @change="modifygamemode($event)" type="radio" name="game" value="online" id="">
                        <p>Online</p>
                    </div>

                    <div :style="{background: gameMode.mode === 'passtoplay' ? '#4B6A86' : '#39BBD3'}">
                        <input @change="modifygamemode($event)" type="radio" name="game" value="passtoplay" id="">
                        <p>Pass to Play</p>
                    </div>
                </div>

                <Button @click="handleClick()" style="width: 416px;" text="Play" />
        </div>
</template>

<style>
    .error {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        max-width: 500px;
        display: flex;
        align-items:center;
        justify-content: center;
        background-color: rgb(252, 97, 97);
        color: white;
        border-radius: 12px;
        padding: 16px 8px;
        margin: auto;
    }
    .container2 {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .container2 h1{
        margin-bottom: 24px;
        color: var(--secondary);
    }
    .wrapper2 {
        width: 416px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 16px;
        place-content: center;
        place-items: center;
        margin-bottom: 24px;
    }
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
    .wrapper2 div input {
        position: absolute;
        padding: 0 32px;
        font-size: 24px;
        cursor: pointer;
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