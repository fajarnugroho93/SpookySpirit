var Enemy = function() {
    this.speed = 0;
    this.acceleration = 0;
    this.speedaddition = 0;
    this.isRight = false;
    this._isActive = false;
    this.startX = 0;
    this.startY = 0;
}

Enemy.prototype.create = function(game, group) {

    this.canvasWidth = game._CONFIG.width;

    this.enemy = group.create(-200, -200, "sprite_enemy_0");
    this.enemy.setScale(0.15);
    this.enemy.body.setGravityY(0);

    this.enemy.anims.play('enemy_idle');
    this.setActive(false);
}

Enemy.prototype.spawn = function(game, positionX, positionY, speed, acceleration, isRight) {

    positionY += 10;
    this.setActive(true);
    this.acceleration = acceleration;
    this.speedaddition = 0;
    this.speed = speed;
    this.isRight = isRight;
    this.enemy.setScale(0.15 * (isRight ? 1 : -1), 0.15);
    this.enemy.body.setOffset(this.enemy.width * (isRight ? 0 : 1), 0);
    this.startX = positionX;
    this.startY = positionY;
    this.enemy.x = positionX;
    this.enemy.y = positionY;
}

Enemy.prototype.update = function(game) {
    if (!this._isActive) {
        return;
    }

    this.speedaddition += this.acceleration;
    this.enemy.x += (this.speed + this.speedaddition);

    if (this.enemy.x < -450 || this.enemy.x > this.canvasWidth + 450) {
        this.setActive(false);
    }
}

Enemy.prototype.setActive = function(isActive) {
    if (!isActive) {
        this.enemy.body.position = new Phaser.Math.Vector2(-200, -200);
    }

    this.enemy.body.enable = true;
    this.enemy.setActive(true);
    this.enemy.setVisible(true);
    this._isActive = isActive;
}

Enemy.prototype.isActive = function() {
    return this._isActive;
}
