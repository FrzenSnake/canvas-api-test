class Equipment {    //装备
	properties: Properties;
	equipment_bitmap: engine.Bitmap;
	jewels: Jewel[] = []; //宝石
	constructor(Level: number, configId: number) {
		this.properties = new Properties(Level);
		for (var pro of EquipmentConfig) {
			if (pro.configId == configId) {
				this.equipment_bitmap = new engine.Bitmap();
				this.equipment_bitmap.src = pro.picture;
				this.properties.AddFromConfig(pro);
				break;
			}
			else {
				console.log("没找到EquipmentConfig的文件, 位于Equipment类");
			}
		}


		this.equipment_bitmap.touchEnabled = true;
		this.equipment_bitmap.addEventListener(engine.MouseState.MOUSE_CLICK, () => {
			if (User.user.statemachine.locked) {
				console.log("equipment被点击了");
				var displayFactory = new DisplayFacory();
				displayFactory.createPropertyPanel(this.properties, GameMap.gamemap.Stage, 600, 300);
			}
        });
	}

	Addjewel(jewel: Jewel) {
		this.jewels.push(jewel);
	}



}