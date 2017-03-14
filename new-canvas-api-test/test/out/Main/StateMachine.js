var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StateMachine = (function (_super) {
    __extends(StateMachine, _super);
    function StateMachine(locked, _player, stand, moveR, moveL, fight) {
        _super.call(this);
        // totalEndX: number;
        // totalEndY: number;
        this.moving = false;
        this.timeOnEnterFrame = 0; //进入帧时间
        this.locked = 0;
        this.stand = stand;
        this.moveR = moveR;
        this.moveL = moveL;
        this.fight = fight;
        this.moveR.play();
        this.moveL.play();
        this.fight.play();
        this.stand.play();
        this.addChild(this.stand);
        this.addChild(this.moveR);
        this.addChild(this.moveL);
        this.addChild(this.fight);
        this.StandState = new PlayerStandState(_player, this, "stand");
        this.MoveState = new PlayerMoveState(_player, this, "move");
        this.FightState = new PlayerFightState(_player, this, "fight");
        if (_player == null) {
        }
        this.currentState = this.StandState;
        this.moveR.alpha = 0;
        this.moveL.alpha = 0;
        this.fight.alpha = 0;
        this.onEnter();
        // this.currentX = this.model.x;
        // this.currentY = this.model.y;
        // this.x = this.model.x;
        // this.y = this.model.y;
    }
    StateMachine.prototype.onEnter = function () {
        this.currentState.onEnter();
    };
    StateMachine.prototype.onExit = function () {
        this.currentState.onExit();
    };
    StateMachine.prototype.setState = function (stateName, state) {
        // if (this.currentState.getname() != stateName) {
        this.currentState.onExit();
        this.currentState = state;
        this.currentState.onEnter();
        // }
    };
    return StateMachine;
}(engine.DisplayObjectContainer));
////////////////////////////////////////////移动状态
var PlayerMoveState = (function () {
    function PlayerMoveState(player, stateMachine, name) {
        this._statename = name;
        //    console.log("PlayerMoveState constructor");
        this._StateMachine = stateMachine;
        this._player = player;
    }
    PlayerMoveState.prototype.onEnter = function () {
        if (this._StateMachine.currentEndX >= this._StateMachine.x) {
            this._StateMachine.moveR.alpha = 1;
            this._currentmove = this._StateMachine.moveR;
        }
        else {
            this._StateMachine.moveL.alpha = 1;
            this._currentmove = this._StateMachine.moveL;
        }
    };
    PlayerMoveState.prototype.onExit = function () {
        this._currentmove.alpha = 0;
        //this._StateMachine.currentState = this._StateMachine.StandState;
    };
    PlayerMoveState.prototype.getname = function () {
        return this._statename;
    };
    return PlayerMoveState;
}());
////////////////////////////////////站立状态
var PlayerStandState = (function () {
    function PlayerStandState(player, stateMachine, name) {
        this._statename = name;
        //  console.log("PlayerStandState constructor");
        this._StateMachine = stateMachine;
        this._player = player;
    }
    PlayerStandState.prototype.onEnter = function () {
        //console.log(this._statename + "onEnter");
        this._StateMachine.stand.alpha = 1;
    };
    PlayerStandState.prototype.onExit = function () {
        //console.log(this._statename + "onExit");
        this._StateMachine.stand.alpha = 0;
        //this._StateMachine.currentState = this._StateMachine.MoveState;
    };
    PlayerStandState.prototype.getname = function () {
        return this._statename;
    };
    return PlayerStandState;
}());
////////////////////////////////////战斗状态
var PlayerFightState = (function () {
    function PlayerFightState(player, stateMachine, name) {
        this._statename = name;
        //  console.log("PlayerStandState constructor");
        this._StateMachine = stateMachine;
        this._player = player;
    }
    PlayerFightState.prototype.onEnter = function () {
        //console.log(this._statename + "onEnter");
        this._StateMachine.fight.alpha = 1;
    };
    PlayerFightState.prototype.onExit = function () {
        //console.log(this._statename + "onExit");
        this._StateMachine.fight.alpha = 0;
        //this._StateMachine.currentState = this._StateMachine.StandState;
    };
    PlayerFightState.prototype.getname = function () {
        return this._statename;
    };
    return PlayerFightState;
}());
