var Soul = function() {
    this.speed = 0;
    this.acceleration = 0;
    this.speedaddition = 0;
    this.isRight = false;
    this._isActive = false;
    this.startX = 0;
    this.startY = 0;
}

Soul.prototype.create = function(game, group) {

    this.canvasWidth = game._CONFIG.width;

    this.soul = group.create(-200, -200, "sprite_soul_0");
    this.soul.setScale(0.2);
    this.soul.body.setGravityY(0);

    this.soul.anims.play('soul_idle');
    this.setActive(false);
}

Soul.prototype.spawn = function(game, positionX, positionY, speed, acceleration, isRight) {
    this.setActive(true);
    this.acceleration = acceleration;
    this.speedaddition = 0;
    this.speed = speed;
    this.isRight = isRight;
    this.soul.setScale(0.2 * (isRight ? 1 : -1), 0.2);
    this.soul.body.setOffset(this.soul.width * (isRight ? 0 : 1), 0);
    this.startX = positionX;
    this.startY = positionY;
    this.soul.x = positionX;
    this.soul.y = positionY;
}

Soul.prototype.update = function(game) {
    if (!this._isActive) {
        return;
    }

    this.speedaddition += this.acceleration;
    this.soul.x += (this.speed + this.speedaddition);

    if (this.soul.x < -450 || this.soul.x > this.canvasWidth + 450) {
        this.setActive(false);
    }
}

// Soul.prototype.printt = function(game) {
//     console.log("printt: " + this.soul.x + ", " + this.soul.y);
//     this.timeEvent = game.time.delayedCall(1000, this.printt, [game], this);
// }

Soul.prototype.setActive = function(isActive) {
    if (!isActive) {
        this.soul.body.position = new Phaser.Math.Vector2(-200, -200);
    }

    this.soul.body.enable = true;
    this.soul.setActive(true);
    this.soul.setVisible(true);
    this._isActive = isActive;
}

Soul.prototype.isActive = function() {
    return this._isActive;
}
