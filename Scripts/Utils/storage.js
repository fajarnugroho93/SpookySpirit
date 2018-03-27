var Storage = function(t) {
    "use strict";
    this._NAME = "spooky_spirit_local", !0 === t && this.reset(), this.create()
};

Storage.prototype.reset = function() {
    "use strict";
    !1 !== this.checkLocalStorageExists() && localStorage.clear()
};

Storage.prototype.create = function(t) {
    "use strict";
    this.data = this.initData(), !1 !== this.checkLocalStorageExists() && (null === localStorage.getItem(this._NAME) ? localStorage.setItem(this._NAME, JSON.stringify(this.data)) : this.data = this.loadLocalData(JSON.parse(localStorage.getItem(this._NAME))))
};

Storage.prototype.initData = function() {
    "use strict";
    return {
        best: 0
    }
};

Storage.prototype.checkLocalStorageExists = function() {
    "use strict";
    var t = "test";
    try {
        return localStorage.setItem(t, t), localStorage.removeItem(t), !0
    } catch (t) {
        return !1
    }
};

Storage.prototype.loadLocalData = function(t) {
    "use strict";
    return t.best = parseInt(t.best), t
};

Storage.prototype.saveToLocal = function() {
    "use strict";
    !1 !== this.checkLocalStorageExists() && localStorage.setItem(this._NAME, JSON.stringify(this.data))
};

Storage.prototype.gameOver = function(best) {
    "use strict";
    if (best > this.data.best) {
        this.data.best = best;
    }
    this.saveToLocal();
};
