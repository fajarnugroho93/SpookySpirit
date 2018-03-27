var OptionsWindow = function() {
    this.transition = new Transition;
    this.helper = new Helper;
}

OptionsWindow.prototype.create = function(game, onClose, musicToggle, sfxToggle) {
    "use strict"
    var canvasCenterX = game._CONFIG.centerX;
    var canvasCenterY = game._CONFIG.centerY;
    var canvasWidth = game._CONFIG.width;
    var canvasHeight = game._CONFIG.height;

    this.blocker = game.add.image(canvasCenterX, canvasCenterY, "image_blocker");
    this.blocker.setScale(100);
    this.blocker.setAlpha(0);

    this.options = game.add.image(canvasCenterX - 3, canvasCenterY + 30, "image_options");
    this.options.setScale(0.18, 0.14);
    this.options.setAlpha(0);

    this.text_games = game.add.bitmapText(canvasCenterX, canvasCenterY - 50, "font_lemon", "Peanut Garden\n        Games", 26).setOrigin(0.5);
    this.text_games.align = 'center';
    this.text_games.setAlpha(0);

    this.text_credits = game.add.bitmapText(canvasCenterX, canvasCenterY + 70, "font_lemon", "   Programmer\nFajar Nugroho\n\n         Artist\nErnesto Irawan", 22).setOrigin(0.5);
    this.text_credits.align = 'center';
    this.text_credits.setAlpha(0);

    this.text_music = game.add.bitmapText(100, 70, "font_lemon", "Music", 32).setOrigin(0, 0.5);
    this.text_music.setAlpha(0);
    this.button_musicon = game.helper.createButton(game, canvasWidth - 100, 70, "image_soundbuttonon", "sfx_uismalltap", musicToggle).setOrigin(1, 0.5);
    this.button_musicon.setScale(0.07);
    this.button_musicon.setAlpha(0);
    this.button_musicoff = game.helper.createButton(game, canvasWidth - 100, 70, "image_soundbuttonoff", "sfx_uismalltap", musicToggle).setOrigin(1, 0.5);
    this.button_musicoff.setScale(0.07);
    this.button_musicoff.setAlpha(0);

    this.text_sfx = game.add.bitmapText(100, 150, "font_lemon", "SFX", 32).setOrigin(0, 0.5);
    this.text_sfx.setAlpha(0);
    this.button_sfxon = game.helper.createButton(game, canvasWidth - 100, 150, "image_soundbuttonon", "sfx_uismalltap", sfxToggle).setOrigin(1, 0.5);
    this.button_sfxon.setScale(0.07);
    this.button_sfxon.setAlpha(0);
    this.button_sfxoff = game.helper.createButton(game, canvasWidth - 100, 150, "image_soundbuttonoff", "sfx_uismalltap", sfxToggle).setOrigin(1, 0.5);
    this.button_sfxoff.setScale(0.07);
    this.button_sfxoff.setAlpha(0);

    this.button_close = game.helper.createButton(game, canvasCenterX, canvasHeight - 100, "image_quitbutton", "sfx_uiback", onClose);
    this.button_close.setScale(0.07);
    this.button_close.setAlpha(0);
}

OptionsWindow.prototype.musicToggle = function(game) {
    "use strict"
    this.helper.musicToggle(game);
    game._CONFIG.music = !game._CONFIG.music;
    this.button_musicon.setAlpha(game._CONFIG.music ? 1 : 0);
    this.button_musicoff.setAlpha(!game._CONFIG.music ? 1 : 0);
}

OptionsWindow.prototype.sfxToggle = function(game) {
    "use strict"
    game._CONFIG.sfx = !game._CONFIG.sfx;
    this.button_sfxon.setAlpha(game._CONFIG.sfx ? 1 : 0);
    this.button_sfxoff.setAlpha(!game._CONFIG.sfx ? 1 : 0);
}

OptionsWindow.prototype.getTransitionTargets = function(game) {
    "use strict";
    return [
        this.blocker,
        this.options,
        this.button_close,
        this.text_music,
        this.text_sfx,
        game._CONFIG.music ? this.button_musicon : this.button_musicoff,
        game._CONFIG.sfx ? this.button_sfxon : this.button_sfxoff,
        this.text_credits,
        this.text_games
    ]
}

OptionsWindow.prototype.activate = function(game) {
    "use strict"
    this.transition.fadeInElements(game, this.getTransitionTargets(game), function() {})
}

OptionsWindow.prototype.deactivate = function(game) {
    "use strict"
    this.blocker.setAlpha(0);
    this.options.setAlpha(0);
    this.button_close.setAlpha(0);
    this.text_music.setAlpha(0);
    this.text_sfx.setAlpha(0);
    this.button_musicon.setAlpha(0);
    this.button_musicoff.setAlpha(0);
    this.button_sfxon.setAlpha(0);
    this.button_sfxoff.setAlpha(0);
    this.text_credits.setAlpha(0);
    this.text_games.setAlpha(0);
    this.transition.fadeOutElements(game, this.getTransitionTargets(game), function() {})
}
