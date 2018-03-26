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
    this.score = 0;
}

GameplayScene.create = function() {
    "use strict";

    this.cursors = this.input.keyboard.createCursorKeys();

    var canvasCenterX = this._CONFIG.centerX;
    var canvasCenterY = this._CONFIG.centerY;
    var canvasHeight = this._CONFIG.height;

    this.bg = this.add.image(0, 0, "image_background").setOrigin(0);
    this.bg.setScale(0.25);

    this.ground = this.physics.add.staticGroup();
    this.ground.create(canvasCenterX, canvasHeight, "image_blocker").setAlpha(0).setScale(2.5).refreshBody();
    this.ground.create(canvasCenterX, 0, "image_blocker").setAlpha(0).setScale(2.5).refreshBody();

    this.ghost.create(this);

    this.physics.add.collider(this.ghost.ghost, this.ground);

    this.startScene();
}

GameplayScene.update = function() {
    this.ghost.update(this.cursors);
}

GameplayScene.startScene = function() {
    "use strict";
    this.startTransitionIn()
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
