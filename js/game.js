/**
 * Game.js - Main game loop and state management for Flappy Bird
 * 
 * Handles game states (START, PLAYING, GAME_OVER), collision detection,
 * score tracking, and rendering.
 */

class Game {
    /**
     * Initialize the game
     * @param {string} canvasId - ID of the canvas element
     */
    constructor(canvasId) {
        // Get canvas and context
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        
        // Game constants
        this.PIPE_SPEED = 3;
        this.PIPE_GAP = 120;
        this.PIPE_SPAWN_INTERVAL = 1500; // ms
        
        // Game state
        this.STATES = {
            START: 'START',
            PLAYING: 'PLAYING',
            GAME_OVER: 'GAME_OVER'
        };
        this.state = this.STATES.START;
        
        // Score
        this.score = 0;
        this.highScore = this.loadHighScore();
        
        // Game objects
        this.bird = new Bird(this.canvas);
        this.pipes = [];
        this.lastPipeSpawn = 0;
        
        // Input handling
        this.inputHandler = new InputHandler(this.canvas, () => this.handleInput());
        
        // Ground position
        this.groundHeight = 80;
        
        // Background gradient colors
        this.skyColorTop = '#87CEEB';
        this.skyColorBottom = '#E0F6FF';
        
        // Animation frame ID
        this.animationId = null;
        
        // Start the game loop
        this.gameLoop = this.gameLoop.bind(this);
        this.start();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Resize canvas to fit window
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Update ground height based on canvas size
        this.groundHeight = Math.min(80, this.canvas.height * 0.12);
        
        // Reset bird position if game hasn't started
        if (this.state === this.STATES.START) {
            this.bird = new Bird(this.canvas);
        }
    }

    /**
     * Start the game
     */
    start() {
        this.state = this.STATES.START;
        this.score = 0;
        this.pipes = [];
        this.bird.reset();
        this.lastPipeSpawn = 0;
        
        // Start game loop
        if (!this.animationId) {
            this.gameLoop();
        }
    }

    /**
     * Main game loop using requestAnimationFrame
     */
    gameLoop(timestamp) {
        // Clear canvas
        this.clear();
        
        // Update and draw based on state
        switch (this.state) {
            case this.STATES.START:
                this.updateStart();
                this.drawStart();
                break;
            case this.STATES.PLAYING:
                this.updatePlaying(timestamp);
                this.drawPlaying();
                break;
            case this.STATES.GAME_OVER:
                this.updateGameOver();
                this.drawGameOver();
                break;
        }
        
        // Continue loop
        this.animationId = requestAnimationFrame(this.gameLoop);
    }

    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Handle input based on current state
     */
    handleInput() {
        switch (this.state) {
            case this.STATES.START:
                this.state = this.STATES.PLAYING;
                this.bird.flap();
                break;
            case this.STATES.PLAYING:
                this.bird.flap();
                break;
            case this.STATES.GAME_OVER:
                this.start(); // Restart game
                break;
        }
    }

    // ==================== START STATE ====================

    /**
     * Update for start state
     */
    updateStart() {
        // Gentle bobbing animation for bird
        this.bird.y = this.canvas.height / 2 + Math.sin(Date.now() / 200) * 10;
    }

    /**
     * Draw for start state
     */
    drawStart() {
        // Draw background
        this.drawBackground();
        
        // Draw ground
        this.drawGround();
        
        // Draw bird
        this.bird.draw(this.ctx);
        
        // Draw start message
        this.drawStartScreen();
    }

    /**
     * Draw the start screen
     */
    drawStartScreen() {
        const ctx = this.ctx;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Title
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 48px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('FLAPPY BIRD', centerX, centerY - 80);
        
        // Instruction
        ctx.fillStyle = '#34495E';
        ctx.font = '24px Arial, sans-serif';
        ctx.fillText('Tap or Press Space to Start', centerX, centerY + 60);
        
        // High score
        if (this.highScore > 0) {
            ctx.fillStyle = '#E74C3C';
            ctx.font = '20px Arial, sans-serif';
            ctx.fillText(`Best: ${this.highScore}`, centerX, centerY + 100);
        }
    }

