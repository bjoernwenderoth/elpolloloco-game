class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLife = new StatusBarLife();
    statusBarEndboss = new StatusBarEndboss();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObjects = [];
    bottleScore = 0;
    bottle;
    lastHitTime = 0;
    gameEnd = false;
    gameLost = false;

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     */
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        checkEndScreen();
        this.lastThrowTime = 0;
    }

    /**
     * Links the world instance to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop, checking for collisions and handling object throws.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.bottleHitEndboss();
            this.bottleHitEnemy();
        }, 20);
        setInterval(() => {
            this.checkThrowObjects();
        }, 200);
    }

    /**
     * Checks if the player can throw an object, and if so, initiates the throw.
     */
    checkThrowObjects() {
        let currentTime = Date.now();
        let timeSinceLastThrow = currentTime - this.lastThrowTime;
        if (this.keyboard.SPACE && this.bottleScore > 0 && timeSinceLastThrow >= 800) {
            this.throwBottle();
            this.lastThrowTime = currentTime;
        }
    }

    /**
     * Creates a new throwable object and updates the bottle score.
     */
    throwBottle() {
        this.bottle = new ThrowableObject(this.character.x + 50, this.character.y + 70);
        this.throwableObjects.push(this.bottle);
        this.bottleScore -= 1;
        this.statusBarBottle.setPercentage(this.bottleScore);
    }

    /**
     * Checks for collisions between the character and various game objects.
     */
    checkCollisions() {
        this.checkCollisionWithEnemy();
        this.checkCollisionWithCoin();
        this.checkCollisionWithBottle();
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisionWithEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            this.enemyIsDeath(enemy, index);
            this.characterGetsDamage(enemy);
        });
    }

    /**
     * Handles enemy death when collided by the character from above.
     * @param {Enemy} enemy - The enemy object.
     * @param {number} index - The index of the enemy in the array.
     */
    enemyIsDeath(enemy, index) {
        if (index !== 0 && enemy.active) {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                enemy.isDeath();
                enemy.active = false;
                this.removeDeadEnemy(enemy);
            }
        }
    }

    /**
     * Removes the dead enemy from the game after a delay.
     * @param {Enemy} enemy - The enemy object to remove.
     */
    removeDeadEnemy(enemy) {
        setTimeout(() => {
            let newIndex = this.level.enemies.indexOf(enemy);
            if (newIndex !== -1) {
                this.level.enemies.splice(newIndex, 1);
            }
        }, 1000);
    }

    /**
     * Handles the character taking damage when colliding with an enemy.
     * @param {Enemy} enemy - The enemy object.
     */
    characterGetsDamage(enemy) {
        if (this.character.isColliding(enemy) && enemy.active) {
            if (this.canTakeDamage()) {
                this.character.hit();
                this.statusBarLife.setPercentage(this.character.energy);
                if (this.character.energy === 0) {
                    this.character.isDeath();
                }
            }
        }
    }

    /**
     * Checks for collisions between the character and coins.
     */
    checkCollisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let i = this.level.coins.indexOf(coin);
                this.character.pickCoin(coin);
                this.statusBarCoin.setPercentage(this.character.coin);
                this.level.coins.splice(i, 1);
            }
        });
    }

    /**
     * Checks for collisions between the character and bottles.
     */
    checkCollisionWithBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.bottleScore < 10) {
                let i = this.level.bottles.indexOf(bottle);
                this.bottleScore++;
                this.character.pickBottle();
                this.statusBarBottle.setPercentage(this.bottleScore);
                this.level.bottles.splice(i, 1);
            }
        });
    }

    /**
     * Checks if a throwable bottle has hit an enemy.
     */
    bottleHitEnemy() {
        this.throwableObjects.forEach((throwableBottle) => {
            this.level.enemies.forEach((enemy) => {
                let i = this.level.enemies.indexOf(enemy);
                if (enemy.isColliding(throwableBottle) && throwableBottle.active && enemy.active) {
                    enemy.isDeath();
                    enemy.active = false;
                    this.removeDeadEnemy(enemy);
                    this.removeBottle(throwableBottle);
                }
            });
        });
    }

    /**
     * Checks if a throwable bottle has hit the endboss.
     */
    bottleHitEndboss() {
        this.throwableObjects.forEach((throwableBottle) => {
            let endboss = this.level.enemies[0];
            if (endboss.isColliding(throwableBottle) && throwableBottle.active) {
                endboss.hit();
                endboss.isHurt();
                this.statusBarEndboss.setPercentage(endboss.energy);
                this.endbossLevelUp(endboss);
                this.endbossIsDeath(endboss);
                this.removeBottle(throwableBottle);
            }
        });
    }

    /**
     * Shrinks the endboss when hit by a bottle.
     * @param {Endboss} endboss - The endboss object.
     */
    endbossLevelUp(endboss) {
        endboss.width -= 50;
        endboss.height -= 50;
        endboss.x += 50;
        endboss.y += 50;
    }

    /**
     * Removes a throwable bottle from the game after it has splashed.
     * @param {ThrowableObject} throwableBottle - The throwable bottle object.
     */
    removeBottle(throwableBottle) {
        throwableBottle.splash();
        throwableBottle.active = false;
        setTimeout(() => {
            this.throwableObjects.splice(this.throwableObjects.indexOf(throwableBottle), 1);
        }, 500);
    }

    /**
     * Handles the endboss's death condition.
     * @param {Endboss} endboss - The endboss object.
     */
    endbossIsDeath(endboss) {
        if (endboss.energy === 0) {
            endboss.active = false;
            endboss.isDeath();
            document.getElementById('endScreen').classList.remove('d-none');
        }
    }

    /**
     * Determines if the character can take damage based on time since the last hit.
     * @returns {boolean} - True if the character can take damage, false otherwise.
     */
    canTakeDamage() {
        let currentTime = new Date().getTime();
        let timeSinceLastHit = currentTime - this.lastHitTime;
        if (timeSinceLastHit >= 1500) {
            this.lastHitTime = currentTime;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Flips an image horizontally.
     * @param {MovableObject} mo - The object whose image needs to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original position of an image after flipping.
     * @param {MovableObject} mo - The object whose image needs to be flipped back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Draws all game objects on the canvas and manages the camera position.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array<MovableObject>} objects - The array of objects to be added.
     */
    addObjectsToMap(objects) {
        objects.forEach((mo) => {
            this.addToMap(mo);
        });
    }

    /**
     * Adds an object to the map, flipping its image if necessary.
     * @param {MovableObject} mo - The object to be added.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
}
