export class Game {

    update() {
        console.log("In game!")
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("In game!", 10, 50);
        this.pencil.font = "30px Verdana";
    }
}