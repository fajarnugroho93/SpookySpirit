var App = function() {};
App.prototype.start = function() {
    var scene = [];
    scene.push(BootScene);
    scene.push(PreloadScene);
    scene.push(IntroScene);
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
                debug: true
            }
        },
        audio: {
            disableWebAudio: true
        }
    };

    var game = new Phaser.Game(config);
    // game._URL = "http://browsergameshub.com/gameapps/PixelMemory/",
    game.GAMENAME = "spooky_spirit",
        game._BASECARDS_NUM = 27,
        game._COLLECTION_MAX = -1,
        game._CONFIG = config,
        game._CONFIG.centerX = Math.round(.5 * config.width),
        game._CONFIG.centerY = Math.round(.5 * config.height),
        game.SOUND_ON = !0
};
