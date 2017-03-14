var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(_stage) {
        _super.call(this);
        this.height = 400;
        this.width = 400;
        this._stage = _stage;
        this.wordPanel = new engine.Shape();
        this.wordPanel.beginFill("#000000", 0.5);
        this.wordPanel.drawRect(0, 0, this.width, this.height);
        // this.wordPanel.endFill();
        this.addChild(this.wordPanel);
        this.textField = new engine.TextField();
        this.textField.y = 200;
        this.addChild(this.textField);
        this.taskname = new engine.TextField();
        this.taskname.y = 100;
        this.addChild(this.taskname);
    }
    TaskPanel.prototype.onChange = function (task) {
        console.log("taskpanel is onchange");
        if (task.status == TaskStatus.ACCEPTABLE) {
            this.taskname.text = task.name + "(可接受)";
            this.textField.text = task.desc;
        }
        else if (task.status == TaskStatus.DURING) {
            if (task.total > 1) {
                this.taskname.text = task.name + "(进行中)( " + task.current + "/" + task.total + " )";
                this.textField.text = task.desc;
            }
            else {
                this.taskname.text = task.name + "(进行中)";
                this.textField.text = task.desc;
            }
        }
        else if (task.status == TaskStatus.CAN_SUBMIT) {
            this.taskname.text = task.name + "(可交付)";
            this.textField.text = task.desc;
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this.taskname.text = task.name + "(已完成)";
            this.textField.text = task.desc;
        }
    };
    return TaskPanel;
}(engine.DisplayObjectContainer));
