var Helper = function() {};
Helper.prototype.createText = function(e, t, r, n, font, o, i, a) {
    "use strict";
    var s;
    o = o || 64,
        i = i || "0xFFFFFF";
    return (s = e.add.bitmapText(t, r, font, n, o)).setTint(i),
        a && .5 !== a || (s.x -= .5 * s.width, s.y -= .5 * s.height),
        1 === a ? (s.x -= s.width, s.y -= s.height) : "object" == typeof a && (.5 === a.x && (s.x -= .5 * s.width),
            .5 === a.y && (s.y -= .5 * s.height),
            1 === a.x && (s.x -= s.width), 1 === a.y && (s.y -= s.height)),
        s
};

Helper.prototype.createButton = function(game, positionX, positionY, sprite, onClick, sfx, hoverDownFrame, spriteData) {
    "use strict";
    var s;
    return (s = game.add.sprite(positionX, positionY, sprite)).data = spriteData || {},
        s.setInteractive(),
        s.on("pointerup", function(positionX) {
            game.helper.playSfx(game, sfx), onClick.call(game)
        }),

        hoverDownFrame && hoverDownFrame.over &&
        (s.on("pointerover", function(game) {
                this.setFrame(hoverDownFrame.over)
            }),
            s.on("pointerout", function(game) {
                this.setFrame(0)
            })),

        hoverDownFrame && hoverDownFrame.down &&
        s.on("pointerdown", function(game) {
            this.setFrame(hoverDownFrame.down)
        }),
        s
};

Helper.prototype.createBtnWithLabel = function(game, t, r, n, o, i, a, s) {
    "use strict";
    var c, u;
    return (i = i || {
        string: "[n/a]",
        size: 64,
        color: "0xFFFFFF",
        x: 0,
        y: 0
    }).x || (i.x = 0), i.y || (i.y = 0), c = game.add.sprite(t, r, n), u = this.createText(game, t + i.x, r + i.y, i.string, i.size, i.color), c.data = s || {}, c.data.label_obj = u, c.setInteractive(), c.on("pointerup", function(t) {
        game.helper.playClickSfx(game), o.call(game)
    }), a && a.over && (c.on("pointerover", function(game) {
        this.setFrame(a.over)
    }), c.on("pointerout", function(game) {
        this.setFrame(0)
    })), a && a.down && c.on("pointerdown", function(game) {
        this.setFrame(a.down)
    }), c
};

Helper.prototype.getAllCardFrames = function(e) {
    "use strict";
    for (var t = [], r = e.sys.game._BASECARDS_NUM, n = 0; n < r; n++) t.push(n);
    return e.storage.data.collection.forEach(function(r) {
        t.push(r + e.sys.game._BASECARDS_NUM)
    }, this), t
};

var bgm;
Helper.prototype.playBgm = function(e, t) {
    "use strict";
    //e.sys.game.SOUND_ON && 
    bgm = e.sound.add(t, {
        loop: true
    })
    bgm.play();
};

Helper.prototype.playSfx = function(e, t) {
    "use strict";
    //e.sys.game.SOUND_ON && 
    e.sound.play(t)
};

Helper.prototype.goFullscreen = function() {
    "use strict";
    if (!this.checkDesktop() && !this.checkFsStatus()) {
        var e = document.getElementsByTagName("canvas")[0],
            t = e.requestFullscreen || e.msRequestFullscreen || e.mozRequestFullScreen || e.webkitRequestFullscreen;
        t && t.call(e)
    }
};

Helper.prototype.checkFsStatus = function() {
    "use strict";
    return !!document.fullscreenElement || (!!document.webkitFullscreenElement || !!document.mozFullScreenElement)
};

Helper.prototype.checkDesktop = function() {
    "use strict";
    return !(0 == window.screenX || "ontouchstart" in window || "onmsgesturechange" in window)
};

Helper.prototype.getDeviceName = function() {
    "use strict";
    var e = "n/a";

    function t(e) {
        return -1 != navigator.userAgent.indexOf(e)
    }
    return t("Android") ? e = "Android" : t("iPhone") && !window.MSStream ? e = "iPhone" : t("iPad") && !window.MSStream ? e = "iPad" : t("Opera Mini") ? e = "Opera Mini" : t("IEMobile") ? e = "IEMobile" : t("Mobile Safari") ? e = "Mobile Safari" : t("Mac OS") || t("Macintosh") ? e = "Mac OS" : t("Windows") && (e = "Windows"), e
};

Helper.prototype.randomIntBetween = function(e, t) {
    "use strict";
    if (!(void 0 === e || void 0 === t || e < 0 || t < 0)) {
        if (0 === e) {
            e = Math.round(e + 1), t = Math.round(t + 1);
            return Math.floor(Math.random() * t) + e - 1
        }
        e = Math.round(e), t = Math.round(t);
        return Math.floor(Math.random() * (t - e + 1) + e)
    }
};

Helper.prototype.shuffleArray = function(e) {
    "use strict";
    for (var t, r, n = e.length; 0 !== n;) t = Math.floor(Math.random() * n), r = e[n -= 1], e[n] = e[t], e[t] = r;
    return e
};
