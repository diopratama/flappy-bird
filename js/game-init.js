/**
 * Game initialization helper - handles both DOMContentLoaded and immediate execution
 */

(function() {
    function initGame() {
        if (window.game) return; // Already initialized
        
        window.game = new Game('gameCanvas');
        console.log('Game initialized');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGame);
    } else {
        // DOM is already ready
        initGame();
    }
})();
