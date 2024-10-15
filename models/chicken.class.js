class Chicken extends MovableObject {
    y = 345;
    height = 80;
    width = 80;
    IMAGES_WALKING = [
        './img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = 'img/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    offset = {
        top: 0,
        right: 20,
        bottom: 0,
        left: 20
    };
    offsetY = 0;
    dead_sound = new Audio('./audio/chicken_dead.mp3');
    soundPlayed = false;

    /**
     * Constructor for the `Chicken` class.
     * Initializes the chicken by loading images, setting its position, and starting animations.
     * 
     * @param {number} x - The x-coordinate for the chicken's initial position.
     */
    constructor(x) {
        super().loadImage('./img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.speed = 0.13 + Math.random() * 0.5; // Set a random speed for the chicken
        this.animation();
    }

    /**
     * Starts the animations for the chicken.
     */
    animation() {
        this.chickenMoveLeft();
        this.enemyIsDeath(); // Assumes this method handles the chicken's death animation
    }

    /**
     * Moves the chicken to the left if it is active.
     */
    chickenMoveLeft() {
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
