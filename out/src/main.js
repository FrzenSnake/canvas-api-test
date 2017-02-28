var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var container = new DisplayObjectContainer();
    container.alpha = 1;
    var image = new Bitmap();
    image.alpha = 0.5;
    image.src = "rider.jpg";
    image.scaleX = 2;
    image.scaleY = 1;
    image.x = 0;
    image.y = 0;
    image.rotation = 30;
    var text = new TextField();
    text.x = 50;
    text.y = 50;
    text.scaleY = 1;
    text.alpha = 0.5;
    text.color = "#FF0000";
    text.fontName = "Arial";
    text.fontSize = 20;
    text.text = "Hello World";
    container.addChild(image);
    container.addChild(text);
    container.draw(context);
    setInterval(function () {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        image.rotation++;
        container.x++;
        container.draw(context);
    }, 30);
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.alpha = 1;
        this.globalAlpha = 1;
    }
    DisplayObject.prototype.draw = function (context) {
        this.relativeMatrix = new Matrix();
        this.relativeMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.overallMatrix = matrixAppendMatrix(this.parent.overallMatrix, this.relativeMatrix);
        }
        else {
            this.globalAlpha = this.alpha;
            this.overallMatrix = this.relativeMatrix;
        }
        context.globalAlpha = this.globalAlpha;
        this.render(context);
    };
    DisplayObject.prototype.render = function (context) { };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = [];
        return _this;
    }
    DisplayObjectContainer.prototype.render = function (context) {
        console.log("相对矩阵：" + this.relativeMatrix.tx);
        console.log("全局矩阵：" + this.overallMatrix.tx);
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var displayObject = _a[_i];
            displayObject.draw(context);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        this.list.push(child);
        child.parent = this;
    };
    return DisplayObjectContainer;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = "";
        _this.color = "";
        _this.fontSize = 10;
        _this.fontName = "";
        return _this;
    }
    TextField.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.font = this.fontSize.toString() + "px " + this.fontName.toString();
        context.setTransform(this.overallMatrix.a, this.overallMatrix.b, this.overallMatrix.c, this.overallMatrix.d, this.overallMatrix.tx, this.overallMatrix.ty);
        context.fillText(this.text, 0, 0 + this.fontSize);
        console.log("相对矩阵：" + this.relativeMatrix.tx);
        console.log("全局矩阵：" + this.overallMatrix.tx);
    };
    return TextField;
}(DisplayObject));
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        var _this = _super.call(this) || this;
        _this.image = null;
        _this.isLoaded = false;
        _this._src = "";
        _this.image = document.createElement("img");
        return _this;
    }
    Object.defineProperty(Bitmap.prototype, "src", {
        set: function (value) {
            this._src = value;
            this.isLoaded = false;
        },
        enumerable: true,
        configurable: true
    });
    Bitmap.prototype.render = function (context) {
        var _this = this;
        if (this.isLoaded) {
            context.setTransform(this.overallMatrix.a, this.overallMatrix.b, this.overallMatrix.c, this.overallMatrix.d, this.overallMatrix.tx, this.overallMatrix.ty);
            context.drawImage(this.image, 0, 0);
        }
        else {
            this.image.src = this._src;
            this.image.onload = function () {
                context.setTransform(_this.overallMatrix.a, _this.overallMatrix.b, _this.overallMatrix.c, _this.overallMatrix.d, _this.overallMatrix.tx, _this.overallMatrix.ty);
                context.drawImage(_this.image, 0, 0);
                _this.isLoaded = true;
                console.log("相对矩阵：" + _this.relativeMatrix.tx);
                console.log("全局矩阵：" + _this.overallMatrix.tx);
            };
        }
    };
    return Bitmap;
}(DisplayObject));
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
function pointAppendMatrix(point, m) {
    var x = m.a * point.x + m.c * point.y + m.tx;
    var y = m.b * point.x + m.d * point.y + m.ty;
    return new Point(x, y);
}
/**
 * 使用伴随矩阵法求逆矩阵
 * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
 */
function invertMatrix(m) {
    var a = m.a;
    var b = m.b;
    var c = m.c;
    var d = m.d;
    var tx = m.tx;
    var ty = m.ty;
    var determinant = a * d - b * c;
    var result = new Matrix(1, 0, 0, 1, 0, 0);
    if (determinant == 0) {
        throw new Error("no invert");
    }
    determinant = 1 / determinant;
    var k = result.a = d * determinant;
    b = result.b = -b * determinant;
    c = result.c = -c * determinant;
    d = result.d = a * determinant;
    result.tx = -(k * tx + c * ty);
    result.ty = -(b * tx + d * ty);
    return result;
}
function matrixAppendMatrix(m1, m2) {
    var result = new Matrix();
    result.a = m1.a * m2.a + m1.b * m2.c;
    result.b = m1.a * m2.b + m1.b * m2.d;
    result.c = m2.a * m1.c + m2.c * m1.d;
    result.d = m2.b * m1.c + m1.d * m2.d;
    result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
    result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
    return result;
}
var PI = Math.PI;
var HalfPI = PI / 2;
var PacPI = PI + HalfPI;
var TwoPI = PI * 2;
var DEG_TO_RAD = Math.PI / 180;
var Matrix = (function () {
    function Matrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
    Matrix.prototype.toString = function () {
        return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
    };
    Matrix.prototype.updateFromDisplayObject = function (x, y, scaleX, scaleY, rotation) {
        this.tx = x;
        this.ty = y;
        var skewX, skewY;
        skewX = skewY = rotation / 180 * Math.PI;
        var u = Math.cos(skewX);
        var v = Math.sin(skewX);
        this.a = Math.cos(skewY) * scaleX;
        this.b = Math.sin(skewY) * scaleX;
        this.c = -v * scaleY;
        this.d = u * scaleY;
    };
    return Matrix;
}());
//# sourceMappingURL=main.js.map