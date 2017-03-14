var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Task = (function (_super) {
    __extends(Task, _super);
    function Task(id, name, desc, fromNpcId, toNpcId, total, Condition, Service, nextTaskid) {
        _super.call(this);
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = TaskStatus.UNACCEPTABLE;
        this.condition = Condition;
        this.condition.fromNpcId = fromNpcId;
        this.condition.toNpcId = toNpcId;
        this.total = total;
        this.current = 0;
        this.Service = Service;
        if (nextTaskid) {
            this.nextTaskid = nextTaskid;
        }
    }
    Task.prototype.checkStatus = function () {
        if (0 <= this.current && this.current < this.total) {
            return;
        }
        else if (this.current >= this.total) {
            this.status = TaskStatus.CAN_SUBMIT;
        }
        else if (this.current == -2) {
            this.status = TaskStatus.SUBMITTED;
            if (this.nextTaskid) {
                console.log("有任务完成了" + this.nextTaskid);
                this.Service.taskList[this.nextTaskid].status = TaskStatus.ACCEPTABLE;
            }
            this.Service.notify();
        }
    };
    Task.prototype.getcurrent = function () {
        return this.current;
    };
    Task.prototype.setcurrent = function (num) {
        this.current = num;
        this.checkStatus();
    };
    return Task;
}(EventEmitter));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED"; //已交
})(TaskStatus || (TaskStatus = {}));
var currentStatus;
(function (currentStatus) {
    currentStatus[currentStatus["NOT_CONTINUABLE"] = -1] = "NOT_CONTINUABLE";
    currentStatus[currentStatus["CONTINUABLE"] = 0] = "CONTINUABLE";
    currentStatus[currentStatus["FINISH"] = -2] = "FINISH";
})(currentStatus || (currentStatus = {}));
