var Ghost = function() {
    "use strict"
    this.onHold = false;
    this.acceleration = -8;
    this.currentSpeed = 0;
}

Ghost.prototype.create = function(game, onPointerUp, onPointerDown) {
    "use strict"

    var canvasCenterX = game._CONFIG.centerX;
    var canvasCenterY = game._CONFIG.centerY;

    this.ghost = game.physics.add.sprite(canvasCenterX, canvasCenterY, "sprite_ghost");
    this.ghost.setScale(0.55);
    this.ghost.setSize(50, 100);
    this.ghost.setOffset(25, 25);
    this.ghost.setCollideWorldBounds(true);
    game.anims.create({
        key: 'ghost_idle',
        frames: [{
            key: "sprite_ghost",
            frame: 0
        }],
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'ghost_up',
        frames: [{
            key: "sprite_ghost",
            frame: 1
        }],
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'ghost_down',
        frames: [{
            key: "sprite_ghost",
            frame: 2
        }],
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'ghost_hit',
        frames: game.anims.generateFrameNumbers("sprite_ghost", {
            start: 3,
            end: 4
        }),
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'ghost_dead',
        frames: game.anims.generateFrameNumbers("sprite_ghost", {
            start: 5,
            end: 6
        }),
        frameRate: 10,
        repeat: -1
    });

    this.ghost.body.setGravityY(500);

    this.button_up = game.helper.createButton(game, canvasCenterX, canvasCenterY, "image_blocker", null, onPointerUp, onPointerDown);
    this.button_up.setScale(100).setAlpha(0.01);
}

Ghost.prototype.update = function() {
    "use strict"
    if (this.onHold) {
        this.ghost.anims.play('ghost_up', true);

    } else if (this.ghost.body.touching.down) {
        this.ghost.anims.play('ghost_idle');

    } else {
        this.ghost.anims.play('ghost_down');
    }

    if (this.onHold) {
        this.currentSpeed++;
        this.ghost.setVelocityY(this.currentSpeed * this.acceleration);

    } else {
        this.currentSpeed = 0;
    }
}

Ghost.prototype.onPointerUp = function(game) {
    "use strict"
    this.onHold = false;
}

Ghost.prototype.onPointerDown = function(game) {
    "use strict"
    this.onHold = true;
}
