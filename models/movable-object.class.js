class MovableObject extends DrawableObject {
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    offsetY = 0;
    speed = 0.10;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    coin = 0;
    lastHit = 0;
    active = true;
    throwableObjects = [];
    isHurtCoolingDown = false;
    coin_sound = new Audio('./audio/coin.mp3');
    pickup_bottle_sound = new Audio('./audio/pickup_bottle.mp3');

    /**
     * Applies gravity to the object, causing it to fall unless it is on the ground.
     * This method runs at a set interval to simulate continuous gravity.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Determines if the object is above the ground.
     * Special case for throwable objects, which are always considered above ground.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 195;
        }
    }

    /**
     * Plays an animation by cycling through a series of images.
     * @param {string[]} images - The array of image paths to cycle through.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} - True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's energy when hit and records the time of the hit.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently hurt (within the cooldown period after being hit).
     * @returns {boolean} - True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 800;
        return timepassed < 0.8;
    }

    /**
     * Checks if the object is dead (energy is 0).
     * @returns {boolean} - True if the object is dead, false otherwise.
     */
    isDeath() {
        return this.energy == 0;
    }

    /**
     * Increases the coin count by 1 and plays the coin pickup sound.
     */
    pickCoin() {
        this.coin += 1;
        if (soundOn) {
            this.coin_sound.play();
        }
    }

    /**
     * Plays the bottle pickup sound.
     */
    pickBottle() {
        if (soundOn) {
            this.pickup_bottle_sound.play();
        }
    }

    /**
     * Executes a function with a cooldown period to prevent rapid repeated actions.
     * @param {Function} callback - The function to execute.
     * @param {number} cooldownTime - The cooldown period in milliseconds.
     */
    playFunctionWithCooldown(callback, cooldownTime) {
        if (!this.isCoolingDown) {
            callback();
            this.isCoolingDown = true;
            setTimeout(() => {
                this.isCoolingDown = false;  
            }, cooldownTime);
        }
    }

    /**
     * Handles the hurt animation and sound with a cooldown to prevent repeated triggering.
     */
    handleHurt() {
        if (!this.isHurtCoolingDown) {
            this.playAnimation(this.IMAGES_HURT);
            if (soundOn) {
                this.hurt_sound.play();
            }
            this.isHurtCoolingDown = true;
            setTimeout(() => {
                this.isHurtCoolingDown = false; 
            }, 1000);
        }
    }

    /**
     * Handles the death sequence for an enemy, including playing the death animation and sound.
     * Repeats the animation until the game ends or the death timer expires.
     */
    enemyIsDeath() {
        let animationIntervall = setInterval(() => {
            if (world.gameEnd == true) {
                clearInterval(animationIntervall);
            }
            
            if (!this.active) {
                this.loadImage(this.IMAGE_DEAD);
                if (!this.deathTimer) {
                    this.deathTimer = setTimeout(() => {
                        this.active = false;
                        this.deathTimer = null;
                    }, 5000);
                }
                if (!this.soundPlayed && soundOn) {
                    this.dead_sound.play();
                    this.soundPlayed = true;
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 120);
    }
}
