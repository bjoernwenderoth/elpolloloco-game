class Chick extends MovableObject {
    width = 50;
    height = 50;
    offset = {
        top: -10,
        right: 25,
        bottom: -10,
        left: 25,
    };
    offsetY = 0;
    y = 372;
    IMAGES_WALKING = [
        'img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGE_DEAD = 'img/img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    dead_sound = new Audio('audio/chick_dead.mp3');
    soundPlayed = false;

    /**
     * Constructor for the `Chick` class.
     * Initializes the chicken by loading images, setting its position, and starting animations.
     * 
     * @param {number} x - The x-coordinate for the chicken's initial position.
     */
    constructor(x) {
        super().loadImage('./img/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.speed = 0.13 + Math.random() * 0.5; // Set a random speed for the chicken
        this.animation();
    }

    /**
     * Starts the animations for the chicken.
     */
    animation() {
        this.chickMoveLeft();
        this.enemyIsDeath(); // Assumes this method handles the chicken's death animation
    }

    /**
     * Moves the chicken to the left if it is active.
     */
    chickMoveLeft() {
        let animationIntervall = setInterval(() => {
            if (world.gameEnd) {
                clearInterval(animationIntervall); // Stop the interval if the game ends
            }
            if (this.active) {
                this.moveLeft();
            }
        }, 1000 / 60); // Update at 60 FPS
    }
}