    // ==================== PLAYING STATE ====================

    /**
     * Update for playing state
     * @param {number} timestamp - Current timestamp from requestAnimationFrame
     */
    updatePlaying(timestamp) {
        // Update bird
        this.bird.update();
        
        // Spawn pipes
        if (timestamp - this.lastPipeSpawn > this.PIPE_SPAWN_INTERVAL) {
            this.spawnPipe();
            this.lastPipeSpawn = timestamp;
        }
        
        // Update pipes
        this.pipes.forEach(pipe => pipe.update());
        
        // Check for scored pipes
        this.pipes.forEach(pipe => {
            if (pipe.checkScore(this.bird)) {
                this.score++;
            }
        });
        
        // Remove off-screen pipes
        this.pipes = this.pipes.filter(pipe => !pipe.isOffScreen());
        
        // Check collisions
        if (this.checkCollisions()) {
            this.gameOver();
        }
        
        // Check if bird hits ground
        if (this.bird.y + this.bird.height > this.canvas.height - this.groundHeight) {
            this.gameOver();
        }
        
        // Check if bird hits ceiling
        if (this.bird.y < 0) {
            this.bird.y = 0;
            this.bird.velocity = 0;
        }
    }

    /**
     * Spawn a new pipe
     */
    spawnPipe() {
        const pipe = new Pipe(this.canvas, this.PIPE_SPEED, this.PIPE_GAP);
        this.pipes.push(pipe);
    }

    /**
     * Check for collisions between bird and pipes or ground
     * @returns {boolean} True if collision detected
     */
    checkCollisions() {
        const birdBox = this.bird.getBoundingBox();
        
        for (const pipe of this.pipes) {
            const boxes = pipe.getBoundingBoxes();
            
            // Check top pipe
            if (this.boxCollision(birdBox, boxes.top)) {
                return true;
            }
            
            // Check bottom pipe
            if (this.boxCollision(birdBox, boxes.bottom)) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Simple box collision detection
     * @param {Object} box1 - First bounding box
     * @param {Object} box2 - Second bounding box
     * @returns {boolean} True if boxes overlap
     */
    boxCollision(box1, box2) {
        return box1.x < box2.x + box2.width &&
               box1.x + box1.width > box2.x &&
               box1.y < box2.y + box2.height &&
               box1.y + box1.height > box2.y;
    }

    /**
     * Draw for playing state
     */
    drawPlaying() {
        // Draw background
        this.drawBackground();
        
        // Draw pipes
        this.pipes.forEach(pipe => pipe.draw(this.ctx));
        
        // Draw ground
        this.drawGround();
        
        // Draw bird
        this.bird.draw(this.ctx);
        
        // Draw score
        this.drawScore();
    }

    /**
     * Draw the score
     */
    drawScore() {
        const ctx = this.ctx;
        
        // Draw score with shadow
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 40px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(this.score.toString(), this.canvas.width / 2 + 2, 62);
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(this.score.toString(), this.canvas.width / 2, 60);
    }

    // ==================== GAME OVER STATE ====================

    /**
     * Handle game over
     */
    gameOver() {
        this.state = this.STATES.GAME_OVER;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore(this.highScore);
        }
    }

    /**
     * Update for game over state
     */
    updateGameOver() {
        // Bird falls to ground
        if (this.bird.y + this.bird.height < this.canvas.height - this.groundHeight) {
            this.bird.velocity += this.bird.gravity;
            this.bird.y += this.bird.velocity;
        } else {
            this.bird.y = this.canvas.height - this.groundHeight - this.bird.height;
            this.bird.velocity = 0;
        }
    }

    /**
     * Draw for game over state
     */
    drawGameOver() {
        // Draw background
        this.drawBackground();
        
        // Draw pipes
        this.pipes.forEach(pipe => pipe.draw(this.ctx));
        
        // Draw ground
        this.drawGround();
        
        // Draw bird
        this.bird.draw(this.ctx);
        
        // Draw game over screen
        this.drawGameOverScreen();
    }

    /**
     * Draw the game over screen
     */
    drawGameOverScreen() {
        const ctx = this.ctx;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Game Over text
        ctx.fillStyle = '#E74C3C';
        ctx.font = 'bold 48px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', centerX, centerY - 60);
        
        // Score
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 36px Arial, sans-serif';
        ctx.fillText(`Score: ${this.score}`, centerX, centerY);
        
        // High score
        ctx.fillStyle = '#F7DC6F';
        ctx.font = '24px Arial, sans-serif';
        ctx.fillText(`Best: ${this.highScore}`, centerX, centerY + 40);
        
        // New high score indicator
        if (this.score === this.highScore && this.score > 0) {
            ctx.fillStyle = '#2ECC71';
            ctx.font = 'bold 20px Arial, sans-serif';
            ctx.fillText('NEW BEST!', centerX, centerY + 75);
        }
        
        // Restart instruction
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '20px Arial, sans-serif';
        ctx.fillText('Tap or Press Space to Restart', centerX, centerY + 120);
    }

