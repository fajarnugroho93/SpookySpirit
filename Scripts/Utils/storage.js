var Storage = function(t) {
    "use strict";
    this._NAME = "pixel_memory_local", !0 === t && this.reset(), this.create()
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
        xp: 0,
        xp_max: 100,
        level: 1,
        level_max: 7,
        collection: [],
        collection_max: 6,
        cardpacks: 0,
        cards_new: [],
        games: 0,
        wins: 0,
        best_easy: 100,
        best_medium: 100,
        best_hard: 100
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
    var a = t.collection,
        e = t.cards_new;

    return t.xp = parseInt(t.xp),
        t.xp_max = parseInt(t.xp_max),
        t.level = parseInt(t.level),
        t.level_max = parseInt(t.level_max),
        t.collection_max = parseInt(t.collection_max),
        t.cardpacks = parseInt(t.cardpacks),
        t.games = parseInt(t.games),
        t.wins = parseInt(t.wins),
        t.best_easy = parseInt(t.best_easy),
        t.best_medium = parseInt(t.best_medium),
        t.best_hard = parseInt(t.best_hard),
        t.collection = [], a.forEach(function(a) {
            t.collection.push(parseInt(a))
        }, this),
        t.cards_new = [], e.forEach(function(a) {
            t.cards_new.push(parseInt(a))
        }, this),
        t
};

Storage.prototype.saveToLocal = function() {
    "use strict";
    !1 !== this.checkLocalStorageExists() && localStorage.setItem(this._NAME, JSON.stringify(this.data))
};

Storage.prototype.unlockCard = function(t) {
    "use strict";
    this.data.cardpacks = Math.max(0, --this.data.cardpacks),
        this.data.collection.unshift(t),
        this.data.cards_new.length >= 2 && this.data.cards_new.splice(0, 1),
        this.data.cards_new.push(t),
        this.saveToLocal()
};

Storage.prototype.addXp = function(t) {
    "use strict";
    if (!(this.data.level >= this.data.level_max)) {
        var a = this.data.xp;
        this.data.level;
        this.data.xp += t,
            this.data.xp >= this.data.xp_max && (this.data.level++, this.data.xp = t - (this.data.xp_max - a), this.data.cardpacks++),
            this.saveToLocal()
    }
};

Storage.prototype.gamePlayed = function() {
    "use strict";
    this.data.games++,
        this.data.cards_new.length > 0 && this.data.cards_new.splice(0, 1),
        this.saveToLocal()
};

Storage.prototype.gameWon = function() {
    "use strict";
    this.data.wins++, this.saveToLocal()
};

Storage.prototype.checkNewRecord = function(t, a) {
    "use strict";
    var e = !1;
    return a < this.data["best_" + t.toLowerCase()] && (e = !0, this.data["best_" + t.toLowerCase()] = a),
        1 === this.data.wins && 1 === this.data.level && 0 === this.data.xp && (e = !1), this.saveToLocal(), e
};
