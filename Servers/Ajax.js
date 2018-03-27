var Ajax = function(gameName) {
    "use strict";
    this._GAMENAME = gameName
};

Ajax.prototype.makeAjaxCall = function(game, data, scene, a) {
    "use strict";
    var o = null;
    var s = new XMLHttpRequest;
    s.onload = function() {
        if ("string" == typeof s.responseText) try {
            o = JSON.parse(s.responseText)
        } catch (game) {
            console.log(game), console.log(s.responseText), console.log("---------------"), o = s.responseText
        } else o = s.responseText;
        scene.call(a, o)
    }, s.onerror = function() {
        console.log("You have lost connection to the game server. Check your internet connection."), scene.call(a, o)
    }, s.open("POST", game, !0), s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s.send(data)
};

Ajax.prototype.addOnlinePlayer = function(game, data, devicename) {
    "use strict";
    var a, o = "Servers/ajax.ping.php";
    a = "best=" + data + "&device=" + (devicename = devicename || "n/a") + "&game=" + this._GAMENAME + "&req_type=add_player", this.makeAjaxCall(o, a, function(data) {
        (function() {}).call(game, data)
    }, game)
};

Ajax.prototype.addGameWon = function(game, data, device) {
    "use strict";
    var a, o = "Servers/ajax.ping.php";
    a = "best=" + data + "&device=" + (device = device || "n/a") + "&game=" + this._GAMENAME + "&req_type=add_win", this.makeAjaxCall(o, a, function(data) {
        (function() {}).call(game, data)
    }, game)
};
