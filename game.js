
let canvas;
let world;
let keyboard = new Keyboard();
let bgMusic = new Audio('audio/moonlight_in_mexico.mp3');
let fullscreen = false; 
let rotate;

/**
 * Initializes the game environment by checking orientation, setting up keyboard, and touch input.
 */
function init() {
    checkOrientation();
    keyboardFunction();
    touchFunction();
}

/**
 * Handles screen orientation changes and updates the UI accordingly.
 */
function checkOrientation() {
    window.addEventListener("orientationchange", checkOrientation);
    if (window.orientation === 0 || window.orientation === 180) {
        rotate = false;
        document.getElementById('rotatePhone').classList.remove('d-none');
        document.getElementById('playButtons').classList.add('d-none');
    } else if (window.orientation === 90 || window.orientation === -90) {
        rotate = true;
        document.getElementById('rotatePhone').classList.add('d-none');
    }
}

/**
 * Starts the game by initializing level 1, setting up the game canvas and world, 
 * and removing unnecessary UI elements.
 */
function startGame() {
    initLevel1();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setTimeout(() => {
        removeContainer();
    }, 500);
}

/**
 * Removes unnecessary UI elements when the game starts.
 */
function removeContainer() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('youWin').classList.add('d-none');
    document.getElementById('startButtons').classList.add('d-none');
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('endButtons').classList.add('d-none');
    document.getElementById('collectedCoins').innerHTML = '';
    if (rotate) {
        document.getElementById('playButtons').classList.remove('d-none');
    }
}

/**
 * Displays the home screen with the start buttons.
 */
function goToHome() {
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('startButtons').classList.remove('d-none');
}

/**
 * Toggles the background music on and off, and updates the music icon.
 */
function playMusic() {
    let musicOffPath = 'img/img/icons/music_off.png';
    let musicOnPath = 'img/img/icons/music_on.png';
    let imgElement = document.getElementById('iconMusic');
    if (imgElement.src.includes(musicOffPath)) {
        imgElement.src = musicOnPath;
        bgMusic.volume = 0.5;
        bgMusic.play();
    } else {
        imgElement.src = musicOffPath;
        bgMusic.pause();
    }
}

// ---------- FULLSCREEN HANDLING ---------- //

/**
 * Toggles between fullscreen and windowed mode.
 */
function openFullscreen() {
    if (!fullscreen) {
        checkFullscreen();
    } else {
        closeFullscreen();
    }
}

/**
 * Requests fullscreen mode for the game.
 */
function checkFullscreen() {
    let fullscreenElement = document.getElementById('fullscreen');
    let requestPromise;
    if (fullscreenElement.requestFullscreen) {
        requestPromise = fullscreenElement.requestFullscreen();
    } else if (fullscreenElement.webkitRequestFullscreen) { /* Safari */
        requestPromise = fullscreenElement.webkitRequestFullscreen();
    } else if (fullscreenElement.msRequestFullscreen) { /* IE11 */
        requestPromise = fullscreenElement.msRequestFullscreen();
    }
    if (requestPromise) {
        requestPromise.then(() => {
            document.getElementById('canvas').style.width = '100%';
            fullscreen = true;
        }).catch((err) => {
            console.error("Fullscreen request failed:", err);
        });
    }
}

/**
 * Exits fullscreen mode.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    document.getElementById('canvas').style.width = ''; // Reset width
    fullscreen = false;
}

// ---------- INFOBOX ---------- //

/**
 * Opens the infobox element, making it visible.
 */
function openInfobox() {
    document.getElementById('infobox').classList.remove('d-none');
}

/**
 * Closes the infobox element, hiding it from view.
 */
function closeInfobox() {
    document.getElementById('infobox').classList.add('d-none');
}

// ---------- KEYBOARD & TOUCH HANDLING ---------- //

/**
 * Sets up event listeners for keyboard input, capturing directional and action keys.
 */
function keyboardFunction() {
    window.addEventListener("keydown", (event) => {
        if (event.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (event.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (event.keyCode == 38) {
            keyboard.UP = true;
        }
        if (event.keyCode == 32) {
            keyboard.SPACE = true;
        }
    });
    window.addEventListener("keyup", (event) => {
        if (event.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (event.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (event.keyCode == 38) {
            keyboard.UP = false;
        }
        if (event.keyCode == 32) {
            keyboard.SPACE = false;
        }
    });
}

/**
 * Sets up event listeners for touch input, simulating directional and action keys.
 */
function touchFunction() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('btnUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('btnSpace').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnSpace').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}
