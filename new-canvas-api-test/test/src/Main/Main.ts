var canvas = document.getElementById("app") as HTMLCanvasElement;
var stage = engine.run(canvas);

stage.touchEnabled = true;
/*
      地图和命令表
*/
var gamemap = new GameMap(stage);
GameMap.replaceScene(gamemap);


/*
      动画
*/


var standData: engine.MovieClipData = {//站立头文件
	name: "three",
	frames: [
		{ image: "resource/stand/stand1.png" },
		{ image: "resource/stand/stand2.png" },
		{ image: "resource/stand/stand3.png" },
		{ image: "resource/stand/stand4.png" },
		{ image: "resource/stand/stand5.png" },
		{ image: "resource/stand/stand6.png" },
		{ image: "resource/stand/stand7.png" },
		{ image: "resource/stand/stand8.png" },

	]
}

var moveRightData: engine.MovieClipData = {//向右移动头文件
	name: "three",
	frames: [
		{ image: "resource/moveR/moveR1.png" },
		{ image: "resource/moveR/moveR2.png" },
		{ image: "resource/moveR/moveR3.png" },
		{ image: "resource/moveR/moveR4.png" },
		{ image: "resource/moveR/moveR5.png" },
		{ image: "resource/moveR/moveR6.png" },
		{ image: "resource/moveR/moveR7.png" },
		{ image: "resource/moveR/moveR8.png" },

	]
}

var moveLeftData: engine.MovieClipData = {//向左移动头文件
	name: "three",
	frames: [
		{ image: "resource/moveL/moveL1.png" },
		{ image: "resource/moveL/moveL2.png" },
		{ image: "resource/moveL/moveL3.png" },
		{ image: "resource/moveL/moveL4.png" },
		{ image: "resource/moveL/moveL5.png" },
		{ image: "resource/moveL/moveL6.png" },
		{ image: "resource/moveL/moveL7.png" },
		{ image: "resource/moveL/moveL8.png" },

	]
}

var fightData: engine.MovieClipData = {//战斗头文件
	name: "three",
	frames: [
		{ image: "resource/fight/fight1.png" },
		{ image: "resource/fight/fight2.png" },
		{ image: "resource/fight/fight3.png" },
		{ image: "resource/fight/fight4.png" },
		{ image: "resource/fight/fight5.png" },
		{ image: "resource/fight/fight6.png" },
		{ image: "resource/fight/fight7.png" },
		{ image: "resource/fight/fight8.png" },

	]
}




var mc_stand: engine.MovieClip = new engine.MovieClip(standData);
mc_stand.scaleX = 0.7;
mc_stand.scaleY = 0.7;

var mc_moveR: engine.MovieClip = new engine.MovieClip(moveRightData);
mc_moveR.scaleX = 0.7;
mc_moveR.scaleY = 0.7;


var mc_fight: engine.MovieClip = new engine.MovieClip(fightData);
mc_fight.scaleX = 0.7;
mc_fight.scaleY = 0.7;


var mc_moveL: engine.MovieClip = new engine.MovieClip(moveLeftData);

mc_moveL.scaleX = 0.7;
mc_moveL.scaleY = 0.7;

/*
    角色与状态机
 
*/


var statemachine: StateMachine = new StateMachine(false, stage, mc_stand, mc_moveR, mc_moveL, mc_fight);
stage.addChild(statemachine);
var user = new User(statemachine, 1);


/*
      英雄装备宝石   
      
*/



var hero1 = new Hero(true, 34, 1001);

var equip = new Equipment(15, 901);

var jewel = new Jewel(3, 801);
// equip.Addjewel(jewel);//加入宝石
// hero1.AddEquipment(equip);//加入装备
user.AddHero(hero1);//加入英雄


/*
    任务service
*/
var taskservice = new TaskService();

/*
     NPC
*/
var displayFactory = new DisplayFacory();

