import { useCanvas } from "./useCanvas";
import { svgCircle } from "~/assets/JSimage"
import { svgCross } from "~/assets/JSimage"
import { usegetDatas } from "./useDatasgame";

export class useAI extends useCanvas {
    player: number[]
    coord: { x: number; y: number; turn: number }
    location: number
    tab: any[]
    tours: string
    constructor (
        canvas: HTMLCanvasElement | undefined, 
        width: number, // la taille du canvas
        square: number, 
        smallsqr: number,
        widthImg: number,
        playground = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ],
        victorygrid = [
            ['0', '0', '0'],
            ['0', '0', '0'],
            ['0', '0', '0']
        ]
    ) {
        super(canvas, width, square, smallsqr, widthImg, playground,victorygrid)
        this.coord = {x: -1, y: -1, turn: 0}
        this.player = []
        this.tab = []
        this.location = -1
        this.tours = "playersX"

        console.log(this.victorygrid)
        this.Draw()
    }

    getpositionAi (AItour: number){
        for (let i = 0; i <= this.playground.length -1; i++) {
            for (let j = 0; j <= this.playground[i].length -1; j++) {
                if (this.playground[i][j] === AItour) {
                    return [i, j]
                } else {
                   continue
                }
            }
        }
    }

    fetchAI () {
        const { play_with_ai } = usegetDatas()
        const user = useCookie("user")
        const id = sessionStorage.getItem("gameId")
        this.tab = [...this.tab, [user.value, this.location]]
        
        play_with_ai(id, user.value, this.tab).fetch

        .then((res) => {
                let datas = res.data.value as any
                 this.tours = "playersX"
                return this.gamewithAI(datas.tours)
        })

        .catch((error) => {
            console.log(error)
        })
    }

    gamewithAI (tours?: any) {
        if (tours) {
            const AItour = tours[tours?.length - 1][1]
            this.tab = [...this.tab, ["AI", AItour]]
            this.player = [...this.player, AItour]
            let tab = this.getpositionAi(3) as number[]
            this.victorygrid[tab[0]][tab[1]] = 'X'
            this.placecrossorcircle(tab[0], tab[1], svgCircle)
            return {victorygrid: this.victorygrid , player: this.player, tours: this.tours}
        }
    }

    position (event: any) {
        const rect = this.canvas?.getBoundingClientRect()

        if (rect) {
            // Calculez les coordonnées du clic par rapport au canvas
            const x = event.clientX - rect?.left;
            const y = event.clientY - rect?.top;

            if (this.tours === "playersX") {
                this.coord.x = Math.floor(x / 130) 
                this.coord.y = Math.floor(y / 130)

                this.victorygrid[this.coord.y][this.coord.x] = 'X'
                this.location =  this.playground[this.coord.y][this.coord.x]

                this.placecrossorcircle(this.coord.x,  this.coord.y, svgCross)

                this.player = [...this.player, this.location]
                this.tours = "playersO"

                return {victorygrid: this.victorygrid , player: this.player, tours: this.tours}
            }
        }
    }
}
