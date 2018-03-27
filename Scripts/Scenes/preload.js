var PreloadScene = new Phaser.Scene("Preload");
PreloadScene.init = function() {
    "use strict";
    this._URL = this.sys.game._URL,
        this._CONFIG = this.sys.game._CONFIG,
        this.helper = new Helper,
        this.storage = new Storage,
        this.transition = new Transition,
        this.sys.game._COLLECTION_MAX = this.storage.data.collection_max
};

PreloadScene.preload = function() {
    "use strict";
    this.bg = this.add.sprite(0, 0, "image_background").setOrigin(0);
    this.bg.setScale(0.25);
    this.loading_bar = new LoadingBar;
    this.loading_bar.createLoadingLabel(this, "font_lemon");

    this.load.image("image_splash", "Assets/Images/Splash/splash.png");
    this.load.image("image_title", "Assets/Images/UI/logo.png");
    this.load.image("image_playbutton", "Assets/Images/UI/play_button.png");
    this.load.image("image_optionsbutton", "Assets/Images/UI/options_button.png");
    this.load.image("image_moregamesbutton", "Assets/Images/UI/moregames_button.png");
    this.load.image("image_helpbutton", "Assets/Images/UI/help_button.png");
    this.load.image("image_closebutton", "Assets/Images/UI/close_button.png");
    this.load.image("image_soundbuttonon", "Assets/Images/UI/sound_button_1.png");
    this.load.image("image_soundbuttonoff", "Assets/Images/UI/sound_button_2.png");
    this.load.image("image_blocker", "Assets/Images/UI/blocker4.png");
    this.load.image("image_options", "Assets/Images/UI/options.png");
    this.load.image("image_help", "Assets/Images/UI/help.png");
    this.load.image("image_gameover", "Assets/Images/UI/gameover.png");
    this.load.image("image_continuebutton", "Assets/Images/UI/continue_button.png");
    this.load.image("image_restartbutton", "Assets/Images/UI/restart_button.png");
    this.load.image("image_quitbutton", "Assets/Images/UI/quit_button.png");

    this.load.image("sprite_enemy_0", "Assets/Images/Enemy/enemy_01.png");
    this.load.image("sprite_enemy_1", "Assets/Images/Enemy/enemy_02.png");
    this.load.image("sprite_enemy_2", "Assets/Images/Enemy/enemy_03.png");
    this.load.image("sprite_enemy_3", "Assets/Images/Enemy/enemy_04.png");

    this.load.image("sprite_soul_0", "Assets/Images/Soul/soul_1.png");
    this.load.image("sprite_soul_1", "Assets/Images/Soul/soul_2.png");
    this.load.image("sprite_soul_2", "Assets/Images/Soul/soul_3.png");
    this.load.image("sprite_soul_3", "Assets/Images/Soul/soul_4.png");

    this.load.spritesheet('sprite_ghost', 'Assets/Images/Hero/Hero.png', {
        frameWidth: 100,
        frameHeight: 100
    });

    this.load.image("particle_fog", "Assets/Images/Particle/Fog.png");

    this.load.audio("bgm_00", "Assets/Sounds/BGM_00_Underground.mp3");
    this.load.audio("sfx_explosion", "Assets/Sounds/SFX_Explosion.mp3");
    this.load.audio("sfx_gettarget", "Assets/Sounds/SFX_GetTarget.mp3", {
        instances: 5
    });
    this.load.audio("sfx_ghostdown", "Assets/Sounds/SFX_GhostDown.mp3", {
        instances: 5
    });
    this.load.audio("sfx_ghostimpact", "Assets/Sounds/SFX_GhostImpact.mp3");
    this.load.audio("sfx_ghostup", "Assets/Sounds/SFX_GhostUp.mp3", {
        instances: 5
    });
    this.load.audio("sfx_rocketlaunch", "Assets/Sounds/SFX_RocketLaunch.wav");
    this.load.audio("sfx_uiback", "Assets/Sounds/SFX_UIBack.wav");
    this.load.audio("sfx_uibigtap", "Assets/Sounds/SFX_UIBigTap.wav");
    this.load.audio("sfx_uismalltap", "Assets/Sounds/SFX_UISmallTap.wav");
};

PreloadScene.create = function() {
    "use strict";
    this.startTransitionOut()
};

PreloadScene.startTransitionOut = function() {
    "use strict";
    var t = [this.loading_bar.txt_percent];
    this.transition.fadeOutElements(this, t, this.onIntro)
};

PreloadScene.onIntro = function() {
    "use strict";
    this.scene.start("Intro")
};
