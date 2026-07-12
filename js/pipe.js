/**
 * Pipe.js - Pipe class with random gap positions for Flappy Bird game
 * 
 * Handles pipe generation, movement, and rendering.
 * Each pipe has a top and bottom section with a random gap.
 */

class Pipe {
    constructor(canvas, speed = 3, gapSize = 120) {
        this.canvas = canvas;
        this.width = 52;
        this.speed = speed;
        this.gapSize = gapSize;
        
        // Pipe position (x is set when spawned)
        this.x = canvas.width;
        
        // Random gap position
        this.gapY = this.calculateRandomGapY();
        
        // Pipe colors
        this.pipeColor = '#2ECC71'; // Green
        this.pipeBorderColor = '#27AE60'; // Darker green
        this.pipeHighlightColor = '#58D68D'; // Lighter green
        
        // Track if this pipe has been scored
        this.scored = false;
    }

    /**
     * Calculate random Y position for the gap
     * Ensures gap is within playable bounds
     * @returns {number} Y position for gap center
     */
    calculateRandomGapY() {
        const minGapY = 80; // Minimum gap center from top
        const maxGapY = this.canvas.height - 80 - this.gapSize; // Leave room at bottom
        return Math.random() * (maxGapY - minGapY) + minGapY;
    }

    /**
     * Update pipe position (move left)
     * Called every frame in the game loop
     */
    update() {
        this.x -= this.speed;
    }

    /**
     * Draw the pipe (top and bottom sections with gap)
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     */
    draw(ctx) {
        const topPipeHeight = this.gapY;
        const bottomPipeY = this.gapY + this.gapSize;
        const bottomPipeHeight = this.canvas.height - bottomPipeY;
        
        // Draw top pipe
        this.drawPipeSection(ctx, this.x, 0, this.width, topPipeHeight, true);
        
        // Draw bottom pipe
        this.drawPipeSection(ctx, this.x, bottomPipeY, this.width, bottomPipeHeight, false);
    }

    /**
     * Draw a single pipe section (top or bottom)
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} width - Pipe width
     * @param {number} height - Pipe height
     * @param {boolean} isTop - Whether this is the top pipe
     */
    drawPipeSection(ctx, x, y, width, height, isTop) {
        if (height <= 0) return;
        
        const capHeight = 24;
        const capOverhang = 4;
        
        // Draw pipe body
        ctx.fillStyle = this.pipeColor;
        ctx.fillRect(x, y, width, height);
        
        // Draw pipe highlight (left edge)
        ctx.fillStyle = this.pipeHighlightColor;
        ctx.fillRect(x, y, 6, height);
        
        // Draw pipe shadow (right edge)
        ctx.fillStyle = this.pipeBorderColor;
        ctx.fillRect(x + width - 6, y, 6, height);
        
        // Draw pipe cap
        const capY = isTop ? y + height - capHeight : y;
        ctx.fillStyle = this.pipeColor;
        ctx.fillRect(x - capOverhang, capY, width + capOverhang * 2, capHeight);
        
        // Cap highlight
        ctx.fillStyle = this.pipeHighlightColor;
        ctx.fillRect(x - capOverhang, capY, 6, capHeight);
        
        // Cap border
        ctx.fillStyle = this.pipeBorderColor;
        ctx.fillRect(x + width + capOverhang - 6, capY, 6, capHeight);
        
        // Cap top/bottom border
        ctx.fillStyle = this.pipeBorderColor;
        if (isTop) {
            ctx.fillRect(x - capOverhang, capY, width + capOverhang * 2, 4);
        } else {
            ctx.fillRect(x - capOverhang, capY + capHeight - 4, width + capOverhang * 2, 4);
        }
    }

    /**
     * Check if pipe is off screen (passed left edge)
     * @returns {boolean} True if pipe is off screen
     */
    isOffScreen() {
        return this.x + this.width < 0;
    }

    /**
     * Get bounding boxes for collision detection
     * @returns {Object} Bounding boxes for top and bottom pipes
     */
    getBoundingBoxes() {
        const topPipeHeight = this.gapY;
        const bottomPipeY = this.gapY + this.gapSize;
        const bottomPipeHeight = this.canvas.height - bottomPipeY;
        const capHeight = 24;
        const capOverhang = 4;
        
        return {
            top: {
                x: this.x - capOverhang,
                y: 0,
                width: this.width + capOverhang * 2,
                height: topPipeHeight + capHeight
            },
            bottom: {
                x: this.x - capOverhang,
                y: bottomPipeY - capHeight,
                width: this.width + capOverhang * 2,
                height: bottomPipeHeight + capHeight
            }
        };
    }

    /**
     * Check if bird passes the pipe (for scoring)
     * @param {Bird} bird - The bird object
     * @returns {boolean} True if bird passed this pipe
     */
    checkScore(bird) {
        if (!this.scored && bird.x > this.x + this.width) {
            this.scored = true;
            return true;
        }
        return false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Pipe;
}
