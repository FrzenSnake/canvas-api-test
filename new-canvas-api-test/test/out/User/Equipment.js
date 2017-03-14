var Equipment = (function () {
    function Equipment(Level, configId) {
        var _this = this;
        this.jewels = []; //宝石
        this.properties = new Properties(Level);
        for (var _i = 0, EquipmentConfig_1 = EquipmentConfig; _i < EquipmentConfig_1.length; _i++) {
            var pro = EquipmentConfig_1[_i];
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
        this.equipment_bitmap.addEventListener(engine.MouseState.MOUSE_CLICK, function () {
            if (User.user.statemachine.locked) {
                console.log("equipment被点击了");
                var displayFactory = new DisplayFacory();
                displayFactory.createPropertyPanel(_this.properties, GameMap.gamemap.Stage, 600, 300);
            }
        });
    }
    Equipment.prototype.Addjewel = function (jewel) {
        this.jewels.push(jewel);
    };
    return Equipment;
}());
