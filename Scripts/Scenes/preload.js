var PreloadScene = new Phaser.Scene("Preload");
PreloadScene.init = function() {
    "use strict";
    this._URL = this.sys.game._URL,
        this._CONFIG = this.sys.game._CONFIG,
        this.helper = new Helper, this.storage = new Storage,
        this.transition = new Transition,
        this.sys.game._COLLECTION_MAX = this.storage.data.collection_max
};

PreloadScene.preload = function() {
    "use strict";
    this.bg = this.add.sprite(0, 0, "image_background").setOrigin(0);
    this.bg.setScale(0.25);
    this.loading_bar = new LoadingBar;
    this.loading_bar.createLoadingLabel(this, "font_lemon");
    this.txt_loading = this.helper.createText(this, this._CONFIG.centerX, this._CONFIG.centerY - this.loading_bar.margin_y, "Loading Game...", "font_lemon");

    this.load.image("image_title", "Assets/Images/UI/logo.png");
    this.load.image("image_playbutton", "Assets/Images/UI/play_button.png");
    this.load.image("image_optionsbutton", "Assets/Images/UI/options_button.png");
    this.load.image("image_moregamesbutton", "Assets/Images/UI/moregames_button.png");
    this.load.image("image_helpbutton", "Assets/Images/UI/help_button.png");
    this.load.image("image_closebutton", "Assets/Images/UI/close_button.png");
    this.load.image("image_blocker", "Assets/Images/UI/blocker.png");
    this.load.image("image_help", "Assets/Images/UI/help.png");

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

    this.load.audio("bgm_00", "Assets/Sounds/BGM_00_Underground.mp3");
    this.load.audio("sfx_explosion", "Assets/Sounds/SFX_Explosion.mp3");
    this.load.audio("sfx_gettarget", "Assets/Sounds/SFX_GetTarget.mp3");
    this.load.audio("sfx_ghostdown", "Assets/Sounds/SFX_GhostDown.mp3");
    this.load.audio("sfx_ghostimpact", "Assets/Sounds/SFX_GhostImpact.mp3");
    this.load.audio("sfx_ghostup", "Assets/Sounds/SFX_GhostUp.mp3");
    this.load.audio("sfx_rocketlaunch", "Assets/Sounds/SFX_RocketLaunch.wav");
    this.load.audio("sfx_uiback", "Assets/Sounds/SFX_UIBack.wav");
    this.load.audio("sfx_uibigtap", "Assets/Sounds/SFX_UIBigTap.wav");
    this.load.audio("sfx_uismalltap", "Assets/Sounds/SFX_UISmallTap.wav");
    // this.load.setPath(this._URL + "assets/audio"),
    // this.load.audio("btn_click", ["btn_click.ogg", "btn_click.m4a"]),
    // this.load.audio("get_xp", ["get_xp.ogg", "get_xp.m4a"]),
    // this.load.audio("game_lost", ["game_lost.ogg", "game_lost.m4a"]),
    // this.load.audio("game_won", ["game_won.ogg", "game_won.m4a"]),
    // this.load.audio("pair_correct", ["pair_correct.ogg", "pair_correct.m4a"]),
    // this.load.audio("throw_card", ["throw_card.ogg", "throw_card.m4a"]),
    // this.load.audio("tap_card", ["tap_card.ogg", "tap_card.m4a"]),
    // this.load.setPath(this._URL + "assets/img"),
    // this.load.image("btn-twitter", "btn-twitter.png"),
    // this.load.image("bg-profileglow", "bg-profileglow.png"),
    // this.load.image("bg-xpbar", "bg-xpbar.png"),
    // this.load.image("bg-uitopbar", "bg-uitopbar.png"),
    // this.load.image("xpbar", "img-xpbar.png"),
    // this.load.setPath(this._URL + "assets/img"),
    // this.load.spritesheet("btn-play", "btn-play.png", {
    //     frameWidth: 214,
    //     frameHeight: 239,
    //     endFrame: 2
    // }), this.load.spritesheet("btn-wide", "btn-wide.png", {
    //     frameWidth: 468,
    //     frameHeight: 119,
    //     endFrame: 2
    // }), this.load.spritesheet("btn-small", "btn-small.png", {
    //     frameWidth: 225,
    //     frameHeight: 119,
    //     endFrame: 2
    // }), this.load.spritesheet("btn-cardpack", "btn-cardpack.png", {
    //     frameWidth: 368,
    //     frameHeight: 352,
    //     endFrame: 1
    // }), this.load.spritesheet("btn-collection", "btn-collection.png", {
    //     frameWidth: 368,
    //     frameHeight: 352,
    //     endFrame: 1
    // }), this.load.spritesheet("bg-level", "spr-levelbg.png", {
    //     frameWidth: 204,
    //     frameHeight: 214,
    //     endFrame: 1
    // }), this.load.spritesheet("spr-decks", "spr-decks.png", {
    //     frameWidth: 64,
    //     frameHeight: 64,
    //     endFrame: 3
    // }), this.load.spritesheet("spr-collection", "spr-collection.v2.png", {
    //     frameWidth: 368,
    //     frameHeight: 352,
    //     endFrame: this.sys.game._COLLECTION_MAX - 1
    // }), this.load.spritesheet("spr-explosion", "spr-explosion.png", {
    //     frameWidth: 512,
    //     frameHeight: 512,
    //     endFrame: 63
    // }), this.load.spritesheet("spr-cards", "spr-cards.v2.png", {
    //     frameWidth: 64,
    //     frameHeight: 64,
    //     endFrame: this.sys.game._BASECARDS_NUM - 1 + this.sys.game._COLLECTION_MAX
    // })
};

PreloadScene.create = function() {
    "use strict";
    this.startTransitionOut()
};

PreloadScene.startTransitionOut = function() {
    "use strict";
    var t = [this.txt_loading, this.loading_bar.txt_percent];
    this.transition.fadeOutElements(this, t, this.onIntro)
};

PreloadScene.onIntro = function() {
    "use strict";
    this.scene.start("Intro")
};
