var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var KillMonsterTaskCondition = (function (_super) {
    __extends(KillMonsterTaskCondition, _super);
    function KillMonsterTaskCondition(monsterNumber) {
        _super.call(this);
        this.monsterNumber = monsterNumber;
    }
    KillMonsterTaskCondition.prototype.onAccept = function (task) {
        if (task.getcurrent() == currentStatus.NOT_CONTINUABLE) {
            task.setcurrent(currentStatus.CONTINUABLE);
        }
        else if (task.getcurrent() >= currentStatus.CONTINUABLE) {
            task.setcurrent((task.getcurrent() + 1));
        }
    };
    KillMonsterTaskCondition.prototype.onSubmit = function (task) {
        task.setcurrent(currentStatus.FINISH);
    };
    return KillMonsterTaskCondition;
}(TaskCondition));
