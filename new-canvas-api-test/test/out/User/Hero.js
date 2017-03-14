var Hero = (function () {
    function Hero(isInTeam, Level, configId) {
        this.equipments = []; //装备
        this.isInTeam = isInTeam;
        this.properties = new Properties(Level);
        // var pro = HeroConfig[_properties.atk]
        for (var _i = 0, HeroConfig_1 = HeroConfig; _i < HeroConfig_1.length; _i++) {
            var pro = HeroConfig_1[_i];
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
    Hero.prototype.AddEquipment = function (equipment) {
        this.equipments.push(equipment);
    };
    Hero.prototype.getProperty = function (hero, properties_order) {
        var equiptotal = 0;
        for (var _i = 0, _a = hero.equipments; _i < _a.length; _i++) {
            var equip_1 = _a[_i];
            equiptotal = equiptotal + equip_1.properties[equip_1.properties.order[properties_order]];
            console.log("equiptotal  遍历装备: " + equiptotal);
            for (var _b = 0, _c = equip_1.jewels; _b < _c.length; _b++) {
                var jewel_1 = _c[_b];
                equiptotal = equiptotal + jewel_1.properties[jewel_1.properties.order[properties_order]]; //结果加上装备和宝石的第i个属性
                console.log("equiptotal  遍历宝石: " + equiptotal);
            }
        }
        var result = hero.properties[hero.properties.order[properties_order]] + equiptotal;
        if (hero.properties.all[properties_order].isRate) {
            return result / 10;
        }
        return result;
    };
    return Hero;
}());
