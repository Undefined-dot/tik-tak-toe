import { useInsFetch } from "./useInsfetch"
import { svgCircle } from "~/assets/JSimage"
import { svgCross } from "~/assets/JSimage"


export class useCanvas {
    canvas: HTMLCanvasElement | undefined
    playground: number[][]
    victorygrid: string[][]
    width: number
    adjust: number
    adjustimg: number
    square: number
    smallsqr: number
    widthImg: number
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
        this.canvas = canvas
        this.playground = playground
        this.victorygrid = victorygrid
        this.width = width
        this.square = square
        this.smallsqr = smallsqr
        this.widthImg = widthImg

        
        this.adjust = (this.width -  this.smallsqr) / 2 
        this.adjustimg = (this.width -  this.widthImg) / 2
    }

    Draw () {
        if (this.canvas) {
            
            let context = this.canvas.getContext("2d")
           
            for (let i = 0; i <= this.playground.length - 1; i++) {
                for (let j = 0; j <= this.playground[i].length - 1; j++) {
                    if (context && this.width) {

                        context.shadowOffsetX = 3;
                        context.shadowOffsetY = 3;
                        context.shadowBlur = 7;
                        context.shadowColor = '#bebebe';
                        
                       
                        context.fillStyle = '#e0e0e0'
                        context.fillRect(j * this.width + this.adjust,i * this.width + this.adjust, this.smallsqr, this.smallsqr);

                        context.shadowOffsetX = -3;
                        context.shadowOffsetY = -3;
                        context.shadowBlur = 7;
                        context.shadowColor = '#fff';
                        
                        context.fillStyle = '#e0e0e0'
                        context.fillRect(j * this.width + this.adjust,i * this.width + this.adjust, this.smallsqr, this.smallsqr);
                    }
                 }
            }
        }
    }

    drawcrossorcricle (ctx : any , svg: BlobPart, row: number, cols: number) {
        const image = new Image();
        image.onload = () => {
                ctx.drawImage(
                    image, cols * this.width + this.adjustimg, row * this.width + this.adjustimg, this.widthImg, this.widthImg
                );
        };
        const svgBlob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});
        const url = URL.createObjectURL(svgBlob);
        image.src = url;
    }

    placecrossorcircle (coordx: number, coordy: number, svg: any) {
        let context = this.canvas?.getContext("2d")
        if (context) {
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = 0;
            context.shadowColor = '#fff';
            this.drawcrossorcricle(context, svg, coordy, coordx)
        }
    }

    checkVictory(player: string, victoryGrid: string[][]) {
        if (victoryGrid && player) {
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
    }
}

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
        playground: number[][],
        victorygrid: string[][]
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
                super.placecrossorcircle(coodx,  coordy, svgCircle)
            } else if (this.coord.turn % 2 === 1) {
                super.placecrossorcircle(coodx,  coordy, svgCross)
            }
            return {victorygrid: this.victorygrid , player: this.player}
        }
    }

    position (event: MouseEvent) {
        console.log(this.canvas)
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
}

export class playWithAi extends useCanvas {
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
        playground: number[][]
    ) {
        super(canvas, width, square, smallsqr, widthImg, playground)
        this.coord = {x: -1, y: -1, turn: 0}
        this.player = []
        this.tab = []
        this.location = -1
        this.tours = "human"


        this.Draw()
    }

    getpositionAi (AItour: number){
        for (let i = 0; i <= this.playground.length -1; i++) {
            for (let j = 0; i <= this.playground[i].length -1; j++) {
                if (this.playground[i][j] === AItour) {
                    return [i, j]
                } else {
                    continue;
                }
            }
        }
    }

    fetchAI () {
        const user = useCookie("user")
        const id = sessionStorage.getItem("gameId")
        this.tab = [...this.tab, [user.value, this.location]]
        //console.log(this.tab)


            const aiFetch = useInsFetch(
                "https://126a-169-155-235-107.ngrok-free.app/update-ia-game",
                "POST",
                {
                    "gameId": id,
                    "first_user_token": user.value,
                    "second_user_token": "AI",
                    "tours": this.tab
                }
            )

            aiFetch.fetch.then((res) => {
                let datas = res.data.value as any
                 this.tours = "human"
                return this.gamewithAI(datas.tours)
            })

            aiFetch.fetch.catch((error) => {
                console.log(error)
            })
    }

    gamewithAI (tours: any) {
        if (tours) {
            const AItour = tours[tours?.length - 1][1]
            this.tab = [...this.tab, ["AI", AItour]]
            this.player = [...this.player, AItour]
            let tab = this.getpositionAi(AItour) as number[]
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

            this.coord.x = Math.floor(x / 130) 
            this.coord.y = Math.floor(y / 130)
            console.log(this.tours)

            this.coord.turn++
            this.victorygrid[this.coord.y][this.coord.x] = 'X'
            this.location =  this.playground[this.coord.y][this.coord.x]

            this.placecrossorcircle(this.coord.x,  this.coord.y, svgCross)

            this.player = [...this.player, this.location]
            this.tours = "AI"

            return {victorygrid: this.victorygrid , player: this.player, tours: this.tours}

            //this.gamewithAI( this.coord.x, this.coord.y)
            //passtoplay(coord.value.x, coord.value.y)
        }
    }
}

/*export function useC () {

    function gamewithAI (coordx: number, coordy: number) {
        
            location.value =  playground.value[coordy][coordx]
            

            console.log(coord.value.turn)
            if ( coord.value.turn % 2 === 0) {
                victorygrid.value[coordy][coordx] = 'X'
                placexorai(coordx, coordy, svgCross)
                coord.value.turn++
            } else if (coord.value.turn % 2 !== 1) {
                let tours = fetchAI (location.value) as any[]
                console.log("ddsfdsf")

                if (tours) {
                    const AItour = tours[tours.length - 1][1]

                    let tab = getpositionAi(AItour)
                    const playerai = fetchAI (location.value)
                    if (tab) {
                        victorygrid.value[tab[0]][tab[1]] = 'X'
                        placexorai(tab[0], tab[1], svgCircle)
                    }
                }
                coord.value.turn++
            }

            player.value = [...player.value, location.value]

            //placecrossorcircle(coord.value)
        
    }

    function position (event: any) {
        const rect = canvas.value?.getBoundingClientRect()
        const mode = sessionStorage.getItem("mode")
        const id = sessionStorage.getItem("gameId")
        const user = useCookie("user")

        if (rect) {
            // Calculez les coordonnées du clic par rapport au canvas
            const x = event.clientX - rect?.left;
            const y = event.clientY - rect?.top;

            coord.value.x = Math.floor(x / 130) 
            coord.value.y = Math.floor(y / 130)

            gamewithAI(coord.value.x, coord.value.y)
            //passtoplay(coord.value.x, coord.value.y)
        }
    }
}*/