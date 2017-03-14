var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var math;
(function (math) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    math.Point = Point;
    function pointAppendMatrix(point, m) {
        var x = m.a * point.x + m.c * point.y + m.tx;
        var y = m.b * point.x + m.d * point.y + m.ty;
        return new Point(x, y);
    }
    math.pointAppendMatrix = pointAppendMatrix;
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
    math.invertMatrix = invertMatrix;
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
    math.matrixAppendMatrix = matrixAppendMatrix;
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var DEG_TO_RAD = Math.PI / 180;
    var Rectangle = (function () {
        function Rectangle(x, y, high, width) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (high === void 0) { high = 0; }
            if (width === void 0) { width = 0; }
            this.x = x;
            this.y = y;
            this.height = high;
            this.width = width;
        }
        Rectangle.prototype.isPointInRectangle = function (point) {
            if (point.x >= this.x &&
                point.x <= this.x + this.width &&
                point.y >= this.y &&
                point.y <= this.y + this.height) {
                return true;
            }
            else {
                return false;
            }
        };
        return Rectangle;
    }());
    math.Rectangle = Rectangle;
    ////     a   b   tx
    ////     c   d   ty
    ////     0   0   1
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
    math.Matrix = Matrix;
})(math || (math = {}));
var engine;
(function (engine) {
    /**
     * 事件
     */
    var MyEvent = (function () {
        function MyEvent(type, target, currentTarget, cancelBubble) {
            this.cancelBubble = false;
            this.type = type;
            this.currentTarget = currentTarget;
            this.target = target;
            this.cancelBubble = cancelBubble;
        }
        return MyEvent;
    }());
    engine.MyEvent = MyEvent;
    var MyTouchevent = (function () {
        function MyTouchevent(Mouse_Event, listener) {
            this.Mouse_Event = Mouse_Event;
            this.listener = listener;
        }
        return MyTouchevent;
    }());
    engine.MyTouchevent = MyTouchevent;
    var EventDispatcher = (function () {
        function EventDispatcher() {
            //事件组
            this.totalEventArray = [];
        }
        EventDispatcher.prototype.addEventListener = function (type, listener, useCapture) {
            var thisObject = this;
            var event = new MyEvent(type, null, thisObject, useCapture);
            var newTouchEvent = new MyTouchevent(event, listener);
            this.totalEventArray.push(newTouchEvent);
        };
        EventDispatcher.prototype.removeEventListener = function (type, listener, useCapture) {
            var thisObject = this;
            var event = new MyEvent(type, null, thisObject, useCapture);
            var copyArray = this.totalEventArray;
            for (var _i = 0, _a = this.totalEventArray; _i < _a.length; _i++) {
                var currentEvent = _a[_i];
                if (currentEvent.Mouse_Event == event && currentEvent.listener == listener) {
                    var index = this.totalEventArray.indexOf(currentEvent);
                    copyArray.splice(index, 1);
                }
            }
            this.totalEventArray = copyArray;
        };
        //  事件触发器 获取事件流列表
        EventDispatcher.prototype.dispatchEvent = function (event) { };
        //执行事件
        EventDispatcher.eventDispatch = function (e) {
            for (var _i = 0, _a = EventDispatcher.dispatchEventArray; _i < _a.length; _i++) {
                var currentEvent = _a[_i];
                currentEvent.listener(e);
            }
            EventDispatcher.dispatchEventArray = [];
        };
        EventDispatcher.dispatchEventArray = []; //调度用eventArray；
        return EventDispatcher;
    }());
    engine.EventDispatcher = EventDispatcher;
    (function (MouseState) {
        MouseState[MouseState["MOUSE_UP"] = 1] = "MOUSE_UP";
        MouseState[MouseState["MOUSE_DOWN"] = 2] = "MOUSE_DOWN";
        MouseState[MouseState["MOUSE_MOVE"] = 3] = "MOUSE_MOVE";
        MouseState[MouseState["MOUSE_CLICK"] = 0] = "MOUSE_CLICK";
    })(engine.MouseState || (engine.MouseState = {}));
    var MouseState = engine.MouseState;
})(engine || (engine = {}));
var engine;
(function (engine) {
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        function DisplayObject() {
            _super.apply(this, arguments);
            /**
             * 坐标
             */
            this.x = 0;
            this.y = 0;
            /**
             * 透明度
             */
            this.alpha = 1;
            this.globalAlpha = 1;
            /**
             * 缩放(x,y)
             */
            this.scaleX = 1;
            this.scaleY = 1;
            /**
             * 旋转(度数 0~360)
             */
            this.rotation = 0;
            /**
             * 相对位置矩阵
             */
            this.localMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
            /**
             * 全球位置矩阵
             */
            this.globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
            /**
             * 父容器
             */
            this.parent = null;
            /**
             * 是否可触碰
             */
            this.touchEnabled = false;
        }
        /**
         * 绘制（矩阵变换）
         */
        DisplayObject.prototype.draw = function (context) {
            this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            //alpha变化
            if (this.parent) {
                //alpha变化
                this.globalAlpha = this.parent.globalAlpha * this.alpha;
                //矩阵变化
                this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
            }
            else {
                this.globalAlpha = this.alpha;
                this.globalMatrix = this.localMatrix;
            }
            context.globalAlpha = this.globalAlpha;
            var gMatrix = this.globalMatrix;
            context.setTransform(gMatrix.a, gMatrix.b, gMatrix.c, gMatrix.d, gMatrix.tx, gMatrix.ty);
            this.render(context);
        };
        /**
         * 事件触发器
         */
        DisplayObject.prototype.handle = function (e, type) {
            var x = e.offsetX;
            var y = e.offsetY;
            var targetPoint = new math.Point(x, y);
            var target = this.hitTest(targetPoint);
            var result = target;
            if (result) {
                var event_1 = new engine.MyEvent(type, target, result); //（type , 当前目标，总目标）
                result.dispatchEvent(event_1); //发属于自己的第一条消息
                while (result.parent) {
                    var currentTarget = result.parent; //
                    event_1 = new engine.MyEvent(type, target, currentTarget); //为父发消息
                    result.parent.dispatchEvent(event_1); //           发送消息
                    result = result.parent;
                }
                ;
                //没有parent了，开始执行所有listener
                engine.EventDispatcher.eventDispatch(e);
            }
        };
        /**
         * 事件派发器
         */
        DisplayObject.prototype.dispatchEvent = function (event) {
            for (var _i = 0, _a = this.totalEventArray; _i < _a.length; _i++) {
                var targetEvent = _a[_i];
                if (targetEvent.Mouse_Event.currentTarget == event.currentTarget &&
                    targetEvent.Mouse_Event.type == event.type &&
                    this.touchEnabled == true) {
                    if (targetEvent.Mouse_Event.cancelBubble) {
                        engine.EventDispatcher.dispatchEventArray.unshift(targetEvent);
                    }
                    else {
                        engine.EventDispatcher.dispatchEventArray.push(targetEvent);
                    }
                }
                return true;
            }
            return false;
        };
        return DisplayObject;
    }(engine.EventDispatcher));
    engine.DisplayObject = DisplayObject;
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            _super.apply(this, arguments);
            this.children = [];
        }
        /**
         * 增加子物体
         */
        DisplayObjectContainer.prototype.addChild = function (newObject) {
            this.children.push(newObject);
            newObject.parent = this;
        };
        /**
         * 移除子物体
         */
        DisplayObjectContainer.prototype.removeChild = function (displayObject) {
            var copyArray = this.children;
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var arrayobject = _a[_i];
                if (arrayobject == displayObject) {
                    var objectIndex = this.children.indexOf(arrayobject);
                    copyArray.splice(objectIndex, 1);
                    break;
                }
            }
            this.children = copyArray;
        };
        /**
         * 渲染
         */
        DisplayObjectContainer.prototype.render = function (context) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var c = _a[_i];
                c.draw(context);
            }
        };
        /**
         * 碰撞检测
         */
        DisplayObjectContainer.prototype.hitTest = function (point) {
            for (var i = this.children.length - 1; i >= 0; i--) {
                var child = this.children[i];
                var invertChildMatrix = math.invertMatrix(this.localMatrix); //逆矩阵
                var pointBaseOnChild = math.pointAppendMatrix(point, invertChildMatrix); //点 * 逆矩阵
                var hitTestResult = child.hitTest(pointBaseOnChild); //点击目标
                if (hitTestResult) {
                    return hitTestResult;
                }
            }
            return null;
        };
        return DisplayObjectContainer;
    }(DisplayObject));
    engine.DisplayObjectContainer = DisplayObjectContainer;
    /*
          位图
    */
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap() {
            _super.apply(this, arguments);
            this.src = "";
            this.Img = new Image();
            this.isLoaded = false;
        }
        Bitmap.prototype.render = function (context) {
            var _this = this;
            this.Img.src = this.src;
            if (this.isLoaded == true) {
                context.drawImage(this.Img, 0, 0);
            }
            else {
                this.Img.onload = function () {
                    context.drawImage(_this.Img, 0, 0);
                    // console.log("加载中")
                    _this.isLoaded = true;
                };
            }
        };
        Bitmap.prototype.hitTest = function (point) {
            var rect = new math.Rectangle();
            rect.width = this.Img.width;
            rect.height = this.Img.height;
            var invertMatrix = math.invertMatrix(this.localMatrix); //逆矩阵
            var localPoint = math.pointAppendMatrix(point, invertMatrix);
            if (rect.isPointInRectangle(localPoint)) {
                return this;
            }
            else {
                return null;
            }
        };
        return Bitmap;
    }(DisplayObject));
    engine.Bitmap = Bitmap;
    /*
          文本框
     */
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            _super.apply(this, arguments);
            this.text = " ";
            this.font = "Arial";
            this.size = 30;
            this.textcolor = "#000000";
        }
        Object.defineProperty(TextField.prototype, "width", {
            get: function () {
                return this.text.length * this.size;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "height", {
            get: function () {
                return this.size;
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.render = function (context) {
            context.fillStyle = this.textcolor;
            context.font = this.size + "px " + this.font;
            context.fillText(this.text, 0, 0);
        };
        TextField.prototype.hitTest = function (point) {
            var rect = new math.Rectangle();
            rect.width = this.size * this.text.length;
            rect.height = this.size;
            var invertMatrix = math.invertMatrix(this.localMatrix); //逆矩阵
            var localPoint = math.pointAppendMatrix(point, invertMatrix);
            localPoint.y = localPoint.y + this.size;
            if (rect.isPointInRectangle(localPoint)) {
                return this;
            }
            else {
                return null;
            }
        };
        return TextField;
    }(DisplayObject));
    engine.TextField = TextField;
    /**
     * 图形
     */
    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape() {
            _super.apply(this, arguments);
            /**
             * 颜色
             */
            this.color = "#000000";
        }
        Shape.prototype.hitTest = function (point) {
            var rect = new math.Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            var invertMatrix = math.invertMatrix(this.localMatrix); //逆矩阵
            var localPoint = math.pointAppendMatrix(point, invertMatrix);
            if (rect.isPointInRectangle(localPoint)) {
                return this;
            }
            else {
                return null;
            }
        };
        /**
         * 设置颜色和alpha
         */
        Shape.prototype.beginFill = function (color, alpha) {
            this.color = color;
            this.alpha = alpha;
        };
        /**
         * 绘制方形
         */
        Shape.prototype.drawRect = function (x, y, width, height) {
            this.type = "Rect";
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        };
        Shape.prototype.render = function (context) {
            context.fillStyle = this.color;
            switch (this.type) {
                case "Rect":
                    context.fillRect(0, 0, this.width, this.height);
                    break;
            }
        };
        return Shape;
    }(DisplayObject));
    engine.Shape = Shape;
    var Ticker = (function () {
        function Ticker() {
            this.listeners = [];
        }
        /**
         * 得到Ticker（全局只有一个）
         */
        Ticker.getInstance = function () {
            if (!Ticker.instance) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        };
        Ticker.prototype.register = function (listener) {
            this.listeners.push(listener);
        };
        Ticker.prototype.unregister = function (listener) {
            var copyListeners = this.listeners;
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var currnetListener = _a[_i];
                if (currnetListener == listener) {
                    var listenerIndex = this.listeners.indexOf(currnetListener);
                    copyListeners.splice(listenerIndex, 1);
                    break;
                }
            }
            this.listeners = copyListeners;
        };
        Ticker.prototype.notify = function (deltaTime) {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(deltaTime);
            }
        };
        return Ticker;
    }());
    engine.Ticker = Ticker;
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(data) {
            var _this = this;
            _super.call(this);
            /**
             * 走过的时间
             */
            this.advancedTime = 0;
            /**
             * 总帧数
             */
            this.TOTAL_FRAME = 0;
            this.ticker = function (deltaTime) {
                // this.removeChild();
                _this.advancedTime += deltaTime;
                if (_this.advancedTime >= MovieClip.FRAME_TIME * _this.TOTAL_FRAME) {
                    _this.advancedTime -= MovieClip.FRAME_TIME * _this.TOTAL_FRAME;
                } //走过的时间超过帧动画的总时间，就把走过的时间退回一个总时长，重新播放动画
                _this.currentFrameIndex = Math.floor(_this.advancedTime / MovieClip.FRAME_TIME);
                var data = _this.data;
                if (_this.currentFrameIndex > _this.TOTAL_FRAME) {
                    console.log("帧数错误,位置 ： " + _this.currentFrameIndex);
                    return;
                }
                else {
                    var frameData = data.frames[_this.currentFrameIndex];
                    var url = frameData.image; //得到当前图片信息
                    _this.src = url;
                }
            };
            this.setMovieClipData(data);
            this.play();
        }
        MovieClip.prototype.play = function () {
            Ticker.getInstance().register(this.ticker);
        };
        MovieClip.prototype.stop = function () {
            Ticker.getInstance().unregister(this.ticker);
        };
        MovieClip.prototype.setMovieClipData = function (data) {
            this.data = data;
            this.TOTAL_FRAME = this.data.frames.length;
            this.currentFrameIndex = 0;
            // 创建 / 更新 
        };
        /**
         * 每帧时间
         */
        MovieClip.FRAME_TIME = 64;
        return MovieClip;
    }(Bitmap));
    engine.MovieClip = MovieClip;
})(engine || (engine = {}));
var engine;
(function (engine) {
    engine.run = function (canvas) {
        /**
         * 底层容器
         */
        var stage = new engine.DisplayObjectContainer();
        var context2D = canvas.getContext("2d");
        var lastNow = Date.now(); //记录当前时间
        var frameHandler = function () {
            var now = Date.now();
            var deltaTime = now - lastNow;
            engine.Ticker.getInstance().notify(deltaTime); //心跳控制器广播
            context2D.clearRect(0, 0, 1500, 1500);
            context2D.save();
            stage.draw(context2D);
            context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        };
        window.requestAnimationFrame(frameHandler);
        window.onmousedown = function (e) {
            stage.handle(e, engine.MouseState.MOUSE_DOWN);
            var downX = e.offsetX;
            var downY = e.offsetY;
            window.onmousemove = function (e) {
                stage.handle(e, engine.MouseState.MOUSE_MOVE);
            };
            window.onmouseup = function (e) {
                stage.handle(e, engine.MouseState.MOUSE_UP);
                window.onmousemove = function (e) { };
                var upX = e.offsetX;
                var upY = e.offsetY;
                var resultX = Math.abs(upX - downX);
                var resultY = Math.abs(upY - downY);
                if (resultX < 10 &&
                    resultY < 10) {
                    stage.handle(e, engine.MouseState.MOUSE_CLICK);
                }
            };
        };
        return stage;
    };
})(engine || (engine = {}));
