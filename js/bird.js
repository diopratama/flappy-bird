/**
 * Bird.js - Bird class with physics for Flappy Bird game
 * 
 * Handles bird position, velocity, gravity, and flapping mechanics.
 * Physics constants: gravity ~0.5, jump velocity ~-8
 */

class Bird {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 34;
        this.height = 24;
        this.x = canvas.width * 0.2; // Position at 20% of canvas width
        
        // Center vertically initially
        this.y = canvas.height / 2;
        
        // Physics properties
        this.velocity = 0;
        this.gravity = 0.5;
        this.jumpStrength = -8;
        
        // Rotation for visual effect
        this.rotation = 0;
        
        // Bird color
        this.color = '#F7DC6F'; // Yellow bird
        this.wingColor = '#F39C12'; // Orange wing
        this.beakColor = '#E74C3C'; // Red beak
        this.eyeColor = '#2C3E50'; // Dark eye
    }

    /**
     * Update bird position based on physics
     * Called every frame in the game loop
     */
    update() {
        // Apply gravity
        this.velocity += this.gravity;
        
        // Update position
        this.y += this.velocity;
        
        // Calculate rotation based on velocity
        // Bird tilts up when jumping, down when falling
        this.rotation = Math.min(Math.max(this.velocity * 3, -30), 90);
    }

    /**
     * Make the bird flap (jump)
     * Resets velocity to jump strength
     */
    flap() {
        this.velocity = this.jumpStrength;
    }

    /**
     * Draw the bird on the canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        ctx.save();
        
        // Move to bird center for rotation
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation * Math.PI / 180);
        
        // Draw body (oval shape)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw wing
        ctx.fillStyle = this.wingColor;
        ctx.beginPath();
        ctx.ellipse(-5, 3, 8, 6, -0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw beak
        ctx.fillStyle = this.beakColor;
        ctx.beginPath();
        ctx.moveTo(this.width / 2 - 2, 0);
        ctx.lineTo(this.width / 2 + 8, -3);
        ctx.lineTo(this.width / 2 + 8, 3);
        ctx.closePath();
        ctx.fill();
        
        // Draw eye (white part)
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(6, -4, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw pupil
        ctx.fillStyle = this.eyeColor;
        ctx.beginPath();
        ctx.arc(8, -4, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    /**
     * Get bounding box for collision detection
     * @returns {Object} Bounding box with x, y, width, height
     */
    getBoundingBox() {
        return {
            x: this.x + 4, // Slightly smaller hitbox
            y: this.y + 4,
            width: this.width - 8,
            height: this.height - 8
        };
    }

    /**
     * Reset bird to initial position
     */
    reset() {
        this.y = this.canvas.height / 2;
        this.velocity = 0;
        this.rotation = 0;
    }

    /**
     * Check if bird hits the ground or ceiling
     * @returns {boolean} True if bird is out of bounds
     */
    isOutOfBounds() {
        return this.y + this.height > this.canvas.height || this.y < 0;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Bird;
}
