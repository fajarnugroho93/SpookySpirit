var Ghost = function() {
    this.onHold = false;
    this.acceleration = -8;
    this.currentSpeed = 0;
}

Ghost.prototype.create = function(game) {
    this.ghost = game.physics.add.sprite(game._CONFIG.centerX, game._CONFIG.centerX, "sprite_ghost");
    this.ghost.setScale(0.75);
    this.ghost.setCollideWorldBounds(true);
    // this.anims.create({
    //     key: 'up',
    //     frames: this.anims.generateFrameNumbers("sprite_ghost", {
    //         start: 0,
    //         end: 3
    //     }),
    //     frameRate: 10,
    //     repeat: -1
    // });
    game.anims.create({
        key: 'idle',
        frames: [{
            key: "sprite_ghost",
            frame: 0
        }],
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'up',
        frames: [{
            key: "sprite_ghost",
            frame: 1
        }],
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'down',
        frames: [{
            key: "sprite_ghost",
            frame: 2
        }],
        frameRate: 10,
        repeat: -1
    });

    this.ghost.body.setGravityY(500);
}

Ghost.prototype.update = function(cursors) {
    if (cursors.up.isDown) {
        this.ghost.anims.play('up', true);
        this.onHold = true;

    } else if (this.ghost.body.touching.down) {
        this.ghost.anims.play('idle');
        this.onHold = false;

    } else {
        this.ghost.anims.play('down');
        this.onHold = false;
    }

    if (this.onHold) {
        this.currentSpeed++;
        this.ghost.setVelocityY(this.currentSpeed * this.acceleration);

    } else {
        this.currentSpeed = 0;
    }
}
