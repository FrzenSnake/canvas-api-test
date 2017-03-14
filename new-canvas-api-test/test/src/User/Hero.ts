class Hero {
	isInTeam: boolean;
	equipments: Equipment[] = []; //装备
	properties: Properties;//属性组
	constructor(isInTeam: boolean, Level: number, configId: number) {
		this.isInTeam = isInTeam;
		this.properties = new Properties(Level);
		// var pro = HeroConfig[_properties.atk]
		for (var pro of HeroConfig) {
			if (pro.configId == configId) {
				this.properties.AddFromConfig(pro);
				break;
			}
			else {
				console.log("没找到HeroConfig的文件, 位于Hero类");
			}
		}
		// this.properties.Add(new Property("攻击", AttributeQuality[pro.atk], false));
		// this.properties.Add(new Property("生命", AttributeQuality[pro.hp], false));
		// this.properties.Add(new Property("防御", AttributeQuality[pro.def], false));
		// this.properties.Add(new Property("速度", AttributeQuality[pro.spd], false));
		// this.properties.Add(new Property("暴击", AttributeQuality[pro.crit], true));
		// this.properties.Add(new Property("式神品质", HeroQuality[pro.Hero_Quality], false));
		// this.properties.Add(new Property("星级品质", StarQuality[pro.Star_Quality], false));

	}


	AddEquipment(equipment: Equipment) {
		this.equipments.push(equipment);
	}

	getProperty(hero: Hero, properties_order: _properties): number {
		var equiptotal = 0;
		for (let equip of hero.equipments) {      //遍历装备
			equiptotal = equiptotal + equip.properties[equip.properties.order[properties_order]];
			console.log("equiptotal  遍历装备: " + equiptotal);

			for (let jewel of equip.jewels) {   //遍历宝石
				equiptotal = equiptotal + jewel.properties[jewel.properties.order[properties_order]];    //结果加上装备和宝石的第i个属性
				console.log("equiptotal  遍历宝石: " + equiptotal);
			}
		}

		var result = hero.properties[hero.properties.order[properties_order]] + equiptotal;
		if (hero.properties.all[properties_order].isRate) {
			return result / 10;
		}
		return result;
	}
}
