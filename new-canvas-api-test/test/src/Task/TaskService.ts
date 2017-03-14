class TaskService extends EventEmitter {
	public static taskService;

	constructor() {
		super();
		if (!TaskService.taskService) {
			TaskService.taskService = this;
		}
		return TaskService.taskService;
	}


	public accept(id: string): ErrorCode {   //接受任务
		if (!id) {
			return ErrorCode.MISSING_TASK;
		}
		let task = this.taskList[id];
		if (!task) {
			return ErrorCode.ERROR_TASK;
		}
		task.status = TaskStatus.DURING;

		return ErrorCode.SUCCESS;
	}

	public getTaskbyCustomRole(rule: Function): Task {   //通过角色提取任务
		return rule(this.taskList);
	}

	public notify(): void {     //通知
		var i = 1;
		console.log("TaskService notify");
		for (let taskId in this.taskList) {
			for (let observer of this.observerList) {
				if (this.taskList[taskId].status != TaskStatus.UNACCEPTABLE) {
					observer.onChange(this.taskList[taskId]);
					console.log("notify次数： " + i);
					i++;
				} else {
					continue;
				}
			}
		}
	}
	public addObserver(observer: Observer) {
		this.observerList.push(observer);
		this.notify();
	}

	public addTask(task: Task) {
		this.taskList[task.id] = task;
		this.notify();
	}
}
enum ErrorCode {
	MISSING_TASK = 0,
	SUCCESS = 1,
	ERROR_TASK = 0
}

interface Observer {
	onChange(task: Task);
}
