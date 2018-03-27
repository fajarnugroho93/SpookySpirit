var BootScene = new Phaser.Scene("Boot");
BootScene.preload = function() {
    "use strict";
    this.load.bitmapFont("font_lemon", "Assets/Fonts/LemonMilk.png", "Assets/Fonts/LemonMilk.xml");
    this.load.bitmapFont("font_lemon_cyan", "Assets/Fonts/LemonMilk_cyan.png", "Assets/Fonts/LemonMilk_cyan.xml");
    this.load.bitmapFont("font_lemon_navy", "Assets/Fonts/LemonMilk_navy.png", "Assets/Fonts/LemonMilk_navy.xml");
    this.load.image("image_background", "Assets/Images/Background/1.png");
};

BootScene.create = function() {
    "use strict";
    this.scene.start("Preload")
};
