declare namespace math {
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
    function pointAppendMatrix(point: Point, m: Matrix): Point;
    /**
     * 使用伴随矩阵法求逆矩阵
     * http://wenku.baidu.com/view/b0a9fed8ce2f0066f53322a9
     */
    function invertMatrix(m: Matrix): Matrix;
    function matrixAppendMatrix(m1: Matrix, m2: Matrix): Matrix;
    class Rectangle {
        x: number;
        y: number;
        height: number;
        width: number;
        constructor(x?: number, y?: number, high?: number, width?: number);
        isPointInRectangle(point: math.Point): boolean;
    }
    class Matrix {
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        toString(): string;
        updateFromDisplayObject(x: number, y: number, scaleX: number, scaleY: number, rotation: number): void;
    }
}
declare namespace engine {
    interface IEventDispatcher {
        /**
         * 注册事件监听器
         */
        addEventListener(type: MouseState, listener: (e?: MouseEvent) => void, useCapture?: boolean): any;
        /**
         * 移除事件监听器
         */
        removeEventListener(type: MouseState, listener: (e?: MouseEvent) => void, useCapture?: boolean): any;
        /**
         * 时间派发器
         */
        dispatchEvent(event: MyEvent): any;
    }
    /**
     * 事件
     */
    class MyEvent {
        currentTarget: IEventDispatcher;
        target: IEventDispatcher;
        type: MouseState;
        cancelBubble: boolean;
        constructor(type: MouseState, target: IEventDispatcher, currentTarget: IEventDispatcher, cancelBubble?: boolean);
    }
    class MyTouchevent {
        /**
         * 鼠标事件
         */
        Mouse_Event: MyEvent;
        /**
         * 函数
         */
        listener: (e?: MouseEvent) => void;
        constructor(Mouse_Event: MyEvent, listener: (e?: MouseEvent) => void);
    }
    class EventDispatcher implements IEventDispatcher {
        totalEventArray: MyTouchevent[];
        static dispatchEventArray: MyTouchevent[];
        addEventListener(type: MouseState, listener: (e?: MouseEvent) => void, useCapture?: boolean): void;
        removeEventListener(type: MouseState, listener: Function, useCapture?: boolean): void;
        dispatchEvent(event: MyEvent): void;
        static eventDispatch(e: MouseEvent): void;
    }
    enum MouseState {
        MOUSE_UP = 1,
        MOUSE_DOWN = 2,
        MOUSE_MOVE = 3,
        MOUSE_CLICK = 0,
    }
}
declare namespace engine {
    interface Drawable {
        draw(context: CanvasRenderingContext2D): any;
        hitTest(point: math.Point): DisplayObject;
    }
    abstract class DisplayObject extends EventDispatcher implements Drawable {
        /**
         * 坐标
         */
        x: number;
        y: number;
        /**
         * 透明度
         */
        alpha: number;
        protected globalAlpha: number;
        /**
         * 缩放(x,y)
         */
        scaleX: number;
        scaleY: number;
        /**
         * 旋转(度数 0~360)
         */
        rotation: number;
        /**
         * 相对位置矩阵
         */
        localMatrix: math.Matrix;
        /**
         * 全球位置矩阵
         */
        globalMatrix: math.Matrix;
        /**
         * 父容器
         */
        parent: DisplayObjectContainer;
        /**
         * 是否可触碰
         */
        touchEnabled: boolean;
        /**
         * 绘制（矩阵变换）
         */
        draw(context: CanvasRenderingContext2D): void;
        /**
         * 事件触发器
         */
        handle(e: MouseEvent, type: MouseState): void;
        /**
         * 事件派发器
         */
        dispatchEvent(event: MyEvent): boolean;
        abstract render(context: CanvasRenderingContext2D): any;
        abstract hitTest(point: math.Point): DisplayObject;
    }
    class DisplayObjectContainer extends DisplayObject {
        children: DisplayObject[];
        /**
         * 增加子物体
         */
        addChild(newObject: DisplayObject): void;
        /**
         * 移除子物体
         */
        removeChild(displayObject: DisplayObject): void;
        /**
         * 渲染
         */
        render(context: CanvasRenderingContext2D): void;
        /**
         * 碰撞检测
         */
        hitTest(point: math.Point): DisplayObject;
    }
    class Bitmap extends DisplayObject {
        src: string;
        Img: HTMLImageElement;
        private isLoaded;
        render(context: CanvasRenderingContext2D): void;
        hitTest(point: math.Point): DisplayObject;
    }
    class TextField extends DisplayObject {
        text: string;
        font: string;
        size: number;
        textcolor: string;
        width: number;
        height: number;
        render(context: CanvasRenderingContext2D): void;
        hitTest(point: math.Point): DisplayObject;
    }
    /**
     * 图形
     */
    class Shape extends DisplayObject {
        /**
         * 图形宽度
         */
        width: number;
        /**
         * 图形高度
         */
        height: number;
        /**
         * 颜色
         */
        color: string;
        /**
         * 形状
         */
        private type;
        hitTest(point: math.Point): DisplayObject;
        /**
         * 设置颜色和alpha
         */
        beginFill(color: string, alpha: number): void;
        /**
         * 绘制方形
         */
        drawRect(x: number, y: number, width: number, height: number): void;
        render(context: CanvasRenderingContext2D): void;
    }
    type Ticker_Listener_Type = (deltaTime: number) => void;
    class Ticker {
        private static instance;
        /**
         * 得到Ticker（全局只有一个）
         */
        static getInstance(): Ticker;
        listeners: Ticker_Listener_Type[];
        register(listener: Ticker_Listener_Type): void;
        unregister(listener: Ticker_Listener_Type): void;
        notify(deltaTime: number): void;
    }
    type MovieClipData = {
        name: string;
        frames: MovieClipFrameData[];
    };
    type MovieClipFrameData = {
        "image": string;
    };
    class MovieClip extends Bitmap {
        /**
         * 走过的时间
         */
        private advancedTime;
        /**
         * 每帧时间
         */
        private static FRAME_TIME;
        /**
         * 总帧数
         */
        private TOTAL_FRAME;
        /**
         * 当前帧
         */
        private currentFrameIndex;
        /**
         * 动画信息
         */
        private data;
        constructor(data: MovieClipData);
        ticker: (deltaTime: number) => void;
        play(): void;
        stop(): void;
        setMovieClipData(data: MovieClipData): void;
    }
}
declare namespace engine {
    let run: (canvas: HTMLCanvasElement) => DisplayObjectContainer;
}
