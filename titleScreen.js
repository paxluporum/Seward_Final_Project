export class TitleScreen {

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
    }


    update() {
        console.log("In Title!")
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Title Screen!", 10, 50);
        this.pencil.font = "30px Verdana";

    }
}