interface Command {
    execute(callback: Function): void;
    cancel(callback: Function): void;
}

class CommandList {
    private _list: Command[] = [];
    private currentCommand: Command;
    private _frozen = false;

    addCommand(command: Command) {
        this._list.push(command);
    }

    cancel() {

        var command = this.currentCommand;

        if (command) {

            this._frozen = true;

            setTimeout(() => {
                if (this._frozen) {
                    this._frozen = false;
                }
            }, this, 2000);

            command.cancel(() => {
                this._frozen = false;
            });
            this._list = [];
        }
    }

    execute() {
        if (this._frozen) {
            setTimeout(this.execute, this, 100);
            return;
        }

        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command)
            command.execute(() => {
                this.execute()
            })

        }
        else {
            console.log("全部命令执行完毕")
        }
    }

}


class WalkCommand implements Command {
    private x;
    private y;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    execute(callback: Function): void {
        GameMap.getCurrentScene().moveTo(this.x, this.y, function () {
            callback();
        })
    }
    cancel(callback: Function): void {
        GameMap.getCurrentScene().stopMove(function () {
            callback();
        })
    }
}
class TalkCommand implements Command {
    private npc: NPC;
    constructor(npc: NPC) {
        this.npc = npc;
    }

    execute(callback: Function): void {
        this.npc.NPCtalk(function () {
            callback();
        })
    }
    cancel(callback: Function): void {

    }
}

class FightCommand implements Command {
    private Monster: Monstor;
    constructor(Monster: Monstor) {
        this.Monster = Monster;
    }

    execute(callback: Function): void {
        this.Monster.killmonster(function () {
            callback();
        })
    }
    cancel(callback: Function): void {

    }
}