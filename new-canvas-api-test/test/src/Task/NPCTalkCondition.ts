class NPCTalkCondition extends TaskCondition {
	constructor() {
		super();
	}
	public onAccept(task: TaskConditionContext) {
		if (task.getcurrent() == currentStatus.NOT_CONTINUABLE) {
			task.setcurrent(currentStatus.CONTINUABLE);
		}
		if (task.getcurrent() >= currentStatus.CONTINUABLE) {
			task.setcurrent(task.getcurrent() + 1);
		}
	}

	public onSubmit(task: TaskConditionContext) {
		task.setcurrent(currentStatus.FINISH);
	}

}