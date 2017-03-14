class KillMonsterTaskCondition extends TaskCondition {
	public monsterNumber: number;
	public constructor(monsterNumber: number) {
		super();
		this.monsterNumber = monsterNumber;
	}
	public onAccept(task: TaskConditionContext) {
		if (task.getcurrent() == currentStatus.NOT_CONTINUABLE) {
			task.setcurrent(currentStatus.CONTINUABLE);
		} else if (task.getcurrent() >= currentStatus.CONTINUABLE) {
			task.setcurrent((task.getcurrent() + 1));
		}
	}

	public onSubmit(task: TaskConditionContext) {
		task.setcurrent(currentStatus.FINISH);
	}

}