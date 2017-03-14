class NPC extends engine.DisplayObjectContainer implements Observer {
	private _emoji: engine.Bitmap = new engine.Bitmap();
	private _accept_mark: engine.Bitmap = new engine.Bitmap();
	private _unfinish_mark: engine.Bitmap = new engine.Bitmap();
	private _finish_mark: engine.Bitmap = new engine.Bitmap();
	private dialoguePanel: DialoguePanel;
	public _id: String;                  //NPC的id
	private _stage: engine.DisplayObjectContainer;
	private MARK_Y = -120;
	private npc_x: number;
	private npc_y: number;
	//private taskList: Task[] = [];      //
	public constructor(_stage: engine.DisplayObjectContainer, NpcId: string, emoji: string, accept_mark: string, unfinish_mark: string, finish_mark: string,
		dialoguePanel: DialoguePanel, npc_x: number, npc_y: number) {
		super();
		this._stage = _stage;
		this._emoji.src = emoji;
		this._accept_mark.src = accept_mark;
		this._unfinish_mark.src = unfinish_mark;
		this._finish_mark.src = finish_mark;
		this._id = NpcId;
		this.dialoguePanel = dialoguePanel;

		this._emoji.touchEnabled = false;
		this._accept_mark.y = this.MARK_Y;
		this._unfinish_mark.y = this.MARK_Y;
		this._finish_mark.y = this.MARK_Y;

		this._accept_mark.alpha = 0;
		this._unfinish_mark.alpha = 0;
		this._finish_mark.alpha = 0;


		this.addChild(this._emoji);
		this.addChild(this._accept_mark);
		this.addChild(this._unfinish_mark);
		this.addChild(this._finish_mark);
		this.npc_x = npc_x;
		this.npc_y = npc_y;

		this.addEventListener(engine.MouseState.MOUSE_CLICK, () => {
			console.log("点击npc了")
			if (!User.user.statemachine.locked) {
				console.log(this._id + " is click");
				User.user.List.cancel();
				User.user.List.addCommand(new WalkCommand(this.npc_x * GameMap.gamemap.Boxsize, this.npc_y * GameMap.gamemap.Boxsize));
				User.user.List.addCommand(new TalkCommand(this));
				User.user.List.execute();

			}
		});
		this.touchEnabled = true;

	}

	public NPCtalk(callback?: Function) {
		var statemachine = User.user.statemachine;
		statemachine.locked++
		var task = TaskService.taskService.getTaskbyCustomRole(this._rule);
		if (task == null) {

			this.dialoguePanel.setTaskFiled("没有任务了！！！");
		}
		console.log(this._id + "增加对话框");
		this._stage.addChild(this.dialoguePanel);
		this.dialoguePanel.onChange(task);
		this.dialoguePanel.setTaskFiled(task.desc);
		TaskService.taskService.notify();
		callback();//回调
	}
	public onChange(task: Task) {
		console.log(task.id + " " + this._id + " is on Change!!");
		if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this._id) { //可接任务
			console.log(this._id + "可接任务")
			this._accept_mark.alpha = 1;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 0;
			this._emoji.touchEnabled = true;
		} else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this._id) { //进行中任务 现npc
			console.log(this._id + "进行中 现Npc");
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 1;
			this._finish_mark.alpha = 0;
			this._emoji.touchEnabled = true;

		} else if (task.status == TaskStatus.DURING && task.condition.fromNpcId == this._id) { //进行中任务 原npc
			console.log(this._id + "进行中任务 原npc")
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 0;

		} else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this._id) { //可交任务
			console.log(this._id + "可交任务 现npc")
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 1;
			this._emoji.touchEnabled = true;
			return;
		} else if (task.status == TaskStatus.SUBMITTED) { //已交任务
			console.log(this._id + "已交任务")
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 0;
			this._emoji.touchEnabled = false;
			// return 1;
		}
	}

	public _rule = (taskList): Task => {
		for (let taskid in taskList) {
			if ((taskList[taskid].status == TaskStatus.ACCEPTABLE && (taskList[taskid].condition.fromNpcId == this._id || taskList[taskid].condition.toNpcId == this._id)) ||
				(taskList[taskid].status == TaskStatus.DURING && (taskList[taskid].condition.fromNpcId == this._id || taskList[taskid].condition.toNpcId == this._id)) ||
				taskList[taskid].status == TaskStatus.CAN_SUBMIT && (taskList[taskid].condition.fromNpcId == this._id || taskList[taskid].condition.toNpcId == this._id)) {
				return taskList[taskid];
			}
		}
		return null;
	}
}