var _Node = (function () {
    function _Node(x, y, _walkable) {
        this.costMultiplier = 1.0; //算法乘数
        this.x = x;
        this.y = y;
        this.walkable = _walkable;
    }
    return _Node;
}());
