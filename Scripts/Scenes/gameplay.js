var GameplayScene = new Phaser.Scene("Gameplay");
GameplayScene.init = function() {
    "use strict";
    this._CONFIG = this.sys.game._CONFIG;
    this.storage = new Storage;
    this.helper = new Helper;
    this.transition = new Transition;
    this.ajax = new Ajax(this.GAMENAME);

    this.helpWindow = new HelpWindow();
    this.gameOverWindow = new GameOverWindow();

    this.ghost = new Ghost;
    this.linemanager = new LineManager;
    this.score = 0;
    this.isContinue = false;
}

GameplayScene.create = function() {
    "use strict";
    this.storage.create(this);

    this.anims.create({
        key: 'ghost_idle',
        frames: [{
            key: "sprite_ghost",
            frame: 0
        }],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'ghost_up',
        frames: [{
            key: "sprite_ghost",
            frame: 1
        }],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'ghost_down',
        frames: [{
            key: "sprite_ghost",
            frame: 2
        }],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'ghost_hit',
        frames: this.anims.generateFrameNumbers("sprite_ghost", {
            start: 3,
            end: 4
        }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'ghost_dead',
        frames: this.anims.generateFrameNumbers("sprite_ghost", {
            start: 5,
            end: 6
        }),
        frameRate: 10,
        repeat: -1
    });


    this.anims.create({
        key: 'soul_idle',
        frames: [{
            key: 'sprite_soul_0'
        }, {
            key: 'sprite_soul_1'
        }, {
            key: 'sprite_soul_2'
        }, {
            key: 'sprite_soul_3'
        }, ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'enemy_idle',
        frames: [{
            key: 'sprite_enemy_0'
        }, {
            key: 'sprite_enemy_1'
        }, {
            key: 'sprite_enemy_2'
        }, {
            key: 'sprite_enemy_3'
        }, ],
        frameRate: 10,
        repeat: -1
    });

    this.canvasCenterX = this._CONFIG.centerX;
    this.canvasCenterY = this._CONFIG.centerY;
    this.canvasWidth = this._CONFIG.width;
    this.canvasHeight = this._CONFIG.height;

    this.bg = this.add.image(0, 0, "image_background").setOrigin(0);
    this.bg.setScale(0.25);

    this.ground = this.physics.add.staticGroup();
    this.ground.create(this.canvasCenterX, this.canvasHeight, "image_blocker").setAlpha(0).setScale(2.5).refreshBody();

    this.ceiling = this.physics.add.staticGroup();
    this.ceiling.create(this.canvasCenterX, 20, "image_blocker").setAlpha(0).setScale(2.5).refreshBody();

    this.particles = this.add.particles('particle_fog');
    this.emitter = this.particles.createEmitter({
        x: {
            min: 0,
            max: this.canvasWidth
        },
        y: {
            min: 0,
            max: this.canvasHeight / 2
        },
        angle: {
            min: 0,
            max: 180
        },
        speed: {
            min: 10,
            max: 100
        },
        maxParticles: 4,
        gravityY: 10,
        alpha: {
            start: 0,
            end: 1,
            ease: function(t) {
                return Math.pow(Math.sin(t * 3), 3);
            }
        },
        lifespan: {
            min: 4000,
            max: 9000
        }
    });

    this.ghost.create(this, this.onPointerUp, this.onPointerDown);
    this.linemanager.create(this);

    this.bestScore = this.storage.data.best;
    this.text_besttext = this.add.bitmapText(50, 35, "font_lemon", "Best", 20).setOrigin(0);
    this.text_bestscore = this.add.bitmapText(50, 55, "font_lemon_cyan", this.bestScore.toString(), 28).setOrigin(0);

    if (this.bestScore == 0) {
        this.text_besttext.setText("");
        this.text_bestscore.setText("");
    }

    this.text_currentscore = this.add.bitmapText(this.canvasCenterX, 75, "font_lemon", "0", 40).setOrigin(0.5);
    this.text_currentscore.setOrigin(1, 1);

    this.sprite_currentscore = this.add.sprite(this.canvasCenterX, 75 + 11, "sprite_soul_0").play("soul_idle");
    this.sprite_currentscore.setScale(0.22);
    this.sprite_currentscore.setOrigin(0, 1);

    this.button_help = this.helper.createButton(this, this.canvasWidth - 90, 60, "image_helpbutton", "sfx_uismalltap", this.onHelpOpen);
    this.button_help.setScale(0.065);
    this.helpWindow.create(this, this.onHelpClose);

    this.gameOverWindow.create(this, this.onGameOverContinue, this.onGameOverRestart, this.onGameOverQuit);

    this.physics.add.collider(this.ghost.ghost, this.ground, this.hitGround, null, this);
    this.physics.add.collider(this.ghost.ghost, this.ceiling);
    this.physics.add.overlap(this.ghost.ghost, this.linemanager.soulPhysics, this.collectSoul, null, this);
    this.physics.add.overlap(this.ghost.ghost, this.linemanager.enemyPhysics, this.hitEnemy, null, this);

    this.add.tween({
        targets: this.sprite_currentscore,
        y: '-=10',
        ease: "Power",
        duration: 1100,
        yoyo: true,
        repeat: -1
    });

    this.setScore();
    this.startScene();
}

GameplayScene.update = function() {
    "use strict"
    this.ghost.update();
    this.linemanager.update(this);
}

GameplayScene.startScene = function() {
    "use strict";
    this.timedEvent = this.time.delayedCall(3000, this.spawn, [], this);

    this.startTransitionIn()
}

GameplayScene.spawn = function() {
    "use strict"
    this.linemanager.spawn();
    this.timedEvent = this.time.delayedCall(5000, this.spawn, [], this);
}

GameplayScene.onPointerUp = function() {
    "use strict"
    this.ghost.onPointerUp(this);
}

GameplayScene.onPointerDown = function() {
    "use strict"
    this.ghost.onPointerDown(this);
}

GameplayScene.hitGround = function(ghost, ground) {
    "use strict"
    this.ghost.hitGround(this);
}

GameplayScene.collectSoul = function(ghost, soul) {
    if (this.ghost.isDead) {
        return;
    }

    this.helper.playSfx(this, "sfx_gettarget");
    this.linemanager.deactivateSoul(soul);
    this.text_currentscore.setText(++this.score);

    if (this.score > this.bestScore) {
        this.text_besttext.setText("New Best!");
        this.text_bestscore.setText("");
    }

    this.setScore();
}

GameplayScene.setScore = function() {
    var totalWidth = (this.text_currentscore.width + (this.sprite_currentscore.width * 0.225)) / 2 + 3;
    this.sprite_currentscore.x = this.canvasCenterX - totalWidth;
    this.text_currentscore.x = this.canvasCenterX + totalWidth;;
}

GameplayScene.hitEnemy = function(ghost, enemy) {
    if (this.ghost.isDead) {
        return;
    }
    this.helper.playSfx(this, "sfx_explosion");
    this.onHelpClose();
    this.text_besttext.setAlpha(0);
    this.text_bestscore.setAlpha(0);
    this.text_currentscore.setAlpha(0);
    this.sprite_currentscore.setAlpha(0);
    this.button_help.setAlpha(0);
    this.linemanager.deactivateEnemy(enemy);
    this.timedEvent.paused = true;
    this.ghost.hitEnemy(this);

    this.storage.gameOver(this.score);
    this.ajax.addGameWon(this, this.storage.data.best, this.helper.getDeviceName());

    this.time.delayedCall(1000, this.onGameOverOpen, [], this);
}

GameplayScene.onGameOverOpen = function() {
    "use strict"
    this.gameOverWindow.activate(this, this.score, this.isContinue);
}

GameplayScene.onGameOverContinue = function() {
    "use strict"
    this.isContinue = true;
    this.startTransitionIn();
    this.gameOverWindow.forceDeactivate(this);
    this.ghost.revive(this);

    this.timedEvent.paused = false;
    window.open("https://play.google.com/store/apps/details?id=com.peanutgarden.spookyspirit", "_blank");
}

GameplayScene.onGameOverRestart = function() {
    "use strict"
    this.gameOverWindow.deactivate(this);
    this.ghost.ghost.disableBody(true, true);
    this.anims.anims.clear();
    this.text_besttext.setAlpha(0);
    this.text_bestscore.setAlpha(0);
    this.text_currentscore.setAlpha(0);
    this.sprite_currentscore.setAlpha(0);
    this.button_help.setAlpha(0);
    this.scene.start("GameplayRedirect")
}

GameplayScene.onGameOverQuit = function() {
    "use strict"
    this.gameOverWindow.deactivate(this);
    this.ghost.ghost.disableBody(true, true);
    this.anims.anims.clear();
    this.text_besttext.setAlpha(0);
    this.text_bestscore.setAlpha(0);
    this.text_currentscore.setAlpha(0);
    this.sprite_currentscore.setAlpha(0);
    this.button_help.setAlpha(0);
    this.scene.start("Menu")
}

GameplayScene.onHelpOpen = function() {
    "use strict"
    if (this.ghost.isDead) {
        return;
    }

    this.helpWindow.activate(this)
}

GameplayScene.onHelpClose = function() {
    "use strict"
    this.helpWindow.deactivate(this)
}

GameplayScene.startTransitionIn = function() {
    "use strict";
    this.transition.fadeInElements(this, this.getTransitionTargets(), function() {});
}

GameplayScene.startTransitionOut = function(n) {
    "use strict";
    this.transition.fadeOutElements(this, this.getTransitionTargets(), n)
}

GameplayScene.getTransitionTargets = function() {
    "use strict";
    return [this.text_besttext,
        this.text_bestscore,
        this.text_currentscore,
        this.sprite_currentscore,
        this.button_help
    ]
}
