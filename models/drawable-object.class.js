class DrawableObject {
    width = 100;
    height = 150;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    offsetY = 0;
    x = 100;
    y = 95;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path.
     * 
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the image on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from an array of paths and caches them.
     * 
     * @param {string[]} array - An array of image paths.
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a border around the drawable object for debugging purposes.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    drawBorder(ctx) {
        if (this.objects()) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - (this.offset.left + this.offset.right),
                this.height - (this.offset.top + this.offset.bottom)
            );
            ctx.stroke();
        }
    }

    /**
     * Checks if the object is an instance of one of the drawable object subclasses.
     * 
     * @returns {boolean} - Returns true if the object is an instance of a drawable subclass, otherwise false.
     */
    objects() {
        return this instanceof Character ||
               this instanceof Chicken ||
               this instanceof Chick ||
               this instanceof Coin ||
               this instanceof Bottle ||
               this instanceof ThrowableObject ||
               this instanceof Endboss;
    }
}