var npc0dialoguePanel = new DialoguePanel("npc_0", stage, statemachine);
var npc1dialoguePanel = new DialoguePanel("npc_1", stage, statemachine);
npc0dialoguePanel.x = (canvas.width - npc0dialoguePanel.width) / 2;
npc0dialoguePanel.y = (canvas.height - npc0dialoguePanel.height) / 2;
npc1dialoguePanel.x = (canvas.width - npc0dialoguePanel.width) / 2;
npc1dialoguePanel.y = (canvas.height - npc0dialoguePanel.height) / 2;

var Npc0 = new NPC(stage, "npc_0", "resource/assets/Npc1.png", "resource/assets/tanhao.png", "resource/assets/wenhao2.png", "resource/assets/wenhao.png", npc0dialoguePanel, 1, 5);
displayFactory.createModel(Npc0, 0.6, stage, 0 * gamemap.Boxsize, 5 * gamemap.Boxsize);

var Npc1 = new NPC(stage, "npc_1", "resource/assets/Npc2.png", "resource/assets/tanhao.png", "resource/assets/wenhao2.png", "resource/assets/wenhao.png", npc1dialoguePanel, 8, 1);
displayFactory.createModel(Npc1, 0.6, stage, 9 * gamemap.Boxsize, 1 * gamemap.Boxsize);

stage.addChild(Npc0);
stage.addChild(Npc1);

/*
     任务
*/
var npcTalkCondition = new NPCTalkCondition();
var killMonsterTaskCondition = new KillMonsterTaskCondition(1);


var task1: Task = new Task("task1", "新手教程", "与另一个NPC见面", "npc_0", "npc_1", 1, npcTalkCondition, taskservice, "task2");
var task2: Task = new Task("task2", "杀敌", "击杀10个敌人", "npc_1", "npc_1", 2, killMonsterTaskCondition, taskservice);

task1.status = TaskStatus.ACCEPTABLE;
var taskPanel: TaskPanel = new TaskPanel(stage);
stage.addChild(taskPanel);
taskPanel.x = 1050
taskPanel.y = 300

taskservice.addObserver(Npc0);
taskservice.addObserver(Npc1);
taskservice.addObserver(taskPanel);

taskservice.addTask(task1);
taskservice.addTask(task2);

var Monster = new engine.Bitmap();
Monster.src = "resource/assets/_monster.png";
var MonsterButton = new Monstor(Monster, 1, 8000, 1400, 3, 7);
stage.addChild(MonsterButton);
displayFactory.createModel(MonsterButton, 1, stage, 4 * gamemap.Boxsize, 7 * gamemap.Boxsize);

//属性按钮
var PropertyButton_bitmap = new engine.Bitmap();
PropertyButton_bitmap.src = "resource/assets/Button.png";


var panel_bitmap = new engine.Bitmap();
panel_bitmap.src = "resource/assets/属性文件.jpg";


var PropertyButton = displayFactory.createPropertyButton(PropertyButton_bitmap, panel_bitmap, stage, User.user.heroes[0], 60, 300);
stage.addChild(PropertyButton);
PropertyButton.x = 1200;
PropertyButton.y = 800;

//宝箱按钮
var box_bitmap = new engine.Bitmap();
box_bitmap.src = "resource/assets/box.png";
box_bitmap.x = 8 * gamemap.Boxsize;
box_bitmap.y = 9 * gamemap.Boxsize;
stage.addChild(box_bitmap);
box_bitmap.touchEnabled = true;
box_bitmap.addEventListener(engine.MouseState.MOUSE_CLICK, () => {
	// User.user.List.cancel();
	// User.user.List.addCommand(new WalkCommand(8 * GameMap.gamemap.Boxsize, 8 * GameMap.gamemap.Boxsize));
	// User.user.List.execute();

	equip.Addjewel(jewel);//加入宝石
	hero1.AddEquipment(equip);//加入装备

	box_bitmap.alpha = 0;
	box_bitmap.touchEnabled = false;

});

stage.scaleX = 0.8;
stage.scaleY = 0.8;