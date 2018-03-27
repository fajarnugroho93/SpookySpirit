var GameOverWindow = function() {
    this.transition = new Transition;
    this.storage = new Storage;
}

GameOverWindow.prototype.create = function(game, onContinue, onRestart, onQuit) {
    "use strict"
    this.storage.create(this);

    this.canvasCenterX = game._CONFIG.centerX;
    this.canvasCenterY = game._CONFIG.centerY;
    this.canvasHeight = game._CONFIG.height;

    this.grave = game.add.image(this.canvasCenterX, this.canvasCenterY - 40, "image_gameover");
    this.grave.setScale(0.175);
    this.grave.setAlpha(0);

    this.button_continue = game.helper.createButton(game, this.canvasCenterX, this.canvasCenterY + 20, "image_continuebutton", "sfx_uibigtap", onContinue);
    this.button_continue.setScale(0.085);
    this.button_continue.setAlpha(0);

    this.text_score = game.add.bitmapText(this.canvasCenterX, this.canvasCenterY - 82, "font_lemon_navy", "9", 56).setOrigin(0.5);
    this.text_score.setAlpha(0);

    this.text_newbest = game.add.bitmapText(this.canvasCenterX, this.canvasCenterY - 30, "font_lemon_navy", "New Best!", 20).setOrigin(0.5);
    this.text_newbest.setAlpha(0);

    this.text_besttext = game.add.bitmapText(this.canvasCenterX - 50, this.canvasCenterY - 30, "font_lemon_navy", "Best", 20).setOrigin(0, 0.5);
    this.text_besttext.setAlpha(0);

    this.text_bestscore = game.add.bitmapText(this.canvasCenterX + 50, this.canvasCenterY - 30, "font_lemon_navy", "9999", 20).setOrigin(1, 0.5);
    this.text_bestscore.setAlpha(0);

    this.button_restart = game.helper.createButton(game, this.canvasCenterX - 30, this.canvasCenterY + 75, "image_restartbutton", "sfx_uismalltap", onRestart);
    this.button_restart.setScale(0.06);
    this.button_restart.setAlpha(0);

    this.button_quit = game.helper.createButton(game, this.canvasCenterX + 30, this.canvasCenterY + 75, "image_quitbutton", "sfx_uiback", onQuit);
    this.button_quit.setScale(0.06);
    this.button_quit.setAlpha(0);
}

GameOverWindow.prototype.getTransitionTargets = function(isNewBest, isContinue) {
    "use strict";
    return [
        this.grave,
        isContinue ? this.button_restart : this.button_continue,
        this.button_restart,
        this.button_quit,
        this.text_score,
        isNewBest ? this.text_newbest : this.button_restart,
        isNewBest ? this.button_restart : this.text_besttext,
        isNewBest ? this.button_restart : this.text_bestscore
    ]
}

GameOverWindow.prototype.activate = function(game, score, isContinue) {
    "use strict"
    this.text_score.setText(score);
    this.text_bestscore.setText(game.storage.data.best.toString());
    this.transition.fadeInElements(game, this.getTransitionTargets(isContinue, score == game.storage.data.best), function() {})
}

GameOverWindow.prototype.deactivate = function(game) {
    "use strict"
    this.grave.setAlpha(0);
    this.button_continue.setAlpha(0);
    this.button_restart.setAlpha(0);
    this.button_quit.setAlpha(0);
    this.text_score.setAlpha(0);
    this.text_newbest.setAlpha(0);
    this.text_besttext.setAlpha(0);
    this.text_bestscore.setAlpha(0);
    this.transition.fadeOutElements(game, this.getTransitionTargets(), function() {})
}

GameOverWindow.prototype.forceDeactivate = function(game) {
    "use strict"
    this.grave.setAlpha(0);
    this.button_continue.setAlpha(0);
    this.button_restart.setAlpha(0);
    this.button_quit.setAlpha(0);
    this.text_score.setAlpha(0);
    this.text_newbest.setAlpha(0);
    this.text_besttext.setAlpha(0);
    this.text_bestscore.setAlpha(0);
}
