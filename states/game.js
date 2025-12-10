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
        this.minRocks = 5; //Minimum rocks on screen
        this.bullets = [];  // Array for bullets
        this.maxBullets = 3;  // Prevent spam
    }

    update() {

        // BLACK BACKGROUND (NEW)
        this.pencil.fillStyle = "black";
        this.pencil.fillRect(0, 0, this.canvas.width, this.canvas.height)

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

        // SHOOTING
        if (this.keys[" "]) {  // SPACEBAR
            if (this.bullets.length < this.maxBullets) {
                // Bullet spawns at ship nose
                const bulletSpeed = 10;
                const bullet = {
                    x: this.player.x + Math.sin(this.player.angle) * this.player.size,
                    y: this.player.y - Math.cos(this.player.angle) * this.player.size,
                    vx: Math.sin(this.player.angle) * bulletSpeed,
                    vy: -Math.cos(this.player.angle) * bulletSpeed,
                    size: 3  // Small white dot
                };
                this.bullets.push(bullet);
            }
            delete this.keys[" "];  // Consume key to prevent spam
        }

        // Update bullets
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;

            // Bullet screen wrap
            if (bullet.x < 0) bullet.x = this.canvas.width;
            if (bullet.x > this.canvas.width) bullet.x = 0;
            if (bullet.y < 0) bullet.y = this.canvas.height;
            if (bullet.y > this.canvas.height) bullet.y = 0;

            // Bullet off-screen too long? Remove
            if (bullet.x < -50 || bullet.x > this.canvas.width + 50 ||
                bullet.y < -50 || bullet.y > this.canvas.height + 50) {
                this.bullets.splice(i, 1);
                continue;
            }
        }

        // Collision Detection: Ship vs Rocks (simple circle-circle for speed)
        for (const rock of this.rocks.rocks) {
            const dx = this.player.x - rock.x;
            const dy = this.player.y - rock.y;
            const distance = Math.sqrt(dx * dx + dy * dy);  // Distance between centers

            const minDistance = this.player.size + rock.radius;  // Combined "radii" (ship approx as circle)

            //bullet collision
            for (let b = this.bullets.length - 1; b >= 0; b--) {
                const bullet = this.bullets[b];
                for (let r = this.rocks.rocks.length - 1; r >= 0; r--) {
                    const rock = this.rocks.rocks[r];
                    const dx = bullet.x - rock.x;
                    const dy = bullet.y - rock.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < rock.radius + bullet.size) {
                        // BULLET HITS ROCK – DESTROY BOTH
                        this.bullets.splice(b, 1);
                        this.rocks.rocks.splice(r, 1);
                        break;  // One bullet = one rock
                    }
                }

                // RESPAWN ROCKS (endless game)
                if (this.rocks.rocks.length < this.minRocks) {
                    this.rocks.spawnRocks(1 + Math.floor(this.rocks.rocks.length / 5));  // Spawn 1-2 more
                }


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

            // DRAW BULLETS
            this.bullets.forEach(bullet => {
                this.pencil.fillStyle = "white";
                this.pencil.beginPath();
                this.pencil.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
                this.pencil.fill();
            });
        }

    }

}