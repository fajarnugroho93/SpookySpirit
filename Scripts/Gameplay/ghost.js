var Ghost = function() {
    "use strict"
    this.onHold = false;
    this.acceleration = -8;
    this.currentSpeed = 0;
    this.isGround = false;
    this.isDead = false;
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
    this.ghost.body.setGravityY(600);
    this.ghost.body.setBounceY(0.2);

    this.button_up = game.helper.createButton(game, canvasCenterX, canvasCenterY, "image_blocker", null, onPointerUp, onPointerDown);
    this.button_up.setScale(100).setAlpha(0.01);
}

Ghost.prototype.update = function() {
    "use strict"
    if (this.isDead) {
        if (this.isGround) {
            this.ghost.anims.play('ghost_dead', true);
            this.isGround = false;
        }
        return;
    }

    if (this.onHold) {
        this.isGround = false;
        this.ghost.anims.play('ghost_up', true);

    } else if (this.isGround) {
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

Ghost.prototype.hitEnemy = function(game) {
    "use strict"
    this.ghost.anims.play('ghost_hit', true);
    this.isDead = true;
}

Ghost.prototype.revive = function(game) {
    "use strict"
    this.isDead = false;
    this.ghost.anims.play('ghost_idle');
}

Ghost.prototype.hitGround = function(game) {
    "use strict"
    if (!this.isGround) {
        this.isGround = true;
    }
}

Ghost.prototype.onPointerUp = function(game) {
    "use strict"
    this.onHold = false;
    if (this.isDead) {
        return
    }
    game.helper.playSfx(game, "sfx_ghostdown");
}

Ghost.prototype.onPointerDown = function(game) {
    "use strict"
    this.onHold = true;
    if (this.isDead) {
        return
    }
    game.helper.playSfx(game, "sfx_ghostup");
}
