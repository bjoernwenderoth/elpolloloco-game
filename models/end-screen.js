/**
 * Checks the game state at regular intervals to show the end screen.
 */
function checkEndScreen() {
    endScreenInterval = setInterval(() => {
        if (world.gameEnd) {
            world.gameLost ? gameLost(endScreenInterval) : gameWin(endScreenInterval);
        }
    }, 100);
}

/**
 * Shows the game over screen and hides the play buttons.
 * 
 * @param {number} endScreenInterval - Interval ID to clear.
 */
function gameLost(endScreenInterval) {
    document.getElementById('endScreen').classList.remove('d-none');
    document.getElementById('gameOver').classList.remove('d-none');
    document.getElementById('endButtons').classList.remove('d-none');
    document.getElementById('endButtons').classList.add('d-flex');
    document.getElementById('playButtons').classList.add('d-none');
    clearInterval(endScreenInterval);
}

/**
 * Shows the win screen, updates the coin display, and hides the play buttons.
 * 
 * @param {number} endScreenInterval - Interval ID to clear.
 */
function gameWin(endScreenInterval) {
    document.getElementById('endScreen').classList.remove('d-none');
    document.getElementById('youWin').classList.remove('d-none');
    document.getElementById('endButtons').classList.remove('d-none');
    document.getElementById('endButtons').classList.add('d-flex');
    document.getElementById('playButtons').classList.add('d-none');
    document.getElementById('collectedCoins').innerHTML = `
    <img src="img/img/8_coin/coin_endscreen.png" alt="coin">
    <h4>${world.character.coin} von 10</h4>
    `;
    clearInterval(endScreenInterval);
}
