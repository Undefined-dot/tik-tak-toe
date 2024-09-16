<template>
    <div class="container2">
      <h1>choose player</h1>
      <div class="wrapper3">
        <Radio 
          v-for="item in player" 
          :key="item.label" 
          :label="item.label" 
          :mode="item.mode" 
          :gamemode="players.mode" 
          @changegamemode="(props: string) => players.mode = props" 
          >
            <Playerx v-if="item.label === 'playerx'" intColor="#39BBD3" extColor="#3284D2" width="200" height="200" />
            <Playero v-if="item.label === 'playero'" intColor="#39BBD3" extColor="#3284D2" width="150" height="150" style="margin: 35px 0 12px 0;" />
        </Radio>
      </div>
      <Button @click="navigate ()" style="width: 416px;" text="Next" />
    </div>
</template>

<script setup lang="ts">
import { player } from '~/assets/constants';

const players = ref({ mode: 'playerx' })

function navigate () {
  const router = useRouter()
  router.push("/selectgame")
  sessionStorage.setItem("player", players.value.mode)
}

</script>

<style>
.container2{
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
}
.wrapper3 {
        width: 500px;
        height: 300px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 16px;
        place-content: center;
        place-items: center;
        margin-bottom: 24px;
    }
    .container2 h1 {
      margin-bottom: 24px;
      color: var(--secondary);
    }
    .wrapper3 div p {
      font-size: 24px;
    }
    @media screen and (max-width: 650px) {
        .wrapper3 {
          width: 100%;
        }
        .wrapper3 div{
            width: 200px; 
            height: 200px; 
        }
    }
</style>