    // ==================== DRAWING HELPERS ====================

    /**
     * Draw background with gradient sky
     */
    drawBackground() {
        const ctx = this.ctx;
        const groundY = this.canvas.height - this.groundHeight;
        
        // Sky gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, groundY);
        gradient.addColorStop(0, this.skyColorTop);
        gradient.addColorStop(1, this.skyColorBottom);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, groundY);
        
        // Draw clouds
        this.drawClouds();
    }

    /**
     * Draw decorative clouds
     */
    drawClouds() {
        const ctx = this.ctx;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        // Simple cloud shapes
        const clouds = [
            { x: this.canvas.width * 0.1, y: 60, size: 40 },
            { x: this.canvas.width * 0.3, y: 100, size: 30 },
            { x: this.canvas.width * 0.7, y: 50, size: 50 },
            { x: this.canvas.width * 0.85, y: 120, size: 35 }
        ];
        
        clouds.forEach(cloud => {
            ctx.beginPath();
            ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
            ctx.arc(cloud.x + cloud.size * 0.6, cloud.y - cloud.size * 0.3, cloud.size * 0.7, 0, Math.PI * 2);
            ctx.arc(cloud.x + cloud.size * 1.2, cloud.y, cloud.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    /**
     * Draw the ground
     */
    drawGround() {
        const ctx = this.ctx;
        const groundY = this.canvas.height - this.groundHeight;
        
        // Ground base
        ctx.fillStyle = '#DEB887'; // Sandy brown
        ctx.fillRect(0, groundY, this.canvas.width, this.groundHeight);
        
        // Grass top
        ctx.fillStyle = '#2ECC71'; // Green grass
        ctx.fillRect(0, groundY, this.canvas.width, 15);
        
        // Grass detail
        ctx.fillStyle = '#27AE60';
        for (let i = 0; i < this.canvas.width; i += 20) {
            ctx.fillRect(i, groundY, 10, 5);
        }
    }

    // ==================== LOCAL STORAGE ====================

    /**
     * Load high score from localStorage
     * @returns {number} High score
     */
    loadHighScore() {
        try {
            const saved = localStorage.getItem('flappyBirdHighScore');
            return saved ? parseInt(saved, 10) : 0;
        } catch (e) {
            return 0;
        }
    }

    /**
     * Save high score to localStorage
     * @param {number} score - Score to save
     */
    saveHighScore(score) {
        try {
            localStorage.setItem('flappyBirdHighScore', score.toString());
        } catch (e) {
            // Ignore storage errors
        }
    }

    /**
     * Clean up game resources
     */
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.inputHandler.destroy();
        window.removeEventListener('resize', this.resizeCanvas);
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game('gameCanvas');
});
