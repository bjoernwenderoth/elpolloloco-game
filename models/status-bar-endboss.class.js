class StatusBarEndboss extends DrawableObject {
    percentage = 100;
    IMAGES_LIFEBAR = [
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_LIFEBAR);
        this.x = 460;
        this.y = 6;
        this.width = 220;
        this.height = 65;
        this.setPercentage(100);
    }

    /**
     * Updates the status bar based on the current health percentage.
     * @param {number} percentage - The new health percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFEBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the appropriate image index based on the current health percentage.
     * @returns {number} - The index of the image to display.
     */
    resolveImageIndex() {
        if (this.percentage === 100) return 5;
        if (this.percentage > 79) return 4;
        if (this.percentage > 59) return 3;
        if (this.percentage > 39) return 2;
        if (this.percentage > 19) return 1;
        return 0;
    }
}
