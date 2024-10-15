class Cloud extends MovableObject {
    y = 10;
    width = 600;
    height = 350;
    speed = 0.23;

    /**
     * Constructor for the `Cloud` class.
     * Initializes the cloud by loading an image, setting a random x-coordinate, and starting the animation.
     */
    constructor() {
        super().loadImage('./img/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 4000;
        this.animation();
    }

    /**
     * Starts the cloud's movement animation.
     * Moves the cloud to the left at a set interval.
     */
    animation() {
        let animationIntervall = setInterval(() => {
            this.moveLeft();
            if (world.gameEnd) {
                clearInterval(animationIntervall);
            }
        }, 50);
    }
}
