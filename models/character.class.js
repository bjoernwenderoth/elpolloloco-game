class Character extends MovableObject {
    width = 115;
    height = 230;
    y = 200;
    offset = {
        top: 100,
        right: 20,
        bottom: 0,
        left: 20
    };
    offsetY = 0;
    speed = 10;
    world;
    sleep = false;
    sleepTimer = null;
    IMAGES_WALKING = [
        'img/img/2_character_pepe/2_walk/W-21.png',
        'img/img/2_character_pepe/2_walk/W-22.png',
        'img/img/2_character_pepe/2_walk/W-23.png',
        'img/img/2_character_pepe/2_walk/W-24.png',
        'img/img/2_character_pepe/2_walk/W-25.png',
        'img/img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/img/2_character_pepe/3_jump/J-31.png',
        'img/img/2_character_pepe/3_jump/J-32.png',
        'img/img/2_character_pepe/3_jump/J-33.png',
        'img/img/2_character_pepe/3_jump/J-34.png',
        'img/img/2_character_pepe/3_jump/J-35.png',
        'img/img/2_character_pepe/3_jump/J-36.png',
        'img/img/2_character_pepe/3_jump/J-37.png',
        'img/img/2_character_pepe/3_jump/J-38.png',
        'img/img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/img/2_character_pepe/4_hurt/H-41.png',
        'img/img/2_character_pepe/4_hurt/H-42.png',
        'img/img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/img/2_character_pepe/5_dead/D-51.png',
        'img/img/2_character_pepe/5_dead/D-52.png',
        'img/img/2_character_pepe/5_dead/D-53.png',
        'img/img/2_character_pepe/5_dead/D-54.png',
        'img/img/2_character_pepe/5_dead/D-55.png',
        'img/img/2_character_pepe/5_dead/D-56.png',
        'img/img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_IDLE = [
        'img/img/2_character_pepe/1_idle/idle/I-1.png',
        'img/img/2_character_pepe/1_idle/idle/I-2.png',
        'img/img/2_character_pepe/1_idle/idle/I-3.png',
        'img/img/2_character_pepe/1_idle/idle/I-4.png',
        'img/img/2_character_pepe/1_idle/idle/I-5.png',
        'img/img/2_character_pepe/1_idle/idle/I-6.png',
        'img/img/2_character_pepe/1_idle/idle/I-7.png',
        'img/img/2_character_pepe/1_idle/idle/I-8.png',
        'img/img/2_character_pepe/1_idle/idle/I-9.png',
        'img/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_IDLE_LONG = [
        'img/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    walking_sound = new Audio('audio/character_footstep2.mp3');
    jump_sound = new Audio('audio/character_jump.mp3');
    hurt_sound = new Audio('audio/character_hurt.mp3');
    dead_sound = new Audio('audio/character_dead.mp3');
    sleep_sound = new Audio('audio/character_sleep.mp3');

    /**
     * Constructor for the `Character` class.
     * Initializes the character by loading images and applying gravity.
     */
    constructor() {
        super().loadImage('./img/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animation();
    }

    /**
     * Handles the animation of the character, including movement and status changes.
     */
    animation() {
        this.characterMovements();
        this.characterStatus();
    }

    /**
     * Handles the character's movement based on keyboard input.
     */
    characterMovements() {
        let animationIntervall = setInterval(() => {
            if (world.gameEnd) {
                clearInterval(animationIntervall);
            }
            this.walking_sound.pause();
            this.characterMoveRight();
            this.characterMoveLeft();
            this.characterJump();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 35);
    }

    /**
     * Updates the character's status and triggers appropriate animations.
     */
    characterStatus() {
        let animationIntervall = setInterval(() => {
            if (world.gameEnd) {
                clearInterval(animationIntervall);
            }
            if (this.isDeath()) {
                this.playAnimation(this.IMAGES_DEAD);
                world.gameEnd = true;
                world.gameLost = true;
                document.getElementById('endScreen').classList.remove('d-none');
            } else if (this.isHurt()) {
                this.handleHurt();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.clearSleepTimer();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.clearSleepTimer();
            } else {
                this.characterSleep();
            }
        }, 100);
    }

    /**
     * Moves the character to the right if the right arrow key is pressed.
     */
    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            if (soundOn) {
                this.walking_sound.playbackRate = 3;
                this.walking_sound.play();
            }
        }
    }

    /**
     * Moves the character to the left if the left arrow key is pressed.
     */
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > -400) {
            this.moveLeft();
            this.otherDirection = true;
            if (soundOn) {
                this.walking_sound.playbackRate = 3;
                this.walking_sound.play();
            }
        }
    }

    /**
     * Makes the character jump if the up arrow key is pressed.
     */
    characterJump() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            if (soundOn) {
                this.jump_sound.play();
            }
        }
    }

    /**
     * Handles the character's sleep animation and sound.
     */
    characterSleep() {
        if (!this.sleep) {
            this.playAnimation(this.IMAGES_IDLE);
            this.startSleepTimer();
        } else {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            if (soundOn) {
                this.sleep_sound.play();
            }
        }
    }

    /**
     * Adds an event listener to clear the sleep timer when a key is pressed.
     */
    checkKeyDown() {
        document.addEventListener('keydown', (e) => {
            if (!e.repeat) {
                this.clearSleepTimer();
                this.sleep = false;
            }
        });
    }

    /**
     * Clears the sleep timer and resets the sleep state.
     */
    clearSleepTimer() {
        if (this.sleepTimer) {
            clearTimeout(this.sleepTimer);
            this.sleepTimer = null;
        }
        this.sleep = false;
        this.startSleepTimer();
        this.sleep_sound.pause();
    }

    /**
     * Starts a timer to trigger the sleep state after 15 seconds of inactivity.
     */
    startSleepTimer() {
        if (!this.sleepTimer) {
            this.sleepTimer = setTimeout(() => {
                this.sleep = true;
            }, 15000);
        }
    }
}
