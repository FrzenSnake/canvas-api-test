class EventEmitter {
	public observerList: Observer[] = [];//观察者列表

	public taskList: {
		[index:string]: Task
	} = {};  //任务列表

	public constructor() {
	}

	public notify(): void {     //通知
	}

	public addObserver(observer: Observer) {
	}

	public addTask(task: Task) {
 	}

}