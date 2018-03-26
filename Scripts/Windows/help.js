var HelpWindow = function() {}

HelpWindow.prototype.create = function(game, onClose) {
    "use strict"
    var canvasCenterX = game._CONFIG.centerX;
    var canvasCenterY = game._CONFIG.centerY;
    var canvasHeight = game._CONFIG.height;

    this.blocker = game.add.image(canvasCenterX, canvasCenterY, "image_blocker"),
        this.blocker.setScale(100),
        this.blocker.setAlpha(0.5),
        this.blocker.visible = false,

        this.help = game.add.image(canvasCenterX, canvasCenterY - 40, "image_help"),
        this.help.setScale(0.225),
        this.help.visible = false,

        this.button_close = game.helper.createButton(game, canvasCenterX, canvasHeight - 100, "image_closebutton", onClose, "sfx_uiback"),
        this.button_close.setScale(0.1),
        this.button_close.visible = false
}

HelpWindow.prototype.activate = function(game) {
    "use strict"
    this.blocker.visible = true,
        this.help.visible = true,
        this.button_close.visible = true
}

HelpWindow.prototype.deactivate = function(game) {
    "use strict"
    this.blocker.visible = false,
        this.help.visible = false,
        this.button_close.visible = false
}
