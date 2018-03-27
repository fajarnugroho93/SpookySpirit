var Transition = function() {};
Transition.prototype.fadeOutElements = function(t, a, n, e) {
    "use strict";
    if ("boolean" != typeof t.allow_trans || !1 !== t.allow_trans) {
        t.allow_trans = !1;
        var o = {
            targets: a,
            delay: 0,
            alpha: 0,
            ease: "Linear",
            duration: e || 500,
            onComplete: function() {
                t.allow_trans = !0;
                if (n) {
                    n.call(t)
                }
            },
            callbackScope: t
        };
        this.twn_fade_out = t.add.tween(o)
    }
};

Transition.prototype.fadeInElements = function(t, a, n, e) {
    "use strict";
    var o = {
        targets: a,
        delay: 0,
        alpha: 1,
        ease: "Linear",
        duration: e || 500,
        onComplete: n,
        callbackScope: t
    };
    a.forEach(function(t) {
        t.setAlpha(0)
    }, t), this.twn_fade_in = t.add.tween(o)
};

Transition.prototype.fadeInVeil = function() {
    "use strict"
};

Transition.prototype.fadeOutVeil = function() {
    "use strict"
};
