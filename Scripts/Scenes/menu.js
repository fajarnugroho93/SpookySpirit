var MenuScene = new Phaser.Scene("Menu");
MenuScene.init = function() {
    "use strict";
    this._CONFIG = this.sys.game._CONFIG,
        this.storage = new Storage,
        this.helper = new Helper,
        this.transition = new Transition,
        this.ajax = new Ajax(this.GAMENAME),
        this.helpWindow = new HelpWindow(),
        this.optionsWindow = new OptionsWindow()
};

MenuScene.create = function() {
    "use strict";
    this.storage.create(this);
    var canvasCenterX = this._CONFIG.centerX;
    var canvasCenterY = this._CONFIG.centerY;
    var canvasWidth = this._CONFIG.width;
    var canvasHeight = this._CONFIG.height;

    this.bg = this.add.image(0, 0, "image_background").setOrigin(0);
    this.bg.setScale(0.25);

    this.particles = this.add.particles('particle_fog');
    this.emitter = this.particles.createEmitter({
        x: {
            min: 0,
            max: canvasWidth
        },
        y: {
            min: 0,
            max: canvasHeight / 2
        },
        angle: {
            min: 0,
            max: 180
        },
        speed: {
            min: 10,
            max: 100
        },
        maxParticles: 4,
        gravityY: 10,
        alpha: {
            start: 0,
            end: 1,
            ease: function(t) {
                return Math.pow(Math.sin(t * 3), 3);
            }
        },
        lifespan: {
            min: 4000,
            max: 9000
        }
    });

    this.title = this.add.image(canvasCenterX, 120, "image_title");
    this.title.setScale(0.225);

    this.button_play = this.helper.createButton(this, canvasCenterX - 20, canvasCenterY, "image_playbutton", "sfx_uibigtap", this.startTransitionOut);;
    this.button_play.setScale(0.15);

    this.bestScore = this.storage.data.best;
    this.text_besttext = this.add.bitmapText(canvasCenterX - 60, canvasCenterY + 142, "font_lemon", "Best", 28).setOrigin(0, 0.5);
    this.text_bestscore = this.add.bitmapText(canvasCenterX + 60, canvasCenterY + 140, "font_lemon_cyan", this.bestScore.toString(), 40).setOrigin(1, 0.5);

    if (this.bestScore == 0) {
        this.text_besttext.setText("");
        this.text_bestscore.setText("");
    }

    this.button_moregames = this.helper.createButton(this, canvasCenterX, canvasHeight - 90, "image_moregamesbutton", "sfx_uismalltap", this.onMoreGames);
    this.button_moregames.setScale(0.15);

    this.button_options = this.helper.createButton(this, canvasCenterX - 130, canvasHeight - 90, "image_optionsbutton", "sfx_uismalltap", this.onOptionsOpen);
    this.button_options.setScale(0.065);

    this.button_help = this.helper.createButton(this, canvasCenterX + 130, canvasHeight - 90, "image_helpbutton", "sfx_uismalltap", this.onHelpOpen);
    this.button_help.setScale(0.065);

    this.optionsWindow.create(this, this.onOptionsClose, this.musicToggle, this.sfxToggle);
    this.helpWindow.create(this, this.onHelpClose);

    this.startScene();
};

MenuScene.startScene = function() {
    "use strict";
    this.menuAnimation();
    this.startTransitionIn();
};

MenuScene.menuAnimation = function() {
    "use strict";
    this.add.tween({
        targets: this.title,
        rotation: .15,
        ease: "Linear",
        duration: 3000,
        yoyo: !0,
        repeat: -1,
    });

    this.add.tween({
        targets: this.button_play,
        y: '-=20',
        ease: "Power",
        duration: 2300,
        yoyo: true,
        repeat: -1
    });
};

MenuScene.getTransitionTargets = function() {
    "use strict";
    return [this.title,
        this.button_play,
        this.text_besttext,
        this.text_bestscore,
        this.button_moregames,
        this.button_options,
        this.button_help
    ]
}

MenuScene.startTransitionIn = function() {
    "use strict";
    this.transition.fadeInElements(this, this.getTransitionTargets(), function() {})
};

MenuScene.startTransitionOut = function() {
    "use strict";
    this.transition.fadeOutElements(this, this.getTransitionTargets(), this.onPlay)
};

MenuScene.onMoreGames = function() {
    "use strict"
    window.open("https://play.google.com/store/apps/developer?id=Peanut+Garden+Games", "_blank")
}

MenuScene.onOptionsOpen = function() {
    "use strict"
    this.optionsWindow.activate(this)
}

MenuScene.onOptionsClose = function() {
    "use strict"
    this.optionsWindow.deactivate(this)
}

MenuScene.musicToggle = function() {
    "use strict"
    this.optionsWindow.musicToggle(this);
}

MenuScene.sfxToggle = function() {
    "use strict"
    this.optionsWindow.sfxToggle(this);
}

MenuScene.onHelpOpen = function() {
    "use strict"
    this.helpWindow.activate(this)
}

MenuScene.onHelpClose = function() {
    "use strict"
    this.helpWindow.deactivate(this)
}

MenuScene.onPlay = function() {
    "use strict";
    this.scene.start("Gameplay")
};
