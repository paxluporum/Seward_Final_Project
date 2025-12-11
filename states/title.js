import { Toolbox } from "../toolbox.js";

export class Title {
    canvas;
    pencil;
    changeToGame = false;
    toolbox = new Toolbox();

    //button coordinates
    startButtonX = 250;
    startButtonY = 200;
    startButtonW = 100;
    startButtonH = 50;

    // Animation helpers
    titlePulse = 0;
    buttonPulse = 0;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // event listeners
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onClicked   = this.onClicked.bind(this);

        document.removeEventListener("keypress", this.onKeyPressed);
        document.removeEventListener("click",    this.onClicked);

        document.addEventListener("keypress", this.onKeyPressed);
        document.addEventListener("click",    this.onClicked);
        
    }

    onKeyPressed() {
        this.changeToGame = true;
    }
    
    onClicked(event) {
        const isHitButton = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY, 
            this.startButtonX, this.startButtonY, 
            this.startButtonW, this.startButtonH
        );
        this.changeToGame = isHitButton;
    }

    update() {
    

        // SPACE BACKGROUND
        const grad = this.pencil.createLinearGradient(0, 0, 0, this.canvas.height);
        grad.addColorStop(0, "#000814");
        grad.addColorStop(1, "#001d3d");
        this.pencil.fillStyle = grad;
        this.pencil.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // TWINKLING STARS
        this.pencil.fillStyle = "white";
        for (let i = 0; i < 80; i++) {
            const x = (i * 73) % this.canvas.width;
            const y = (i * 127) % this.canvas.height;
            const alpha = 0.4 + Math.sin(Date.now() * 0.002 + i) * 0.4;
            this.pencil.globalAlpha = alpha;
            this.pencil.fillRect(x, y, 2, 2);
        }
        this.pencil.globalAlpha = 1;

        // PULSING TITLE
        this.titlePulse += 0.04;
        const titleAlpha = 0.7 + Math.sin(this.titlePulse) * 0.3;
        this.pencil.fillStyle = `rgba(255,255,255,${titleAlpha})`;
        this.pencil.font = "bold 70px Georgia";
        this.pencil.textAlign = "center";
        this.pencil.shadowColor = "#00f0ff";
        this.pencil.shadowBlur = 25;
        this.pencil.fillText("ASTEROIDS", this.canvas.width / 2, 140);
        this.pencil.shadowBlur = 0;

        // PULSING START BUTTON 
        this.buttonPulse += 0.08;
        const glow = 8 + Math.sin(this.buttonPulse) * 6;

        // Glow shadow
        this.pencil.shadowColor = "#ff69b4";
        this.pencil.shadowBlur = glow;
        this.pencil.fillStyle = "#ff1493";
        this.pencil.fillRect(
            this.startButtonX - glow/2,
            this.startButtonY - glow/2,
            this.startButtonW + glow,
            this.startButtonH + glow
        );
        this.pencil.shadowBlur = 0;

        // Button body
        this.pencil.fillStyle = "#ff69b4";
        this.pencil.fillRect(this.startButtonX, this.startButtonY, this.startButtonW, this.startButtonH);

        // Text
        this.pencil.fillStyle = "white";
        this.pencil.font = "bold 28px Georgia";
        this.pencil.textAlign = "center";
        this.pencil.textBaseline = "middle";
        this.pencil.fillText("START", this.canvas.width / 2, this.startButtonY + 25);

        // Instructions (subtle)
        this.pencil.fillStyle = "rgba(200,200,255,0.7)";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("WASD / Arrows • Space to shoot", this.canvas.width / 2, 480);

     if (this.changeToGame) {
        this.changeToGame = false;   // reset
        return "game";
     }
    }
}