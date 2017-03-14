var EventEmitter = (function () {
    function EventEmitter() {
        this.observerList = []; //观察者列表
        this.taskList = {}; //任务列表
    }
    EventEmitter.prototype.notify = function () {
    };
    EventEmitter.prototype.addObserver = function (observer) {
    };
    EventEmitter.prototype.addTask = function (task) {
    };
    return EventEmitter;
}());
