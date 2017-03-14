class TaskPanel extends engine.DisplayObjectContainer implements Observer {

	private textField: engine.TextField;
	private taskname: engine.TextField;
	private wordPanel: engine.Shape;
	private taskid: number;
	public height = 400;
	public width = 400;

	public _stage: any;
	public constructor(_stage: any) {
		super();
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

	public onChange(task: Task) {
		console.log("taskpanel is onchange")

		if (task.status == TaskStatus.ACCEPTABLE) { //可接任务
			this.taskname.text = task.name + "(可接受)";
			this.textField.text = task.desc;
			// return 0;
		} else if (task.status == TaskStatus.DURING) { //进行中任务 发布任务的Npc
			if (task.total > 1) {
				this.taskname.text = task.name + "(进行中)( " + task.current + "/" + task.total + " )";
				this.textField.text = task.desc;
			} else {
				this.taskname.text = task.name + "(进行中)";
				this.textField.text = task.desc;
			}
			// return 0;
		} else if (task.status == TaskStatus.CAN_SUBMIT) { //可交任务
			this.taskname.text = task.name + "(可交付)";
			this.textField.text = task.desc;
			// return 0;

		} else if (task.status == TaskStatus.SUBMITTED) { //已交任务
			this.taskname.text = task.name + "(已完成)";
			this.textField.text = task.desc;
			// return 1;
		}
	}


}