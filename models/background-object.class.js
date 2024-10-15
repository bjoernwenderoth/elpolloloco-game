class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Constructor for the `BackgroundObject` class.
     * Initializes the background object with a specific image and position.
     * 
     * @param {string} imagePath - The file path to the background image.
     * @param {number} x - The x-coordinate for the background object's position.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath); // Load the background image
        this.x = x; // Set the x-coordinate
        this.y = 480 - this.height; // Set the y-coordinate to position the object at the bottom of the canvas
    }
}
