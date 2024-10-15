

let level1;

function initLevel1() {

    level1 = new Level1(
        [
            new Endboss(),
            new Chicken(500),
            new Chick(800),
            new Chicken(1200),
            new Chicken(1500),
            new Chick(1800),
            new Chick(1850),
            new Chick(1900),
            new Chicken(2500),
            new Chicken(3200),
            new Chick(3100),
            new Chick(3300),      
        ],
        
        [
            new Coin(0, -300, 100),
            new Coin(1, -300, 200),
            new Coin(2, -300, 300),
            new Coin(3, -400, 200),
            new Coin(4, -400, 100),
            new Coin(5, -400, 200),
            new Coin(6, 350, 300),
            new Coin(7, 500, 200),
            new Coin(8, 850, 100),
            new Coin(9, 1500, 100),
        ],
        
        [
            new Bottle(-100, 330),
            new Bottle(-200, 330),
            new Bottle(-300, 330),
            new Bottle(-400, 330),
            new Bottle(800, 330),
            new Bottle(950, 330),
            new Bottle(1900, 330),
            new Bottle(2000, 330),
            new Bottle(2300, 330),
            new Bottle(2500, 330),
            new Bottle(3800, 330),
            new Bottle(4500, 330),
            new Bottle(4700, 330),
            new Bottle(4900, 330),
            new Bottle(5100, 330),
            new Bottle(5300, 330),
        ],

        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
        ],

        [

            new BackgroundObject('img/img/5_background/layers/air.png', -719),
            new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/img/5_background/layers/air.png', 0),
            new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/img/5_background/layers/air.png', 719),
            new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', 719 * 4),

            new BackgroundObject('img/img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('img/img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', 719 * 6),

            new BackgroundObject('img/img/5_background/layers/air.png', 719 * 7),
            new BackgroundObject('img/img/5_background/layers/3_third_layer/2.png', 719 * 7),
            new BackgroundObject('img/img/5_background/layers/2_second_layer/2.png', 719 * 7),
            new BackgroundObject('img/img/5_background/layers/1_first_layer/2.png', 719 * 7),

            new BackgroundObject('img/img/5_background/layers/air.png', 719 * 8),
            new BackgroundObject('img/img/5_background/layers/3_third_layer/1.png', 719 * 8),
            new BackgroundObject('img/img/5_background/layers/2_second_layer/1.png', 719 * 8),
            new BackgroundObject('img/img/5_background/layers/1_first_layer/1.png', 719 * 8),
        ],
    )
}