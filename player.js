export class Player {
    constructor() {
        // Ship starts at center of 600x600 canvas
        this.x = 300;
        this.y = 300;
        this.angle = 0;     // Rotation in radians (0 = pointing right)
        this.size = 20;     // Scale of the ship
    }

    draw(pencil) {
        pencil.save();                 // Save current canvas state (position, rotation, etc.)
        
        pencil.translate(this.x, this.y);  // Move origin to ship center
        pencil.rotate(this.angle);         // Rotate around center
        
        // Ship body: simple triangle (nose forward)
        pencil.fillStyle = "#555";         // Dark gray body
        pencil.strokeStyle = "#000";       // Black outline
        pencil.lineWidth = 2;
        
        pencil.beginPath();
        pencil.moveTo(0, -this.size);      // Nose (top point)
        pencil.lineTo(-this.size / 2, this.size / 2);  // Left wing
        pencil.lineTo(this.size / 2, this.size / 2);   // Right wing
        pencil.closePath();
        
        pencil.fill();     // Solid fill
        pencil.stroke();   // Outline for crisp edges
        
        pencil.restore();  // Reset canvas to original state
    }

    update() {
        // Empty for now - we'll add movement/keys later
    }
}