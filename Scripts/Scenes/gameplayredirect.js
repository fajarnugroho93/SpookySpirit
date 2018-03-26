var GameplayRedirectScene = new Phaser.Scene("RedirectGameplay");

GameplayRedirectScene.init = function() {
    "use strict"
}

GameplayRedirectScene.create = function() {
    "use strict";
    this.bg = this.add.image(0, 0, "image_background").setOrigin(0), this.scene.start("Gameplay")
};
