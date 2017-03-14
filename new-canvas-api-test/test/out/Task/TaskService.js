var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        _super.call(this);
        if (!TaskService.taskService) {
            TaskService.taskService = this;
        }
        return TaskService.taskService;
    }
    TaskService.prototype.accept = function (id) {
        if (!id) {
            return ErrorCode.MISSING_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.ERROR_TASK;
        }
        task.status = TaskStatus.DURING;
        return ErrorCode.SUCCESS;
    };
    TaskService.prototype.getTaskbyCustomRole = function (rule) {
        return rule(this.taskList);
    };
    TaskService.prototype.notify = function () {
        var i = 1;
        console.log("TaskService notify");
        for (var taskId in this.taskList) {
            for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
                var observer = _a[_i];
                if (this.taskList[taskId].status != TaskStatus.UNACCEPTABLE) {
                    observer.onChange(this.taskList[taskId]);
                    console.log("notify次数： " + i);
                    i++;
                }
                else {
                    continue;
                }
            }
        }
    };
    TaskService.prototype.addObserver = function (observer) {
        this.observerList.push(observer);
        this.notify();
    };
    TaskService.prototype.addTask = function (task) {
        this.taskList[task.id] = task;
        this.notify();
    };
    return TaskService;
}(EventEmitter));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["MISSING_TASK"] = 0] = "MISSING_TASK";
    ErrorCode[ErrorCode["SUCCESS"] = 1] = "SUCCESS";
    ErrorCode[ErrorCode["ERROR_TASK"] = 0] = "ERROR_TASK";
})(ErrorCode || (ErrorCode = {}));
