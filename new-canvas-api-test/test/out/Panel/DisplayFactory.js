var DisplayFacory = (function () {
    function DisplayFacory() {
    }
    DisplayFacory.prototype.getDesciption = function (property) {
        return property.name + " : " + property.quality;
    };
    DisplayFacory.prototype.createPropertyButton = function (PropertyButton, panel, stage, hero, x, y) {
        var _this = this;
        var ButtonContainer = new engine.DisplayObjectContainer;
        PropertyButton.touchEnabled = true;
        PropertyButton.addEventListener(engine.MouseState.MOUSE_CLICK, function () {
            var locked = User.user.statemachine.locked;
            var currentx = 60;
            var currenty = 300;
            if (locked == 0) {
                User.user.statemachine.locked++;
                PropertyButton.touchEnabled = false;
                var container = new engine.DisplayObjectContainer();
                container.x = 650;
                container.y = 130;
                container.addChild(panel);
                var closefield = new engine.TextField();
                closefield.text = "关闭";
                closefield.textcolor = "#000000";
                closefield.x = 400;
                // closefield.y = 140;
                closefield.touchEnabled = true;
                container.addChild(closefield);
                for (var _i = 0, _a = hero.equipments; _i < _a.length; _i++) {
                    var equipment = _a[_i];
                    if (equipment) {
                        currentx = x;
                        var equipment_bitmap = equipment.equipment_bitmap;
                        equipment_bitmap.x = currentx;
                        equipment_bitmap.y = currenty;
                        container.addChild(equipment_bitmap);
                        currentx = currentx + 200;
                        for (var _b = 0, _c = equipment.jewels; _b < _c.length; _b++) {
                            var jewel = _c[_b];
                            if (jewel) {
                                var jewel_bitmap = jewel.jewel_bitmap;
                                jewel_bitmap.x = currentx;
                                jewel_bitmap.y = currenty;
                                container.addChild(jewel_bitmap);
                                currentx = currentx + 120;
                            }
                        }
                        currenty = currenty + 150;
                    }
                }
                var heroContainer = _this.createHero(User.user.heroes[0], 100, 88);
                container.addChild(heroContainer);
                var equipContainer = _this.createEquitment(User.user.heroes[0].equipments, 320, 88);
                container.addChild(equipContainer);
                container.touchEnabled = true;
                stage.addChild(container);
                closefield.addEventListener(engine.MouseState.MOUSE_CLICK, function () {
                    User.user.statemachine.locked--;
                    stage.removeChild(container);
                    PropertyButton.touchEnabled = true;
                });
            }
        });
        ButtonContainer.addChild(PropertyButton);
        return ButtonContainer;
    };
    DisplayFacory.prototype.createHero = function (hero, x, y) {
        var _y = 0;
        var container = new engine.DisplayObjectContainer();
        for (var i = 0; i < hero.properties.order.length; i++) {
            var p = hero.properties[hero.properties.order[i]];
            if (p) {
                var tf = new engine.TextField();
                if (hero.properties.all[i].isRate) {
                    tf.text = this.getDesciption(hero.properties.all[i]) + " " + p / 10 + "%";
                }
                else {
                    tf.text = this.getDesciption(hero.properties.all[i]) + " " + p;
                }
                tf.textcolor = "#000000";
                tf.y = _y;
                _y = _y + 45;
                container.addChild(tf);
            }
            ;
        }
        container.x = x;
        container.y = y;
        return container;
    };
    DisplayFacory.prototype.createEquitment = function (equipments, x, y) {
        var _y = 0;
        var container = new engine.DisplayObjectContainer();
        for (var i = 0; i < User.user.heroes[0].properties.order.length; i++) {
            var result = 0;
            for (var _i = 0, equipments_1 = equipments; _i < equipments_1.length; _i++) {
                var equip_1 = equipments_1[_i];
                result = result + equip_1.properties[equip_1.properties.order[i]];
                for (var _a = 0, _b = equip_1.jewels; _a < _b.length; _a++) {
                    var jewel_1 = _b[_a];
                    result = result + jewel_1.properties[jewel_1.properties.order[i]]; //结果加上装备和宝石的第i个属性
                }
            }
            var tf = new engine.TextField();
            if (result != 0) {
                if (User.user.heroes[0].properties.all[i].isRate) {
                    tf.text = " + " + result / 10 + " %";
                }
                else {
                    tf.text = " + " + result + " ";
                }
            }
            tf.y = _y;
            tf.textcolor = "#000000";
            _y = _y + 45;
            container.addChild(tf);
        }
        container.x = x;
        container.y = y;
        return container;
    };
    DisplayFacory.prototype.createPropertyPanel = function (properties, stage, x, y) {
        var locked = User.user.statemachine.locked;
        locked++;
        var container = new engine.DisplayObjectContainer();
        var panel = new engine.Shape();
        panel.beginFill("#000000", 0.8);
        panel.drawRect(x, y, 400, 400);
        // panel.endFill();
        stage.addChild(panel);
        var count = 0;
        for (var i = 0; i < properties.order.length; i++) {
            var p = properties[properties.order[i]];
            if (p) {
                var tf = new engine.TextField();
                console.log("打印数据");
                if (properties.all[i].isRate) {
                    tf.text = this.getDesciption(properties.all[i]) + " " + p / 10 + "%";
                }
                else {
                    tf.text = this.getDesciption(properties.all[i]) + " " + p;
                }
                tf.x = x;
                tf.y = y;
                y = y + 48;
                container.addChild(tf);
            }
        }
        stage.addChild(container);
        panel.touchEnabled = true;
        panel.addEventListener(engine.MouseState.MOUSE_CLICK, function () {
            stage.removeChild(container);
            stage.removeChild(panel);
            if (locked >= 0) {
                locked--;
            }
        });
    };
    DisplayFacory.prototype.createModel = function (model, scale, stage, x, y) {
        stage.addChild(model);
        model.x = x;
        model.y = y;
        model.scaleX = scale;
        model.scaleY = scale;
    };
    return DisplayFacory;
}());
