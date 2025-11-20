export class GameOver {

      canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
    }

    update() {
        console.log("In gameOver!")
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game over", 10, 50);
    }



}