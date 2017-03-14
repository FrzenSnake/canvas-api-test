var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NPC = (function (_super) {
    __extends(NPC, _super);
    //private taskList: Task[] = [];      //
    function NPC(_stage, NpcId, emoji, accept_mark, unfinish_mark, finish_mark, dialoguePanel, npc_x, npc_y) {
        var _this = this;
        _super.call(this);
        this._emoji = new engine.Bitmap();
        this._accept_mark = new engine.Bitmap();
        this._unfinish_mark = new engine.Bitmap();
        this._finish_mark = new engine.Bitmap();
        this.MARK_Y = -120;
        this._rule = function (taskList) {
            for (var taskid in taskList) {
                if ((taskList[taskid].status == TaskStatus.ACCEPTABLE && (taskList[taskid].condition.fromNpcId == _this._id || taskList[taskid].condition.toNpcId == _this._id)) ||
                    (taskList[taskid].status == TaskStatus.DURING && (taskList[taskid].condition.fromNpcId == _this._id || taskList[taskid].condition.toNpcId == _this._id)) ||
                    taskList[taskid].status == TaskStatus.CAN_SUBMIT && (taskList[taskid].condition.fromNpcId == _this._id || taskList[taskid].condition.toNpcId == _this._id)) {
                    return taskList[taskid];
                }
            }
            return null;
        };
        this._stage = _stage;
        this._emoji.src = emoji;
        this._accept_mark.src = accept_mark;
        this._unfinish_mark.src = unfinish_mark;
        this._finish_mark.src = finish_mark;
        this._id = NpcId;
        this.dialoguePanel = dialoguePanel;
        this._emoji.touchEnabled = false;
        this._accept_mark.y = this.MARK_Y;
        this._unfinish_mark.y = this.MARK_Y;
        this._finish_mark.y = this.MARK_Y;
        this._accept_mark.alpha = 0;
        this._unfinish_mark.alpha = 0;
        this._finish_mark.alpha = 0;
        this.addChild(this._emoji);
        this.addChild(this._accept_mark);
        this.addChild(this._unfinish_mark);
        this.addChild(this._finish_mark);
        this.npc_x = npc_x;
        this.npc_y = npc_y;
        this.addEventListener(engine.MouseState.MOUSE_CLICK, function () {
            console.log("点击npc了");
            if (!User.user.statemachine.locked) {
                console.log(_this._id + " is click");
                User.user.List.cancel();
                User.user.List.addCommand(new WalkCommand(_this.npc_x * GameMap.gamemap.Boxsize, _this.npc_y * GameMap.gamemap.Boxsize));
                User.user.List.addCommand(new TalkCommand(_this));
                User.user.List.execute();
            }
        });
        this.touchEnabled = true;
    }
    NPC.prototype.NPCtalk = function (callback) {
        var statemachine = User.user.statemachine;
        statemachine.locked++;
        var task = TaskService.taskService.getTaskbyCustomRole(this._rule);
        if (task == null) {
            this.dialoguePanel.setTaskFiled("没有任务了！！！");
        }
        console.log(this._id + "增加对话框");
        this._stage.addChild(this.dialoguePanel);
        this.dialoguePanel.onChange(task);
        this.dialoguePanel.setTaskFiled(task.desc);
        TaskService.taskService.notify();
        callback(); //回调
    };
    NPC.prototype.onChange = function (task) {
        console.log(task.id + " " + this._id + " is on Change!!");
        if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this._id) {
            console.log(this._id + "可接任务");
            this._accept_mark.alpha = 1;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
            this._emoji.touchEnabled = true;
        }
        else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this._id) {
            console.log(this._id + "进行中 现Npc");
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 1;
            this._finish_mark.alpha = 0;
            this._emoji.touchEnabled = true;
        }
        else if (task.status == TaskStatus.DURING && task.condition.fromNpcId == this._id) {
            console.log(this._id + "进行中任务 原npc");
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this._id) {
            console.log(this._id + "可交任务 现npc");
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 1;
            this._emoji.touchEnabled = true;
            return;
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            console.log(this._id + "已交任务");
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
            this._emoji.touchEnabled = false;
        }
    };
    return NPC;
}(engine.DisplayObjectContainer));
