class TaskCondition {
	public fromNpcId: string;      //从谁处得到任务
	public toNpcId: string;        //任务传递给谁

	public onAccept(task: TaskConditionContext) {
	}

	public onSubmit(task: TaskConditionContext) {
	}
}


interface TaskConditionContext {
	getcurrent(): number;
	setcurrent(num: number);
}