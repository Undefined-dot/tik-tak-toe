import { useCanvas } from "./useCanvas";
import { svgCircle } from "~/assets/JSimage"
import { svgCross } from "~/assets/JSimage"

export class usePasstoplay extends useCanvas {
    player: number[]
    coord: { x: number; y: number; turn: number }
    location: number
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
        super(canvas, width, square, smallsqr, widthImg, playground, victorygrid)
        this.coord = {x: -1, y: -1, turn: 0}
        this.player = []
        this.location = -1

        this.Draw()
    }

    passtoplay (coodx: number, coordy: number) {
        if (this.player.includes(this.playground[coordy][coodx]) === false) {
            this.coord.turn++
            this.location =  this.playground[coordy][coodx]

            if ( this.coord.turn % 2 === 0) {
                this.victorygrid[coordy][coodx] = 'O'
            } else if (this.coord.turn % 2 !== 0) {
                this.victorygrid[coordy][coodx] = 'X'
            } else {
                return
            }
            this.player = [...this.player, this.location]

            if (this.coord.turn % 2 === 0) {
                this.placecrossorcircle(coordy,coodx, svgCircle)
            } else if (this.coord.turn % 2 === 1) {
                this.placecrossorcircle(coordy, coodx, svgCross)
            }
            return {victorygrid: this.victorygrid , player: this.player, turn: this.coord.turn}
        }
    }

    position (event: MouseEvent) {
        if (this.canvas) {
            const rect = this.canvas.getBoundingClientRect()
            // Calculez les coordonnées du clic par rapport au canvas
            const x = event.clientX - rect?.left;
            const y = event.clientY - rect?.top;

            this.coord.x = Math.floor(x / 130) 
            this.coord.y = Math.floor(y / 130)

            return this.passtoplay(this.coord.x, this.coord.y)
        }
    }

    resetPlayer () {
        this.player = []
    }
}
