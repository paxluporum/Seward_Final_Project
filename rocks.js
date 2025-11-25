import { Toolbox } from "./toolbox.js";

export class Rocks {
    toolbox = new Toolbox();
    rocks = [];                       // Array to hold all rock objects

    constructor(canvas) {
        this.canvas = canvas;
        this.spawnRocks(5);           // Spawn 5 rocks at start
    }

    // Spawn a bunch of rocks with random position and size
    spawnRocks(count) {
        const safeCenterX = 300;  // Canvas center (player spawn)
        const safeCenterY = 300;
        const safeDistance = 100; // Buffer: rocks spawn at least 100px away

        for (let i = 0; i < count; i++) {
            let rock;
            let attempts = 0;
            const maxAttempts = 50;  // Safety net vs infinite loop

            while (attempts < maxAttempts) {
                attempts++;

                rock = {
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    radius: 20 + Math.random() * 40,
                    angle: 0,  // Start flat, rotate in update()
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    points: [] // Pre-gen bumpy shape
                };

                // Generate points ONCE 
                const numPoints = 12;
                for (let j = 0; j < numPoints; j++) {
                    const angle = (j / numPoints) * Math.PI * 2;
                    const variance = 0.8 + Math.random() * 0.4;
                    const r = rock.radius * variance;
                    rock.points.push({
                        x: Math.cos(angle) * r,
                        y: Math.sin(angle) * r
                    });
                }

                // Safe spawn check
                const dx = rock.x - safeCenterX;
                const dy = rock.y - safeCenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance >= safeDistance) {
                    break;  // Safe! Exit loop
                }
            }

            // Rare fail? Spawn anyway (edge of screen)
            if (attempts >= maxAttempts) {
                console.warn("Safe spawn failed for rock " + i + " - spawning anyway");
            }

            this.rocks.push(rock);
        }
    }

    update() {
        for (const rock of this.rocks) {
            // Move the rock
            rock.x += rock.vx;
            rock.y += rock.vy;

            // Screen wrap (same as player)
            if (rock.x < -rock.radius) rock.x = this.canvas.width + rock.radius;
            if (rock.x > this.canvas.width + rock.radius) rock.x = -rock.radius;
            if (rock.y < -rock.radius) rock.y = this.canvas.height + rock.radius;
            if (rock.y > this.canvas.height + rock.radius) rock.y = -rock.radius;

            // Spin the rock
            rock.angle += 0.01;
        }
    }

    // Draw all rocks — jagged
    draw(pencil) {
        for (const rock of this.rocks) {
            pencil.save();
            pencil.translate(rock.x, rock.y);
            pencil.rotate(rock.angle);

            pencil.fillStyle = "#666";
            pencil.strokeStyle = "#444";
            pencil.lineWidth = 2;

            pencil.beginPath();
            for (let i = 0; i < rock.points.length; i++) {
                const p = rock.points[i];
                if (i === 0) pencil.moveTo(p.x, p.y);
                else pencil.lineTo(p.x, p.y);
            }
            pencil.closePath();
            pencil.fill();
            pencil.stroke();

            pencil.restore();
        }
    }
}