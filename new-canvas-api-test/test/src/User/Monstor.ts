class Monstor extends engine.DisplayObjectContainer {
	private Monster: engine.Bitmap;
	private monsterNumber: number;
	private textField: engine.TextField;
	private def: number;
	private hp: number;
	private currenthp: number;
	private isKill = false;

	public constructor(Monster: engine.Bitmap, monsternumber: number, hp: number, def: number, x, y) {
		super();
		var i: number = 0;
		this.Monster = Monster
		this.Monster.touchEnabled = true;

		this.monsterNumber = monsternumber;
		this.textField = new engine.TextField();
		this.textField.y = -100;
		this.addChild(Monster);
		this.addChild(this.textField);
		this.hp = hp;
		this.currenthp = hp;
		this.def = def;
		this.touchEnabled = true;
		this.addEventListener(engine.MouseState.MOUSE_CLICK, () => {
			if (!User.user.statemachine.locked) {
				console.log("Monster is click")
				User.user.List.cancel();
				User.user.List.addCommand(new WalkCommand(x * GameMap.gamemap.Boxsize, y * GameMap.gamemap.Boxsize));
				User.user.List.addCommand(new FightCommand(this));
				User.user.List.execute();
			}
		});

	}

	public killmonster(callback?: Function) {
		var statemachine = User.user.statemachine;
		var task: Task = TaskService.taskService.getTaskbyCustomRole(this._rule);
		var atk = User.user.heroes[0].getProperty(User.user.heroes[0], _properties.atk);
		var crit = User.user.heroes[0].getProperty(User.user.heroes[0], _properties.crit);


		var random = Math.random() * 100;

		if (this.currenthp >= 0 && !this.isKill) {
			statemachine.setState("fight", User.user.statemachine.FightState);
			var result = atk - this.def;
			if (result <= 0) {
				result = 0;
			}
			if (random > crit) {
				this.textField.text = result + " !";
				this.currenthp = this.currenthp - result;
			} else {
				this.textField.text = result * 2 + " Crit!!!!";
				this.currenthp = this.currenthp - (result * 2);
			}
			let clear = setTimeout(() => {
				this.textField.text = " ";
				statemachine.setState("stand", User.user.statemachine.StandState);
			}, this, 5000);

			// setTimeout(() => {

			// 	statemachine.setState("stand", User.user.statemachine.StandState);
			// }, this, 1000);
		}
		if (this.currenthp <= 0) {
			this.isKill = true;
			let killclear = setTimeout(() => {
				this.textField.text = " ";
				statemachine.setState("stand", User.user.statemachine.StandState);
			}, this, 2000);
			this.Monster.alpha = 0;
			if (task != null) {

				task.condition.onAccept(task);
				TaskService.taskService.notify();
			}
			let reborn = setTimeout(() => {
				this.currenthp = this.hp;
				this.Monster.alpha = 1;
				this.isKill = false;
			}, this, 10000);
		}


		callback();
	}

	public _rule = (taskList): Task => {
		for (let taskid in taskList) {
			if (taskList[taskid].status == TaskStatus.DURING && taskList[taskid].condition.monsterNumber == this.monsterNumber) {
				return taskList[taskid];
			}
		}
		return null;
	}
}