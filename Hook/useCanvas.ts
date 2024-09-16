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

    drawcrossorcricle (ctx : any , svg: BlobPart, cols: number, row: number) {
        const image = new Image();
        image.onload = () => {
                ctx.drawImage(
                    image, row * this.width + this.adjustimg, cols * this.width + this.adjustimg, this.widthImg, this.widthImg
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
            this.drawcrossorcricle(context, svg, coordx, coordy)
        }
    }

    Reset () {
        this.victorygrid = [
            ['0', '0', '0'],
            ['0', '0', '0'],
            ['0', '0', '0']
        ]
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


