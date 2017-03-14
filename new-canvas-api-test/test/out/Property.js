var Property = (function () {
    function Property(name, attribute, isRate) {
        this.name = name;
        this.value = attribute.num;
        this.quality = attribute.name;
        this.isRate = isRate;
    }
    return Property;
}());
var Properties = (function () {
    function Properties(level) {
        this.all = [];
        this.order = [
            "atk",
            "hp",
            "def",
            "spd",
            "crit",
        ];
        this.level = level;
    }
    Object.defineProperty(Properties.prototype, "atk", {
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
        get: function () {
            var result = (100 + ((4 * this.all[_properties.atk].value) + (3 * this.all[_properties.Hero].value) + (12 * this.all[_properties.Star].value)) * this.level).toFixed(0);
            return Number(result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Properties.prototype, "hp", {
        get: function () {
            var result = (400 + ((35 * this.all[_properties.hp].value) + (25 * this.all[_properties.Hero].value) + (45 * this.all[_properties.Star].value)) * this.level).toFixed(0);
            return Number(result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Properties.prototype, "def", {
        get: function () {
            var result = (60 + ((1.3 * this.all[_properties.def].value) + (0.5 * this.all[_properties.Hero].value) + (1.5 * this.all[_properties.Star].value)) * this.level).toFixed(0);
            return Number(result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Properties.prototype, "spd", {
        get: function () {
            var result = (90 + (this.all[_properties.spd].value * 8 + this.all[_properties.Hero].value * this.all[_properties.Star].value)).toFixed(0);
            return Number(result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Properties.prototype, "crit", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Properties.prototype.Add = function (property) {
        this.all.push(property);
    };
    Properties.prototype.AddFromConfig = function (pro) {
        this.Add(new Property("攻击", AttributeQuality[pro.atk], false));
        this.Add(new Property("生命", AttributeQuality[pro.hp], false));
        this.Add(new Property("防御", AttributeQuality[pro.def], false));
        this.Add(new Property("速度", AttributeQuality[pro.spd], false));
        this.Add(new Property("暴击", AttributeQuality[pro.crit], true));
        this.Add(new Property("品质", HeroQuality[pro.Hero_Quality], false));
        this.Add(new Property("星级", StarQuality[pro.Star_Quality], false));
        return this;
    };
    return Properties;
}());
var HeroQuality = [
    { name: "N", num: 1.4 },
    { name: "R", num: 1.6 },
    { name: "SR", num: 1.8 },
    { name: "SSR", num: 2.0 }
];
var Heroenum;
(function (Heroenum) {
    Heroenum[Heroenum["N"] = 0] = "N";
    Heroenum[Heroenum["R"] = 1] = "R";
    Heroenum[Heroenum["SR"] = 2] = "SR";
    Heroenum[Heroenum["SSR"] = 3] = "SSR";
})(Heroenum || (Heroenum = {}));
var StarQuality = [
    { name: "ONE", num: 0.8 },
    { name: "TWO", num: 1.0 },
    { name: "THRE", num: 1.2 },
    { name: "FOUR", num: 1.5 },
    { name: "FIFE", num: 2.0 },
    { name: "SIX", num: 2.8 }
];
var Starenum;
(function (Starenum) {
    Starenum[Starenum["ONE"] = 0] = "ONE";
    Starenum[Starenum["TWO"] = 1] = "TWO";
    Starenum[Starenum["THREE"] = 2] = "THREE";
    Starenum[Starenum["FOUR"] = 3] = "FOUR";
    Starenum[Starenum["FIFE"] = 4] = "FIFE";
    Starenum[Starenum["SIX"] = 5] = "SIX";
})(Starenum || (Starenum = {}));
var AttributeQuality = [
    { name: "S", num: 2.8 },
    { name: "A", num: 2.3 },
    { name: "B", num: 1.8 },
    { name: "C", num: 1.4 },
    { name: "D", num: 1.0 }
];
var Attributeenum;
(function (Attributeenum) {
    Attributeenum[Attributeenum["S"] = 0] = "S";
    Attributeenum[Attributeenum["A"] = 1] = "A";
    Attributeenum[Attributeenum["B"] = 2] = "B";
    Attributeenum[Attributeenum["C"] = 3] = "C";
    Attributeenum[Attributeenum["D"] = 4] = "D";
})(Attributeenum || (Attributeenum = {}));
var EquipmentQuality = [
    { name: "S", num: 1.4 },
    { name: "A", num: 1.15 },
    { name: "B", num: 0.9 },
    { name: "C", num: 0.7 },
    { name: "D", num: 0.5 }
];
var JewelQuality = [
    { name: "S", num: 0.7 },
    { name: "A", num: 0.55 },
    { name: "B", num: 0.45 },
    { name: "C", num: 0.35 },
    { name: "D", num: 0.25 }
];
var _properties;
(function (_properties) {
    _properties[_properties["atk"] = 0] = "atk";
    _properties[_properties["hp"] = 1] = "hp";
    _properties[_properties["def"] = 2] = "def";
    _properties[_properties["spd"] = 3] = "spd";
    _properties[_properties["crit"] = 4] = "crit";
    _properties[_properties["Star"] = 5] = "Star";
    _properties[_properties["Hero"] = 6] = "Hero";
})(_properties || (_properties = {}));
