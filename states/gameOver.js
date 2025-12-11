import { Toolbox } from "../toolbox.js";

export class GameOver {

    canvas;
    pencil;
    changeToTitle = false;  // Mirror title.js flag
    toolbox = new Toolbox();

    restartButtonX = 250;  // Centered
    restartButtonY = 250;
    restartButtonW = 100;
    restartButtonH = 50;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // Mirror title.js EXACTLY
        this.onClicked = this.onClicked.bind(this);

        document.removeEventListener("click", this.onClicked);
        document.addEventListener("click", this.onClicked);
    }

    onClicked(event) {
        const isHitButton = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY, 
            this.restartButtonX, this.restartButtonY, 
            this.restartButtonW, this.restartButtonH
        );
        this.changeToTitle = isHitButton;
    }

    update() {
        this.pencil.fillStyle = "black";
        this.pencil.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.pencil.fillStyle = "white";
        this.pencil.font = "50px Georgia";
        this.pencil.textAlign = "center";
        this.pencil.fillText("GAME OVER", this.canvas.width / 2, 200);

        // Pink button (mirror title)
        this.pencil.fillStyle = "pink";
        this.pencil.fillRect(
            this.restartButtonX, this.restartButtonY,
            this.restartButtonW, this.restartButtonH
        );

        this.pencil.fillStyle = "black";
        this.pencil.font = "24px Georgia";
        this.pencil.textAlign = "center";
        this.pencil.fillText("Restart", this.canvas.width / 2, this.restartButtonY + 35);

        if (this.changeToTitle) {
            this.changeToTitle = false;
            return "title";
        }
    }
}