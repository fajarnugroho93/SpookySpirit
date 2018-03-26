var LineManager = function() {
    "use strict"
    this.MaxRow = 8;
    this.MinRow = 3;
    this.MaxColumn = 3;
    this.PoolSize = this.MaxRow * this.MaxColumn + 10;
    this.MinDouble = 2;
    this.StartY = 120;
    this.AdditionY = 55;
    this.MinSpeed = 2;
    this.MaxSpeed = 4;
    this.SpeedAddition = 0.1;
    this.Acceleration = 0.01;

    this.currentLevel = 0;
    this.currentSoul = 0;
    this.currentEnemy = 0;
}

LineManager.prototype.create = function(game) {

    this.canvasWidth = game._CONFIG.width;

    game.anims.create({
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

    game.anims.create({
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

    this.souls = new Array(this.PoolSize);
    this.soulPhysics = game.physics.add.group();
    for (var i = 0; i < this.souls.length; i++) {
        this.souls[i] = new Soul;
        this.souls[i].create(game, this.soulPhysics);
    }

    this.enemys = new Array(this.PoolSize);
    this.enemyPhysics = game.physics.add.group();
    for (var i = 0; i < this.enemys.length; i++) {
        this.enemys[i] = new Enemy;
        this.enemys[i].create(game, this.enemyPhysics);
    }

    this.rowOrder = new Array(this.MaxRow);
    for (var i = 0; i < this.rowOrder.length; i++) {
        this.rowOrder[i] = i;
    }
}

LineManager.prototype.update = function(game) {
    for (var i = 0; i < this.souls.length; i++) {
        if (this.souls[i].isActive) {
            this.souls[i].update(game);
        }
    }

    for (var i = 0; i < this.enemys.length; i++) {
        if (this.enemys[i].isActive) {
            this.enemys[i].update(game);
        }
    }
}

LineManager.prototype.getSoul = function() {
    this.currentSoul++;
    if (this.currentSoul >= this.PoolSize) {
        this.currentSoul = 0;
    }

    return this.souls[this.currentSoul];
}

LineManager.prototype.getEnemy = function() {
    this.currentEnemy++;
    if (this.currentEnemy >= this.PoolSize) {
        this.currentEnemy = 0;
    }

    return this.enemys[this.currentEnemy];
}

LineManager.prototype.randomize = function() {
    for (var i = 0; i < this.rowOrder.length; i++) {
        var id = Phaser.Math.RND.integerInRange(0, this.MaxRow - 1);
        var temp = this.rowOrder[id];
        this.rowOrder[id] = this.rowOrder[i];
        this.rowOrder[i] = temp;
    }
}

LineManager.prototype.deactivateSoul = function(soul) {
    for (var i = 0; i < this.souls.length; i++) {
        if (this.souls[i].isActive && this.souls[i].soul == soul) {
            this.souls[i].setActive(false);
            return;
        }
    }
}

LineManager.prototype.deactivateEnemy = function(enemy) {
    for (var i = 0; i < this.enemys.length; i++) {
        if (this.enemys[i].isActive && this.enemys[i].enemy == enemy) {
            this.enemys[i].setActive(false);
            return;
        }
    }
}

LineManager.prototype.spawn = function(game) {
    var currentRow = Phaser.Math.Clamp(Phaser.Math.RND.integerInRange(1, this.MaxRow - 1), Phaser.Math.Clamp(this.currentLevel, 4, this.MaxRow), Phaser.Math.Clamp(this.MinRow + this.currentLevel, this.MinRow, this.MaxRow));
    this.randomize();
    var saveRow = Phaser.Math.RND.integerInRange(0, currentRow - 1);

    for (var i = 0; i < currentRow; ++i) {
        var isRight = (this.currentLevel > this.MinDouble) && (Phaser.Math.RND.integerInRange(0, 1) == 0);
        var dir = (isRight ? -1 : 1);
        var opp = -dir;

        var maxJ = Phaser.Math.RND.integerInRange(2, 3);
        var speed = dir * Phaser.Math.Clamp(this.MinSpeed + this.SpeedAddition * this.currentLevel, this.MinSpeed, this.MaxSpeed);
        var addition = Phaser.Math.RND.integerInRange(50, 150) * opp;

        var enemyID = Phaser.Math.RND.integerInRange(0, 2);
        if (i == saveRow || i == (this.MaxRow - saveRow - 1)) {
            enemyID = 4;
        }

        for (var j = 0; j < maxJ; ++j) {
            var positionX = (isRight ? this.canvasWidth : 0) + addition + opp * 45 * j;
            var positionY = this.StartY + this.rowOrder[i] * this.AdditionY;
            // console.log(isRight + ": (" + positionX + ", " + positionY + ")");
            if (j == enemyID) {
                this.getEnemy().spawn(game, positionX, positionY, speed, this.Acceleration * (2 - j) * dir, isRight);

            } else {
                this.getSoul().spawn(game, positionX, positionY, speed, this.Acceleration * (2 - j) * dir, isRight);
            }
        }
    }

    this.currentLevel++;
}
