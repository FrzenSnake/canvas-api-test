class StateMachine extends engine.DisplayObjectContainer {
    currentState: State;
    // totalEndX: number;
    // totalEndY: number;
    moving: boolean = false;
    /**
     * 当前终点
     */
    currentEndX: number;
    currentEndY: number;
    locked: number;
    StandState: PlayerStandState;
    MoveState: PlayerMoveState;
    FightState: PlayerFightState;
    stand: engine.MovieClip; //动画站立
    moveR: engine.MovieClip    // 动画走(向右)
    moveL: engine.MovieClip    // 动画走(向左)
    fight: engine.MovieClip    //动画战斗
    timeOnEnterFrame: number = 0;//进入帧时间
    Ratiox: number;
    Ratioy: number;

    constructor(locked: boolean, _player: any,
        stand: engine.MovieClip, moveR: engine.MovieClip, moveL: engine.MovieClip, fight: engine.MovieClip) {
        super();
        this.locked = 0;
        this.stand = stand;
        this.moveR = moveR;
        this.moveL = moveL;
        this.fight = fight
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
    onEnter() {
        this.currentState.onEnter();
    }
    onExit() {
        this.currentState.onExit();
    }

    setState(stateName: string, state: State) {
        // if (this.currentState.getname() != stateName) {
        this.currentState.onExit();
        this.currentState = state;
        this.currentState.onEnter();
        // }

    }
}


////////////////////////////////////////////移动状态
class PlayerMoveState implements State {
    _player: any;
    _StateMachine: StateMachine;
    _currentmove: engine.MovieClip
    public _statename: string;

    constructor(player: any, stateMachine: StateMachine, name: string) {
        this._statename = name;
        //    console.log("PlayerMoveState constructor");
        this._StateMachine = stateMachine;
        this._player = player;
    }
    onEnter() {
        if (this._StateMachine.currentEndX >= this._StateMachine.x) {
            this._StateMachine.moveR.alpha = 1;
            this._currentmove = this._StateMachine.moveR;
        } else {
            this._StateMachine.moveL.alpha = 1;
            this._currentmove = this._StateMachine.moveL;
        }

    }
    onExit() {
        this._currentmove.alpha = 0;
        //this._StateMachine.currentState = this._StateMachine.StandState;
    }
    getname() {
        return this._statename;
    }

}

////////////////////////////////////站立状态
class PlayerStandState implements State {
    _player: any;
    _StateMachine: StateMachine;
    public _statename: string;
    constructor(player: any, stateMachine: StateMachine, name: string) {
        this._statename = name;
        //  console.log("PlayerStandState constructor");
        this._StateMachine = stateMachine;
        this._player = player;
    }

    onEnter() {
        //console.log(this._statename + "onEnter");
        this._StateMachine.stand.alpha = 1;

    }
    onExit() {
        //console.log(this._statename + "onExit");
        this._StateMachine.stand.alpha = 0;
        //this._StateMachine.currentState = this._StateMachine.MoveState;
    }
    getname() {
        return this._statename;
    }
}





////////////////////////////////////战斗状态
class PlayerFightState implements State {
    _player: any;
    _StateMachine: StateMachine;
    public _statename: string;
    constructor(player: any, stateMachine: StateMachine, name: string) {
        this._statename = name;
        //  console.log("PlayerStandState constructor");
        this._StateMachine = stateMachine;
        this._player = player;
    }

    onEnter() {
        //console.log(this._statename + "onEnter");
        this._StateMachine.fight.alpha = 1;

    }
    onExit() {
        //console.log(this._statename + "onExit");
        this._StateMachine.fight.alpha = 0;
        //this._StateMachine.currentState = this._StateMachine.StandState;
    }
    getname() {
        return this._statename;
    }
}
interface State {
    onEnter();
    onExit();
    getname();
}
