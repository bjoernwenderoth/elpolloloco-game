class StatusBarLife extends DrawableObject {

    percentage = 100;
    IMAGES_LIFEBAR = [
        'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',   // 0% health
        'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',  // 20% health
        'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',  // 40% health
        'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',  // 60% health
        'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',  // 80% health
        'img/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'  // 100% health
    ];

    
    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFEBAR);
        this.x = 30;       // X-coordinate position on the screen
        this.y = 0;        // Y-coordinate position on the screen
        this.width = 220;  // Width of the life bar
        this.height = 65;  // Height of the life bar
        this.setPercentage(100); // Start with full health
    }

    /**
     * Sets the life bar to a specific health percentage.
     * Updates the displayed image based on the current health percentage.
     * @param {number} percentage - The health percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage; // Update the health percentage
        let path = this.IMAGES_LIFEBAR[this.resolveImageIndex()]; // Get the appropriate image path
        this.img = this.imageCache[path]; // Update the image to the appropriate life bar image
    }

    /**
     * Resolves the index of the image to be displayed based on the current health percentage.
     * @returns {number} - The index of the image in the IMAGES_LIFEBAR array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5; // Index for 100% health image
        } else if (this.percentage > 79) {
            return 4; // Index for 80% health image
        } else if (this.percentage > 59) {
            return 3; // Index for 60% health image
        } else if (this.percentage > 39) {
            return 2; // Index for 40% health image
        } else if (this.percentage > 19) {
            return 1; // Index for 20% health image
        } else {
            return 0; // Index for 0% health image
        }
    }
}
