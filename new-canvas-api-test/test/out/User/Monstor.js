var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Monstor = (function (_super) {
    __extends(Monstor, _super);
    function Monstor(Monster, monsternumber, hp, def, x, y) {
        var _this = this;
        _super.call(this);
        this.isKill = false;
        this._rule = function (taskList) {
            for (var taskid in taskList) {
                if (taskList[taskid].status == TaskStatus.DURING && taskList[taskid].condition.monsterNumber == _this.monsterNumber) {
                    return taskList[taskid];
                }
            }
            return null;
        };
        var i = 0;
        this.Monster = Monster;
        this.Monster.touchEnabled = true;
        this.monsterNumber = monsternumber;
        this.textField = new engine.TextField();
        this.textField.y = -100;
        this.addChild(Monster);
        this.addChild(this.textField);
        this.hp = hp;
        this.currenthp = hp;
        this.def = def;
        this.touchEnabled = true;
        this.addEventListener(engine.MouseState.MOUSE_CLICK, function () {
            if (!User.user.statemachine.locked) {
                console.log("Monster is click");
                User.user.List.cancel();
                User.user.List.addCommand(new WalkCommand(x * GameMap.gamemap.Boxsize, y * GameMap.gamemap.Boxsize));
                User.user.List.addCommand(new FightCommand(_this));
                User.user.List.execute();
            }
        });
    }
    Monstor.prototype.killmonster = function (callback) {
        var _this = this;
        var statemachine = User.user.statemachine;
        var task = TaskService.taskService.getTaskbyCustomRole(this._rule);
        var atk = User.user.heroes[0].getProperty(User.user.heroes[0], _properties.atk);
        var crit = User.user.heroes[0].getProperty(User.user.heroes[0], _properties.crit);
        var random = Math.random() * 100;
        if (this.currenthp >= 0 && !this.isKill) {
            statemachine.setState("fight", User.user.statemachine.FightState);
            var result = atk - this.def;
            if (result <= 0) {
                result = 0;
            }
            if (random > crit) {
                this.textField.text = result + " !";
                this.currenthp = this.currenthp - result;
            }
            else {
                this.textField.text = result * 2 + " Crit!!!!";
                this.currenthp = this.currenthp - (result * 2);
            }
            var clear = setTimeout(function () {
                _this.textField.text = " ";
                statemachine.setState("stand", User.user.statemachine.StandState);
            }, this, 5000);
        }
        if (this.currenthp <= 0) {
            this.isKill = true;
            var killclear = setTimeout(function () {
                _this.textField.text = " ";
                statemachine.setState("stand", User.user.statemachine.StandState);
            }, this, 2000);
            this.Monster.alpha = 0;
            if (task != null) {
                task.condition.onAccept(task);
                TaskService.taskService.notify();
            }
            var reborn = setTimeout(function () {
                _this.currenthp = _this.hp;
                _this.Monster.alpha = 1;
                _this.isKill = false;
            }, this, 10000);
        }
        callback();
    };
    return Monstor;
}(engine.DisplayObjectContainer));
