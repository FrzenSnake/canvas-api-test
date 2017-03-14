var CommandList = (function () {
    function CommandList() {
        this._list = [];
        this._frozen = false;
    }
    CommandList.prototype.addCommand = function (command) {
        this._list.push(command);
    };
    CommandList.prototype.cancel = function () {
        var _this = this;
        var command = this.currentCommand;
        if (command) {
            this._frozen = true;
            setTimeout(function () {
                if (_this._frozen) {
                    _this._frozen = false;
                }
            }, this, 2000);
            command.cancel(function () {
                _this._frozen = false;
            });
            this._list = [];
        }
    };
    CommandList.prototype.execute = function () {
        var _this = this;
        if (this._frozen) {
            setTimeout(this.execute, this, 100);
            return;
        }
        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command);
            command.execute(function () {
                _this.execute();
            });
        }
        else {
            console.log("全部命令执行完毕");
        }
    };
    return CommandList;
}());
var WalkCommand = (function () {
    function WalkCommand(x, y) {
        this.x = x;
        this.y = y;
    }
    WalkCommand.prototype.execute = function (callback) {
        GameMap.getCurrentScene().moveTo(this.x, this.y, function () {
            callback();
        });
    };
    WalkCommand.prototype.cancel = function (callback) {
        GameMap.getCurrentScene().stopMove(function () {
            callback();
        });
    };
    return WalkCommand;
}());
var TalkCommand = (function () {
    function TalkCommand(npc) {
        this.npc = npc;
    }
    TalkCommand.prototype.execute = function (callback) {
        this.npc.NPCtalk(function () {
            callback();
        });
    };
    TalkCommand.prototype.cancel = function (callback) {
    };
    return TalkCommand;
}());
var FightCommand = (function () {
    function FightCommand(Monster) {
        this.Monster = Monster;
    }
    FightCommand.prototype.execute = function (callback) {
        this.Monster.killmonster(function () {
            callback();
        });
    };
    FightCommand.prototype.cancel = function (callback) {
    };
    return FightCommand;
}());
