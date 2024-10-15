class Level1 {
    enemies;
    coins;
    clouds;
    bottles;
    backgroundObjects;
    level_end_x = 719 * 8 - 270;

    /**
        * Creates an instance of the Level1 class.
        * @param {Array<Enemy>} enemies - The array of enemies in the level.
        * @param {Array<Coin>} coins - The array of coins in the level.
        * @param {Array<Bottle>} bottles - The array of bottles in the level.
        * @param {Array<Cloud>} clouds - The array of clouds in the level.
        * @param {Array<BackgroundObject>} backgroundObjects - The array of background objects in the level.
    */
    constructor(enemies, coins, bottles, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}

