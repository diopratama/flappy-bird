/**
 * Input.js - Input handling for Flappy Bird game
 * 
 * Handles keyboard (spacebar), mouse (click), and touch (tap) inputs.
 * All inputs trigger the same flap action.
 */

class InputHandler {
    /**
     * Initialize input handler
     * @param {HTMLCanvasElement} canvas - The game canvas
     * @param {Function} onFlap - Callback function when flap action triggered
     */
    constructor(canvas, onFlap) {
        this.canvas = canvas;
        this.onFlap = onFlap;
        
        // Bind methods to preserve context
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        
        // Initialize event listeners
        this.init();
    }

    /**
     * Set up all event listeners
     */
    init() {
        // Keyboard input (Spacebar)
        document.addEventListener('keydown', this.handleKeyDown);
        
        // Mouse click
        this.canvas.addEventListener('click', this.handleClick);
        
        // Touch input (for mobile)
        this.canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        
        // Also handle touch on document for better mobile support
        document.addEventListener('touchstart', (e) => {
            // Only trigger if touch is on canvas or game area
            if (e.target === this.canvas || e.target.closest('#gameContainer')) {
                this.handleTouchStart(e);
            }
        }, { passive: false });
    }

    /**
     * Handle keyboard input
     * @param {KeyboardEvent} event 
     */
    handleKeyDown(event) {
        // Spacebar or ArrowUp to flap
        if (event.code === 'Space' || event.code === 'ArrowUp') {
            event.preventDefault(); // Prevent page scroll
            this.triggerFlap();
        }
        
        // Enter key to restart (when game over)
        if (event.code === 'Enter') {
            event.preventDefault();
            this.triggerFlap();
        }
    }

    /**
     * Handle mouse click
     * @param {MouseEvent} event 
     */
    handleClick(event) {
        event.preventDefault();
        this.triggerFlap();
    }

    /**
     * Handle touch input
     * @param {TouchEvent} event 
     */
    handleTouchStart(event) {
        // Prevent default to avoid scrolling/zooming
        event.preventDefault();
        event.stopPropagation();
        
        // Prevent double-tap zoom on iOS
        event.preventDefault();
        
        this.triggerFlap();
    }

    /**
     * Trigger the flap action via callback
     */
    triggerFlap() {
        if (typeof this.onFlap === 'function') {
            this.onFlap();
        }
    }

    /**
     * Remove all event listeners (for cleanup)
     */
    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
        this.canvas.removeEventListener('click', this.handleClick);
        this.canvas.removeEventListener('touchstart', this.handleTouchStart);
    }

    /**
     * Enable input handling
     */
    enable() {
        this.canvas.style.pointerEvents = 'auto';
    }

    /**
     * Disable input handling (during game over screen, etc.)
     */
    disable() {
        this.canvas.style.pointerEvents = 'none';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InputHandler;
}
