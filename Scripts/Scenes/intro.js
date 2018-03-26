var IntroScene = new Phaser.Scene("Intro");
IntroScene.init = function() {
    "use strict";
    this._CONFIG = this.sys.game._CONFIG,
        this.storage = new Storage,
        this.helper = new Helper,
        this.transition = new Transition,
        this.ajax = new Ajax(this.GAMENAME),
        this.helpWindow = new HelpWindow()
};

IntroScene.create = function() {
    "use strict";

    var canvasCenterX = this._CONFIG.centerX;
    var canvasCenterY = this._CONFIG.centerY;
    var canvasHeight = this._CONFIG.height;

    this.bg = this.add.image(0, 0, "image_background").setOrigin(0);
    this.bg.setScale(0.25);

    this.title = this.add.image(canvasCenterX, 120, "image_title");
    this.title.setScale(0.225);

    this.button_play = this.helper.createButton(this, canvasCenterX - 20, canvasCenterY, "image_playbutton", "sfx_uibigtap", this.onPlay);;
    this.button_play.setScale(0.15);

    this.text_besttext = this.add.bitmapText(canvasCenterX, canvasCenterY + 125, "font_lemon", "Best", 28).setOrigin(0.5);
    this.text_bestscore = this.add.bitmapText(canvasCenterX, canvasCenterY + 160, "font_lemon_cyan", "9999", 40).setOrigin(0.5);

    this.button_moregames = this.helper.createButton(this, canvasCenterX, canvasHeight - 90, "image_moregamesbutton", "sfx_uismalltap", this.onMoreGames);
    this.button_moregames.setScale(0.15);

    this.button_options = this.add.image(canvasCenterX - 130, canvasHeight - 90, "image_optionsbutton");
    this.button_options.setScale(0.065);

    this.button_help = this.helper.createButton(this, canvasCenterX + 130, canvasHeight - 90, "image_helpbutton", "sfx_uismalltap", this.onHelpOpen);
    this.button_help.setScale(0.065);

    this.helpWindow.create(this, this.onHelpClose);

    this.startScene();
};

IntroScene.startScene = function() {
    "use strict";
    this.ajax.addOnlinePlayer(this, this.storage.data.level, this.helper.getDeviceName());
    // this.helper.playBgm(this, "bgm_00");
};

IntroScene.startPlayJiggle = function() {
    "use strict";
    this.add.tween({
        targets: this.btn_play,
        delay: 500,
        rotation: .15,
        ease: "Linear",
        duration: 100,
        yoyo: !0,
        repeat: -1,
        repeatDelay: 1e3
    })
};

IntroScene.getTransitionTargets = function() {
    "use strict";
    return [this.bg,
        this.title,
        this.button_play,
        this.text_besttext,
        this.button_moregames,
        this.button_options,
        this.button_help
    ]
}

IntroScene.startTransitionIn = function() {
    "use strict";
    this.transition.fadeInElements(this, getTransitionTargets(), function() {})
};

IntroScene.startTransitionOut = function() {
    "use strict";
    this.transition.fadeOutElements(this, getTransitionTargets(), this.goMenu)
};

IntroScene.onMoreGames = function() {
    "use strict"
    window.open("https://play.google.com/store/apps/developer?id=Peanut+Garden+Games", "_blank")
}

IntroScene.onHelpOpen = function() {
    "use strict"
    this.helpWindow.activate(this)
}

IntroScene.onHelpClose = function() {
    "use strict"
    this.helpWindow.deactivate(this)
}

IntroScene.onPlay = function() {
    "use strict";
    this.scene.start("Gameplay")
};
