<script setup lang="ts">

import { useCookies } from '~/Hook/useCookies';
import { usegetDatas } from '~/Hook/useDatasgame';
import { gameTab } from '~/assets/constants';

// constants
const token = useCookie("user")

//methods
const { setCookie } = useCookies()
const { launch_ai_game } = usegetDatas(token)

// references
const gameMode = ref({ mode: 'passtoplay' })
const show = ref(false)
const errors = ref()
const loading = ref(false)

async function createAIGame () {
    let router = useRouter()
    let token = useCookie("user")

    launch_ai_game.fetch
    .then((res) => {
        let datas = res.data.value as any
        setCookie(datas.token)
        router.push("/game")
        sessionStorage.setItem("gameId", datas.id);
    })

    launch_ai_game.fetch.catch((error) => {
        errors.value = "something went wrong"
    })
}


//fonction
function handleClick () {
    errors.value = ""
    if (gameMode.value.mode === "friends") {
        show.value = true
    } 
    else if (gameMode.value.mode === "ai") {
        loading.value = true
        createAIGame ().then(() => {
            loading.value = false
        })
    }
}

// others
watch(gameMode.value, (newMode, oldMode) => {
    sessionStorage.setItem("mode", newMode.mode);
})

definePageMeta({
    //middleware: ["auth"]
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
    <PopupFriends :show="show" @hidde="(props) => show = props" />
    <div class="container2">
            <h1>Select game mode</h1>

            <div class="wrapper2">
                <Radio v-for="item in gameTab" :key="item.label" :label="item.label" :mode="item.mode" :gamemode="gameMode.mode" @changegamemode="(props: string) => gameMode.mode = props"/>
            </div>

            <Button @click="handleClick()" style="width: 416px;" text="Play">
                <Spinner v-if="loading"/>
            </Button>
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
</style>