var HelpWindow = function() {
    this.transition = new Transition;
}

HelpWindow.prototype.create = function(game, onClose) {
    "use strict"
    var canvasCenterX = game._CONFIG.centerX;
    var canvasCenterY = game._CONFIG.centerY;
    var canvasHeight = game._CONFIG.height;

    this.blocker = game.add.image(canvasCenterX, canvasCenterY, "image_blocker");
    this.blocker.setScale(100);
    this.blocker.setAlpha(0);

    this.help = game.add.image(canvasCenterX, canvasCenterY - 40, "image_help");
    this.help.setScale(0.225);
    this.help.setAlpha(0);

    this.button_close = game.helper.createButton(game, canvasCenterX, canvasHeight - 100, "image_closebutton", "sfx_uiback", onClose);
    this.button_close.setScale(0.07);
    this.button_close.setAlpha(0);
}

HelpWindow.prototype.getTransitionTargets = function() {
    "use strict";
    return [
        this.blocker,
        this.help,
        this.button_close
    ]
}

HelpWindow.prototype.activate = function(game) {
    "use strict"
    this.transition.fadeInElements(game, this.getTransitionTargets(), function() {})
}

HelpWindow.prototype.deactivate = function(game) {
    "use strict"
    this.blocker.setAlpha(0);
    this.help.setAlpha(0);
    this.button_close.setAlpha(0);
    this.transition.fadeOutElements(game, this.getTransitionTargets(), function() {})
}
