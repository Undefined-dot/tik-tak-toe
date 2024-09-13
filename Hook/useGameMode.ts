import { defineStore } from "pinia";

export const useGameMode = defineStore("gameMode", {
    state: () => ({
        mode: "",
        id: "",
    }),

    actions: {
        setGameMode (newmode: string) {
            this.mode = newmode
        },
        registerId (newmode: string) {
            this.id = newmode
        }
    },
})