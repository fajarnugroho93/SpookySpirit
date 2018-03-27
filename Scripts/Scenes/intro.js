var IntroScene = new Phaser.Scene("Intro");
IntroScene.init = function() {
    "use strict";
    this._CONFIG = this.sys.game._CONFIG,
        this.storage = new Storage,
        this.helper = new Helper,
        this.transition = new Transition
};

IntroScene.create = function() {
    "use strict";

    var canvasCenterX = this._CONFIG.centerX;
    var canvasCenterY = this._CONFIG.centerY;
    var canvasHeight = this._CONFIG.height;

    this.bg = this.add.image(0, 0, "image_background").setOrigin(0);
    this.bg.setScale(0.25);

    this.splash = this.add.image(canvasCenterX, canvasCenterY, "image_splash");
    this.splash.setScale(0.25);

    this.startScene();
};

IntroScene.startScene = function() {
    "use strict";
    this.helper.playBgm(this, "bgm_00");
    this.timedEvent = this.time.delayedCall(2000, this.startTransitionOut, [], this);
    this.startTransitionIn();
};

IntroScene.getTransitionTargets = function() {
    "use strict";
    return [this.splash]
}

IntroScene.startTransitionIn = function() {
    "use strict";
    this.transition.fadeInElements(this, this.getTransitionTargets(), function() {})
};

IntroScene.startTransitionOut = function() {
    "use strict";
    this.transition.fadeOutElements(this, this.getTransitionTargets(), this.onPlay)
};

IntroScene.onPlay = function() {
    "use strict";
    this.scene.start("Menu")
};
