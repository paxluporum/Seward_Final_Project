export class GameOver {

    update() {
      console.log("Game over man!")  
      this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game Over!", 10, 50);
        this.pencil.font = "30px Verdana";
    }
}