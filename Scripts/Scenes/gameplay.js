var GameplayScene = new Phaser.Scene("Gameplay");
GameplayScene.init = function() {
    "use strict";
    this._CONFIG = this.sys.game._CONFIG;
    this.storage = new Storage;
    this.helper = new Helper;
    this.transition = new Transition;
    this.ajax = new Ajax(this.GAMENAME);

    this.helpWindow = new HelpWindow();

    this.ghost = new Ghost;
    this.linemanager = new LineManager;
    this.score = 0;
}

GameplayScene.create = function() {
    "use strict";

    var canvasCenterX = this._CONFIG.centerX;
    var canvasCenterY = this._CONFIG.centerY;
    var canvasHeight = this._CONFIG.height;

    this.bg = this.add.image(0, 0, "image_background").setOrigin(0);
    this.bg.setScale(0.25);

    // this.text_besttext = this.add.bitmapText(50, 35, "font_lemon", "Best", 20).setOrigin(0);
    // this.text_bestscore = this.add.bitmapText(50, 55, "font_lemon_cyan", "9999", 28).setOrigin(0);

    // this.text_currentscore = this.add.bitmapText(canvasCenterX, 80, "font_lemon", "9999", 40).setOrigin(0.5);

    this.ground = this.physics.add.staticGroup();
    this.ground.create(canvasCenterX, canvasHeight, "image_blocker").setAlpha(0).setScale(2.5).refreshBody();
    this.ground.create(canvasCenterX, 0, "image_blocker").setAlpha(0).setScale(2.5).refreshBody();

    this.ghost.create(this, this.onPointerUp, this.onPointerDown);
    this.linemanager.create(this);

    this.physics.add.collider(this.ghost.ghost, this.ground);
    this.physics.add.overlap(this.ghost.ghost, this.linemanager.soulPhysics, this.collectSoul, null, this);
    this.physics.add.overlap(this.ghost.ghost, this.linemanager.enemyPhysics, this.hitEnemy, null, this);

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

GameplayScene.collectSoul = function(ghost, soul) {
    this.linemanager.deactivateSoul(soul);
}

GameplayScene.hitEnemy = function(ghost, enemy) {
    this.linemanager.deactivateEnemy(enemy);
}

GameplayScene.clickExit = function() {
    "use strict";
    this.allow_play = !1, this.cleaning_scene = !0, this.startTransitionOut(this.goMenu)
}, GameplayScene.clickPlayAgain = function() {
    "use strict";
    this.sys.game._COLS = this._COLS, this.sys.game._ROWS = this._ROWS, this.sys.game._DECK = this._DECK, this.startTransitionOut(this.goPlay)
}

GameplayScene.startTransitionIn = function() {
    "use strict";
    this.transition.fadeInElements(this, this.getTransitionTargets(), function() {});
}

GameplayScene.startTransitionOut = function(t) {
    "use strict";
    this.transition.fadeOutElements(this, this.getTransitionTargets(), t)
}

GameplayScene.getTransitionTargets = function() {
    "use strict";
    return []
}

GameplayScene.goMenu = function() {
    "use strict";
    this.scene.start("Menu")
}

GameplayScene.goPlay = function() {
    "use strict";
    this.scene.start("GameplayRedirect")
}
