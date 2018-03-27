var App = function() {};
App.prototype.start = function() {
    var scene = [];
    scene.push(BootScene);
    scene.push(PreloadScene);
    scene.push(IntroScene);
    scene.push(MenuScene);
    scene.push(GameplayScene);
    scene.push(GameplayRedirectScene);

    var config = {
        type: Phaser.AUTO,
        width: 450,
        height: 650,
        parent: "phaser-app",
        scene: scene,
        title: "Spooky Spirit",
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                },
                debug: false
            }
        },
        audio: {
            disableWebAudio: true
        }
    };

    var game = new Phaser.Game(config);
    game.GAMENAME = "spooky_spirit";
    game._BASECARDS_NUM = 27;
    game._COLLECTION_MAX = -1;
    game._CONFIG = config;
    game._CONFIG.centerX = Math.round(.5 * config.width);
    game._CONFIG.centerY = Math.round(.5 * config.height);
    game._CONFIG.music = true;
    game._CONFIG.sfx = true;
};
