class Property {
	public constructor(name: string, attribute: any, isRate: boolean) {
		this.name = name;
		this.value = attribute.num;
		this.quality = attribute.name;
		this.isRate = isRate;
	}
	name: string;
	value: number;
	quality: string;
	isRate: boolean;
}


class Properties {
	constructor(level: number) {
		this.level = level;
	}
	level: number
	all: Property[] = [];
	order = [
		"atk",
		"hp",
		"def",
		"spd",
		"crit",
	]


	//
	//需要的属性有：
	//攻击属性
	//血量属性
	//防御属性
	//速度属性
	//暴击属性
	//星级质量
	//等级
	//英雄质量


	// getProDescription(_properties_enum: _properties) {
	// 	return  this.all[_properties_enum].getDescription;
	// }

	get atk() {
		var result = (100 + ((4 * this.all[_properties.atk].value) + (3 * this.all[_properties.Hero].value) + (12 * this.all[_properties.Star].value)) * this.level).toFixed(0);
		return Number(result);
	}

	get hp() {
		var result = (400 + ((35 * this.all[_properties.hp].value) + (25 * this.all[_properties.Hero].value) + (45 * this.all[_properties.Star].value)) * this.level).toFixed(0);
		return Number(result);
	}

	get def() {
		var result = (60 + ((1.3 * this.all[_properties.def].value) + (0.5 * this.all[_properties.Hero].value) + (1.5 * this.all[_properties.Star].value)) * this.level).toFixed(0);
		return Number(result);
	}

	get spd() {
		var result = (90 + (this.all[_properties.spd].value * 8 + this.all[_properties.Hero].value * this.all[_properties.Star].value)).toFixed(0);
		return Number(result);
	}
	get crit() {
		var result = 0;
		switch (this.all[_properties.crit].quality) {
			case "S":
				result = 100;
				break;

			case "A":
				result = 80;
				break;

			case "B":
				result = 50;
				break;

			default:
				result = 0;
				break;
		}
		return result;

	}

	Add(property: Property) {
		this.all.push(property);
	}

	AddFromConfig(pro) :Properties{
		this.Add(new Property("攻击", AttributeQuality[pro.atk], false));
		this.Add(new Property("生命", AttributeQuality[pro.hp], false));
		this.Add(new Property("防御", AttributeQuality[pro.def], false));
		this.Add(new Property("速度", AttributeQuality[pro.spd], false));
		this.Add(new Property("暴击", AttributeQuality[pro.crit], true));
		this.Add(new Property("品质", HeroQuality[pro.Hero_Quality], false));
		this.Add(new Property("星级", StarQuality[pro.Star_Quality], false));
		return this;
	}

}





var HeroQuality = [    //英雄品质
	{ name: "N", num: 1.4 },
	{ name: "R", num: 1.6 },
	{ name: "SR", num: 1.8 },
	{ name: "SSR", num: 2.0 }
]
enum Heroenum {     //英雄品质
	N = 0,
	R = 1,
	SR = 2,
	SSR = 3
}
var StarQuality = [          //星级品质
	{ name: "ONE", num: 0.8 },
	{ name: "TWO", num: 1.0 },
	{ name: "THRE", num: 1.2 },
	{ name: "FOUR", num: 1.5 },
	{ name: "FIFE", num: 2.0 },
	{ name: "SIX", num: 2.8 }

]
enum Starenum {          //星级品质
	ONE = 0,
	TWO = 1,
	THREE = 2,
	FOUR = 3,
	FIFE = 4,
	SIX = 5,
}
var AttributeQuality = [          //属性品质
	{ name: "S", num: 2.8 },
	{ name: "A", num: 2.3 },
	{ name: "B", num: 1.8 },
	{ name: "C", num: 1.4 },
	{ name: "D", num: 1.0 }
]
enum Attributeenum {          //属性品质
	S = 0,
	A = 1,
	B = 2,
	C = 3,
	D = 4
}

var EquipmentQuality = [          //属性品质
	{ name: "S", num: 1.4 },
	{ name: "A", num: 1.15 },
	{ name: "B", num: 0.9 },
	{ name: "C", num: 0.7 },
	{ name: "D", num: 0.5 }
]



var JewelQuality = [          //属性品质
	{ name: "S", num: 0.7 },
	{ name: "A", num: 0.55 },
	{ name: "B", num: 0.45 },
	{ name: "C", num: 0.35 },
	{ name: "D", num: 0.25 }
]


enum _properties {         //属性顺序
	atk = 0,
	hp = 1,
	def = 2,
	spd = 3,
	crit = 4,
	Star = 5,
	Hero = 6

}
