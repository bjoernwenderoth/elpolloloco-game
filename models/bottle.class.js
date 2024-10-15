
class Bottle extends MovableObject {
    width = 100;
    height = 100;
    offset = {
        top: 15,
        right: 40,
        bottom: 10,
        left: 40
    };
    offsetY = 0;
    IMAGES_BOTTLE = [
        'img/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]

    /**
     * Constructor for the `Bottle` class.
     * Initializes the bottle's position and starts its animation.
     * 
     * @param {number} x - The x-coordinate for the bottle's initial position.
     * @param {number} y - The y-coordinate for the bottle's initial position.
     */
    constructor(x, y) {
        super().loadImage('./img/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'); // Load the initial image of the bottle
        this.loadImages(this.IMAGES_BOTTLE); // Load the array of bottle images
        this.x = x; // Set the x-coordinate
        this.y = y; // Set the y-coordinate
        this.animation(); // Start the bottle's animation
    };

    /**
     * Animates the bottle by repeatedly playing the image sequence defined in `IMAGES_BOTTLE`.
     * The animation interval is set to 300 milliseconds.
     */
    animation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 300);
    };
};
