var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var container = new DisplayObjectContainer();
    var image = new DrawBitmap();
    var textfield = new DrawTextField();
    container.addChild(textfield);
    container.addChild(image);
    container.draw(context);
};
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.list = [];
    }
    DisplayObjectContainer.prototype.addChild = function (x) {
        this.list.push(x);
    };
    DisplayObjectContainer.prototype.draw = function (contextId) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var element = _a[_i];
            element.draw(contextId);
        }
    };
    return DisplayObjectContainer;
}());
var DrawBitmap = (function (_super) {
    __extends(DrawBitmap, _super);
    function DrawBitmap() {
        _super.apply(this, arguments);
    }
    DrawBitmap.prototype.draw = function (contextId) {
        //var c=document.getElementById("myCanvas")as HTMLCanvasElement;
        // var cxt=c.getContext("2d");
        // cxt.fillStyle="#FF0000";
        // cxt.fillRect(0,0,150,75);
        var image = new Image();
        image.src = "AH2.jpg";
        image.onload = function () {
            contextId.drawImage(image, 0, 150);
        };
    };
    return DrawBitmap;
}(DisplayObjectContainer));
var DrawTextField = (function (_super) {
    __extends(DrawTextField, _super);
    function DrawTextField() {
        _super.apply(this, arguments);
    }
    DrawTextField.prototype.draw = function (contextId) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.font = "20px Verdana";
        ctx.fillText("Welcome to the Earth!", 10, 50);
        //   ctx.font="30px Verdana";
        //   var gradient=ctx.createLinearGradient(0,0,c.width,0);
        //   gradient.addColorStop(0,"magenta");
        //   gradient.addColorStop(0.5,"blue");
        //   gradient.addColorStop(1.0,"red");
        //   ctx.fillStyle=gradient;
        //   ctx.fillText("w3school.com.cn",10,90);
    };
    return DrawTextField;
}(DisplayObjectContainer));
//# sourceMappingURL=main.js.map