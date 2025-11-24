import { Player } from "../player.js";
import { Rocks } from "../rocks.js";

export class Game {

    canvas;
    pencil;
    player;
    keys = {};

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.player = new Player();
        this.player.x = canvas.width / 2;  // Center it perfectly
        this.player.y = canvas.height / 2;

        window.addEventListener("keydown", (e) => this.keys[e.key] = true);
        window.addEventListener("keyup", (e) => this.keys[e.key] = false);

        this.rocks = new Rocks(canvas);
    }

    update() {

        // Rotation
        if (this.keys["ArrowLeft"] || this.keys["a"]) {
            this.player.angle -= 0.1;   // Turn left (radians)
        }
        if (this.keys["ArrowRight"] || this.keys["d"]) {
            this.player.angle += 0.1;   // Turn right
        }

        // Movement
        let speed = 4;

        if (this.keys["ArrowUp"] || this.keys["w"]) {
            this.player.x += Math.sin(this.player.angle) * speed;
            this.player.y -= Math.cos(this.player.angle) * speed;
        }
        if (this.keys["ArrowDown"] || this.keys["s"]) {
            this.player.x -= Math.sin(this.player.angle) * speed;
            this.player.y += Math.cos(this.player.angle) * speed;
        }

        // "SIMPLE" screen wrap

        // Left edge --> pop out on the right
        if (this.player.x < 0) this.player.x = this.canvas.width;

        // Right edge --> to the left
        if (this.player.x > this.canvas.width) this.player.x = 0;

        //Bottom to top
        if (this.player.y < 0) this.player.y = this.canvas.height;

        //Top to bottom
        if (this.player.y > this.canvas.height) this.player.y = 0;

        // Collision Detection: Ship vs Rocks (simple circle-circle for speed)
        for (const rock of this.rocks.rocks) {
            const dx = this.player.x - rock.x;
            const dy = this.player.y - rock.y;
            const distance = Math.sqrt(dx * dx + dy * dy);  // Distance between centers

            const minDistance = this.player.size + rock.radius;  // Combined "radii" (ship approx as circle)

            if (distance < minDistance) {
                return "gameOver";  // this is how you die :(
            }
        }


        console.log("In game!")
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game", 10, 50);

        this.player.update();
        this.player.draw(this.pencil);  //draws ship

        this.rocks.update();      //draws rocks
        this.rocks.draw(this.pencil);
    }



}