var GameMap = (function () {
    function GameMap(stage) {
        this.Cols = 10;
        this.Rows = 10;
        this.Boxsize = 100;
        this.Stage = stage;
        this._map = [
            //第0行
            { image: "resource/assets/Ground.png", node: new _Node(0, 0, true) },
            { image: "resource/assets/Ground.png", node: new _Node(1, 0, true) },
            { image: "resource/assets/Wall.png", node: new _Node(2, 0, false) },
            { image: "resource/assets/Wall.png", node: new _Node(3, 0, false) },
            { image: "resource/assets/Wall.png", node: new _Node(4, 0, false) },
            { image: "resource/assets/Wall.png", node: new _Node(5, 0, false) },
            { image: "resource/assets/Wall.png", node: new _Node(6, 0, false) },
            { image: "resource/assets/Wall.png", node: new _Node(7, 0, false) },
            { image: "resource/assets/Wall.png", node: new _Node(8, 0, false) },
            { image: "resource/assets/Wall.png", node: new _Node(9, 0, false) },
            //第1行
            { image: "resource/assets/Wall.png", node: new _Node(0, 1, false) },
            { image: "resource/assets/Ground.png", node: new _Node(1, 1, true) },
            { image: "resource/assets/Wall.png", node: new _Node(2, 1, false) },
            { image: "resource/assets/Ground.png", node: new _Node(3, 1, true) },
            { image: "resource/assets/Ground.png", node: new _Node(4, 1, true) },
            { image: "resource/assets/Ground.png", node: new _Node(5, 1, true) },
            { image: "resource/assets/Ground.png", node: new _Node(6, 1, true) },
            { image: "resource/assets/Ground.png", node: new _Node(7, 1, true) },
            { image: "resource/assets/Ground.png", node: new _Node(8, 1, true) },
            { image: "resource/assets/Ground.png", node: new _Node(9, 1, false) },
            //第2行
            { image: "resource/assets/Wall.png", node: new _Node(0, 2, false) },
            { image: "resource/assets/Ground.png", node: new _Node(1, 2, true) },
            { image: "resource/assets/Wall.png", node: new _Node(2, 2, false) },
            { image: "resource/assets/Ground.png", node: new _Node(3, 2, true) },
            { image: "resource/assets/Ground.png", node: new _Node(4, 2, true) },
            { image: "resource/assets/Ground.png", node: new _Node(5, 2, true) },
            { image: "resource/assets/Ground.png", node: new _Node(6, 2, true) },
            { image: "resource/assets/Ground.png", node: new _Node(7, 2, true) },
            { image: "resource/assets/Ground.png", node: new _Node(8, 2, true) },
            { image: "resource/assets/Wall.png", node: new _Node(9, 2, false) },
            //第3行
            { image: "resource/assets/Wall.png", node: new _Node(0, 3, false) },
            { image: "resource/assets/Ground.png", node: new _Node(1, 3, true) },
            { image: "resource/assets/Wall.png", node: new _Node(2, 3, false) },
            { image: "resource/assets/Ground.png", node: new _Node(3, 3, true) },
            { image: "resource/assets/Ground.png", node: new _Node(4, 3, true) },
            { image: "resource/assets/Ground.png", node: new _Node(5, 3, true) },
            { image: "resource/assets/Ground.png", node: new _Node(6, 3, true) },
            { image: "resource/assets/Ground.png", node: new _Node(7, 3, true) },
            { image: "resource/assets/Ground.png", node: new _Node(8, 3, true) },
            { image: "resource/assets/Wall.png", node: new _Node(9, 3, false) },
            //第4行
            { image: "resource/assets/Wall.png", node: new _Node(0, 4, false) },
            { image: "resource/assets/Ground.png", node: new _Node(1, 4, true) },
            { image: "resource/assets/Ground.png", node: new _Node(2, 4, true) },
            { image: "resource/assets/Ground.png", node: new _Node(3, 4, true) },
            { image: "resource/assets/Ground.png", node: new _Node(4, 4, true) },
            { image: "resource/assets/Ground.png", node: new _Node(5, 4, true) },
            { image: "resource/assets/Wall.png", node: new _Node(6, 4, false) },
            { image: "resource/assets/Ground.png", node: new _Node(7, 4, true) },
            { image: "resource/assets/Ground.png", node: new _Node(8, 4, true) },
            { image: "resource/assets/Wall.png", node: new _Node(9, 4, false) },
            //第5行
            { image: "resource/assets/Ground.png", node: new _Node(0, 5, false) },
            { image: "resource/assets/Ground.png", node: new _Node(1, 5, true) },
            { image: "resource/assets/Ground.png", node: new _Node(2, 5, true) },
            { image: "resource/assets/Ground.png", node: new _Node(3, 5, true) },
            { image: "resource/assets/Ground.png", node: new _Node(4, 5, true) },
            { image: "resource/assets/Ground.png", node: new _Node(5, 5, true) },
            { image: "resource/assets/Wall.png", node: new _Node(6, 5, false) },
            { image: "resource/assets/Ground.png", node: new _Node(7, 5, true) },
            { image: "resource/assets/Ground.png", node: new _Node(8, 5, true) },
            { image: "resource/assets/Wall.png", node: new _Node(9, 5, false) },
            //第6行
            { image: "resource/assets/Wall.png", node: new _Node(0, 6, false) },
            { image: "resource/assets/Ground.png", node: new _Node(1, 6, true) },
            { image: "resource/assets/Wall.png", node: new _Node(2, 6, false) },
            { image: "resource/assets/Wall.png", node: new _Node(3, 6, false) },
            { image: "resource/assets/Wall.png", node: new _Node(4, 6, false) },
            { image: "resource/assets/Wall.png", node: new _Node(5, 6, false) },
            { image: "resource/assets/Wall.png", node: new _Node(6, 6, false) },
            { image: "resource/assets/Ground.png", node: new _Node(7, 6, true) },
            { image: "resource/assets/Ground.png", node: new _Node(8, 6, true) },
            { image: "resource/assets/Wall.png", node: new _Node(9, 6, false) },
            //第7行
            { image: "resource/assets/Wall.png", node: new _Node(0, 7, false) },
            { image: "resource/assets/Ground.png", node: new _Node(1, 7, true) },
            { image: "resource/assets/Ground.png", node: new _Node(2, 7, true) },
            { image: "resource/assets/Ground.png", node: new _Node(3, 7, true) },
            { image: "resource/assets/Ground.png", node: new _Node(4, 7, true) },
            { image: "resource/assets/Ground.png", node: new _Node(5, 7, true) },
            { image: "resource/assets/Wall.png", node: new _Node(6, 7, false) },
            { image: "resource/assets/Ground.png", node: new _Node(7, 7, true) },
            { image: "resource/assets/Ground.png", node: new _Node(8, 7, true) },
            { image: "resource/assets/Wall.png", node: new _Node(9, 7, false) },
            //第8行
            { image: "resource/assets/Wall.png", node: new _Node(0, 8, false) },
            { image: "resource/assets/Ground.png", node: new _Node(1, 8, true) },
            { image: "resource/assets/Ground.png", node: new _Node(2, 8, true) },
            { image: "resource/assets/Wall.png", node: new _Node(3, 8, false) },
            { image: "resource/assets/Ground.png", node: new _Node(4, 8, true) },
            { image: "resource/assets/Ground.png", node: new _Node(5, 8, true) },
            { image: "resource/assets/Wall.png", node: new _Node(6, 8, false) },
            { image: "resource/assets/Ground.png", node: new _Node(7, 8, true) },
            { image: "resource/assets/Ground.png", node: new _Node(8, 8, true) },
            { image: "resource/assets/Wall.png", node: new _Node(9, 8, false) },
            //第9行
            { image: "resource/assets/Wall.png", node: new _Node(0, 9, false) },
            { image: "resource/assets/Wall.png", node: new _Node(1, 9, false) },
            { image: "resource/assets/Wall.png", node: new _Node(2, 9, false) },
            { image: "resource/assets/Wall.png", node: new _Node(3, 9, false) },
            { image: "resource/assets/Wall.png", node: new _Node(4, 9, false) },
            { image: "resource/assets/Wall.png", node: new _Node(5, 9, false) },
            { image: "resource/assets/Wall.png", node: new _Node(6, 9, false) },
            { image: "resource/assets/Wall.png", node: new _Node(7, 9, false) },
            { image: "resource/assets/Ground.png", node: new _Node(8, 9, true) },
            { image: "resource/assets/Wall.png", node: new _Node(9, 9, false) },
        ];
        //var grid = new aster.Grid(8,8);
        var container = new engine.DisplayObjectContainer();
        var _loop_1 = function() {
            tile = this_1._map[i];
            var bitmap = new engine.Bitmap();
            bitmap.src = tile.image;
            bitmap.x = tile.node.x * this_1.Boxsize;
            bitmap.y = tile.node.y * this_1.Boxsize;
            bitmap.touchEnabled = tile.node.walkable;
            bitmap.addEventListener(engine.MouseState.MOUSE_CLICK, function (e) {
                if (User.user.statemachine.locked == 0) {
                    if (User.user.List) {
                        User.user.List.cancel();
                        User.user.List.addCommand(new WalkCommand(bitmap.x, bitmap.y));
                        User.user.List.execute();
                    }
                }
            });
            this_1.Stage.addChild(bitmap);
        };
        var this_1 = this;
        var tile;
        for (var i = 0; i < this._map.length; i++) {
            _loop_1();
        }
    }
    GameMap.prototype.getNode = function (x, y) {
        var result = this._map[y * this.Rows + x].node;
        return result;
    };
    GameMap.replaceScene = function (map) {
        GameMap.gamemap = map;
    };
    GameMap.getCurrentScene = function () {
        return GameMap.gamemap;
    };
    GameMap.prototype.stopMove = function (callback) {
        clearInterval(GameMap.interval);
        callback();
    };
    GameMap.prototype.moveTo = function (x, y, callback) {
        var _this = this;
        // engine.Ticker.getInstance().unregister(moveFunction);
        clearInterval(GameMap.interval);
        var _statemachine = User.user.statemachine;
        var startXpos = Math.floor(_statemachine.x / this.Boxsize); //总起点的格子（行和列数）
        var startYpos = Math.floor(_statemachine.y / this.Boxsize);
        var endXpos = Math.floor(x / this.Boxsize); //总终点的格子（行和列数）
        var endYpos = Math.floor(y / this.Boxsize);
        var astar = new AStar(this);
        if (astar.findPath(this.getNode(startXpos, startYpos), this.getNode(endXpos, endYpos)) &&
            !((startXpos == endXpos) && (startYpos == endYpos))) {
            //当终点可达到时：
            // astar._path.map((tile) => {                    //console正确数组
            //     console.log(`x:${tile.x},y:${tile.y}`)
            // });
            // console.log("start")
            // _statemachine.totalEndX = Math.floor(endXpos * this.Boxsize);
            // _statemachine.totalEndY = Math.floor(endYpos * this.Boxsize);
            var pathLength = astar._path.length;
            var i = 2;
            var pos = astar._path.shift();
            pos = astar._path.shift(); //pos为当前终点
            GameMap.interval = setInterval(function () {
                if (!_statemachine.moving) {
                    _statemachine.moving = true;
                    var Hypotenuse = 0; //斜边长，弦长
                    _statemachine.currentEndX = Math.floor(pos.x * _this.Boxsize); //当前终点
                    _statemachine.currentEndY = Math.floor(pos.y * _this.Boxsize);
                    var dx = _statemachine.currentEndX - _statemachine.x;
                    var dy = _statemachine.currentEndY - _statemachine.y;
                    _statemachine.setState("move", User.user.statemachine.MoveState);
                    Hypotenuse = Math.pow(dx * dx + dy * dy, 1 / 2);
                    var Ratiox = dx / Hypotenuse;
                    var Ratioy = dy / Hypotenuse;
                    _statemachine.Ratiox = Ratiox;
                    _statemachine.Ratioy = Ratioy;
                    _statemachine.timeOnEnterFrame = Math.floor(Date.now());
                    engine.Ticker.getInstance().register(moveFunction);
                }
            }, 80);
        }
        else {
            callback(); //回调
            return;
        }
        function moveFunction() {
            var nowTime = Math.floor(Date.now());
            var passTime = nowTime - _statemachine.timeOnEnterFrame;
            var speed = 0.4;
            _statemachine.x += passTime * speed * _statemachine.Ratiox;
            _statemachine.y += passTime * speed * _statemachine.Ratioy;
            _statemachine.timeOnEnterFrame = Date.now();
            if (_statemachine.y - _statemachine.currentEndY < 10 && _statemachine.y - _statemachine.currentEndY > -10 &&
                _statemachine.x - _statemachine.currentEndX < 10 && _statemachine.x - _statemachine.currentEndX > -10) {
                console.log("到地方了");
                _statemachine.moving = false;
                engine.Ticker.getInstance().unregister(moveFunction);
                _statemachine.setState("stand", User.user.statemachine.StandState);
                _statemachine.x = _statemachine.currentEndX;
                _statemachine.y = _statemachine.currentEndY;
                _statemachine.x = _statemachine.x;
                _statemachine.y = _statemachine.y;
                pos = astar._path.shift();
                if (i == pathLength) {
                    clearInterval(GameMap.interval);
                    i = 1;
                    console.log("end");
                    callback(); //回调
                    return;
                }
                i++;
            }
            return false;
        }
    };
    return GameMap;
}());
