namespace engine {
	export interface Drawable {
		draw(context: CanvasRenderingContext2D);
		hitTest(point: math.Point): DisplayObject;
	}


	export abstract class DisplayObject extends EventDispatcher implements Drawable {
		/**
		 * 坐标
		 */
		x = 0;
		y = 0;
		/**
		 * 透明度
		 */
		alpha = 1;
		protected globalAlpha = 1;
		/**
		 * 缩放(x,y)
		 */
		scaleX = 1;
		scaleY = 1;
		/**
		 * 旋转(度数 0~360)
		 */
		rotation = 0;
		/**
		 * 相对位置矩阵
		 */
		localMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
		/**
		 * 全球位置矩阵
		 */
		globalMatrix = new math.Matrix(1, 0, 0, 1, 0, 0);
		/**
		 * 父容器
		 */
		parent: DisplayObjectContainer = null;

		/**
		 * 是否可触碰
		 */
		touchEnabled = false;
		/**
		 * 绘制（矩阵变换）
		 */
		draw(context: CanvasRenderingContext2D) {
			this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
			//alpha变化
			if (this.parent) {
				//alpha变化
				this.globalAlpha = this.parent.globalAlpha * this.alpha;
				//矩阵变化
				this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
			} else {
				this.globalAlpha = this.alpha;
				this.globalMatrix = this.localMatrix;
			}
			context.globalAlpha = this.globalAlpha;
			var gMatrix = this.globalMatrix;
			context.setTransform(gMatrix.a, gMatrix.b, gMatrix.c, gMatrix.d, gMatrix.tx, gMatrix.ty);
			this.render(context);

		}

		/**
		 * 事件触发器
		 */
		handle(e: MouseEvent, type: MouseState) {

			let x = e.offsetX;
			let y = e.offsetY;
			let targetPoint = new math.Point(x, y);
			let target = this.hitTest(targetPoint);
			let result = target;
			if (result) { //找到目标
				let event = new MyEvent(type, target, result);//（type , 当前目标，总目标）
				result.dispatchEvent(event);//发属于自己的第一条消息
				while (result.parent) {    //当有父时
					let currentTarget = result.parent;//
					event = new MyEvent(type, target, currentTarget) //为父发消息
					result.parent.dispatchEvent(event);//           发送消息
					result = result.parent;
				};
				//没有parent了，开始执行所有listener
				EventDispatcher.eventDispatch(e);
			}
		}
		/**
		 * 事件派发器
		 */
		dispatchEvent(event: MyEvent): boolean {//(查找这个物体是不是有eventlistener，如果有，)
			for (let targetEvent of this.totalEventArray) {
				if (targetEvent.Mouse_Event.currentTarget == event.currentTarget &&
					targetEvent.Mouse_Event.type == event.type &&
					this.touchEnabled == true) {           //当前目标相同,且事件类型相同,可触碰
					if (targetEvent.Mouse_Event.cancelBubble) { //如果抓捕，方法插入队头
						EventDispatcher.dispatchEventArray.unshift(targetEvent);
					} else { //冒泡，插入队尾
						EventDispatcher.dispatchEventArray.push(targetEvent);
					}
				}
				return true;
			}
			return false;
		}


		abstract render(context: CanvasRenderingContext2D)
		abstract hitTest(point: math.Point): DisplayObject;
	}



	export class DisplayObjectContainer extends DisplayObject {
		children: DisplayObject[] = [];
		/**
		 * 增加子物体
		 */
		addChild(newObject: DisplayObject) {
			this.children.push(newObject);
			newObject.parent = this;
		}
		/**
		 * 移除子物体
		 */
		removeChild(displayObject: DisplayObject) {
			var copyArray = this.children
			for (let arrayobject of this.children) {
				if (arrayobject == displayObject) {
					var objectIndex = this.children.indexOf(arrayobject);
					copyArray.splice(objectIndex, 1);
					break;
				}
			}
			this.children = copyArray;
		}
		/**
		 * 渲染
		 */
		render(context: CanvasRenderingContext2D) {
			for (let c of this.children) {
				c.draw(context);
			}
		}
		/**
		 * 碰撞检测
		 */
		hitTest(point: math.Point): DisplayObject {
			for (let i = this.children.length - 1; i >= 0; i--) {
				let child = this.children[i];
				let invertChildMatrix = math.invertMatrix(this.localMatrix);//逆矩阵
				let pointBaseOnChild = math.pointAppendMatrix(point, invertChildMatrix);//点 * 逆矩阵
				let hitTestResult = child.hitTest(pointBaseOnChild);//点击目标
				if (hitTestResult) {
					return hitTestResult;
				}
			}
			return null;
		}
	}


	/*
		  位图
	*/
	export class Bitmap extends DisplayObject {
		src = "";
		Img = new Image();
		private isLoaded = false;
		render(context: CanvasRenderingContext2D) {
			this.Img.src = this.src
			if (this.isLoaded == true) {
				context.drawImage(this.Img, 0, 0);
				// console.log("已加载")
			}
			else {
				this.Img.onload = () => {
					context.drawImage(this.Img, 0, 0);
					// console.log("加载中")
					this.isLoaded = true;
				}
			}
		}

		hitTest(point: math.Point): DisplayObject {
			var rect = new math.Rectangle();
			rect.width = this.Img.width;
			rect.height = this.Img.height;
			let invertMatrix = math.invertMatrix(this.localMatrix);//逆矩阵
			let localPoint = math.pointAppendMatrix(point, invertMatrix);
			if (rect.isPointInRectangle(localPoint)) {
				return this;
			} else {
				return null
			}

		}


	}


	/*
		  文本框 
	 */
	export class TextField extends DisplayObject {
		text = " ";
		font = "Arial"
		size = 30;
		textcolor = "#000000";

		get width(): number {
			return this.text.length * this.size;
		}

		get height(): number {
			return this.size;
		}
		render(context: CanvasRenderingContext2D) {
			context.fillStyle = this.textcolor
			context.font = this.size + "px " + this.font;
			context.fillText(this.text, 0, 0);
		}
		hitTest(point: math.Point): DisplayObject {
			var rect = new math.Rectangle();
			rect.width = this.size * this.text.length;
			rect.height = this.size;
			let invertMatrix = math.invertMatrix(this.localMatrix);//逆矩阵
			let localPoint = math.pointAppendMatrix(point, invertMatrix);
			localPoint.y = localPoint.y + this.size;

			if (rect.isPointInRectangle(localPoint)) {
				return this;
			} else {
				return null
			}

		}

	}

	/**
	 * 图形
	 */
	export class Shape extends DisplayObject {
		/**
		 * 图形宽度
		 */
		width: number;
		/**
		 * 图形高度
		 */
		height: number
		/**
		 * 颜色
		 */
		color = "#000000";
		/**
		 * 形状
		 */
		private type: string;
		hitTest(point: math.Point): DisplayObject {
			var rect = new math.Rectangle();
			rect.width = this.width;
			rect.height = this.height;
			let invertMatrix = math.invertMatrix(this.localMatrix);//逆矩阵
			let localPoint = math.pointAppendMatrix(point, invertMatrix);
			if (rect.isPointInRectangle(localPoint)) {
				return this;
			} else {
				return null
			}

		}
		/**
		 * 设置颜色和alpha
		 */
		beginFill(color: string, alpha: number) {
			this.color = color;
			this.alpha = alpha;
		}
		/**
		 * 绘制方形
		 */
		drawRect(x: number, y: number, width: number, height: number) {
			this.type = "Rect";
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}
		render(context: CanvasRenderingContext2D) {
			context.fillStyle = this.color;
			switch (this.type) {
				case "Rect":
					context.fillRect(0, 0, this.width, this.height);
					break;
			}
		}
	}


	export type Ticker_Listener_Type = (deltaTime: number) => void;

	export class Ticker {

		private static instance: Ticker;
		/**
		 * 得到Ticker（全局只有一个）
		 */
		static getInstance() {
			if (!Ticker.instance) {
				Ticker.instance = new Ticker();
			}
			return Ticker.instance;
		}

		listeners: Ticker_Listener_Type[] = [];

		register(listener: Ticker_Listener_Type) {
			this.listeners.push(listener);
		}

		unregister(listener: Ticker_Listener_Type) {
			var copyListeners = this.listeners;
			for (let currnetListener of this.listeners) {
				if (currnetListener == listener) {
					var listenerIndex = this.listeners.indexOf(currnetListener);
					copyListeners.splice(listenerIndex, 1);
					break;
				}
			}
			this.listeners = copyListeners;
		}

		notify(deltaTime: number) {
			for (let listener of this.listeners) {
				listener(deltaTime);
			}
		}

	}
	export type MovieClipData = {

		name: string,
		frames: MovieClipFrameData[]
	}

	export type MovieClipFrameData = {
		"image": string
	}


	export class MovieClip extends Bitmap {
		/**
		 * 走过的时间
		 */
		private advancedTime: number = 0;
		/**
		 * 每帧时间
		 */
		private static FRAME_TIME = 64;
		/**
		 * 总帧数
		 */
		private TOTAL_FRAME = 0;
		/**
		 * 当前帧
		 */
		private currentFrameIndex: number;
		/**
		 * 动画信息
		 */
		private data: MovieClipData;

		constructor(data: MovieClipData) {
			super();
			this.setMovieClipData(data);
			this.play();
		}

		ticker = (deltaTime: number) => {
			// this.removeChild();
			this.advancedTime += deltaTime;
			if (this.advancedTime >= MovieClip.FRAME_TIME * this.TOTAL_FRAME) {
				this.advancedTime -= MovieClip.FRAME_TIME * this.TOTAL_FRAME;
			}//走过的时间超过帧动画的总时间，就把走过的时间退回一个总时长，重新播放动画
			this.currentFrameIndex = Math.floor(this.advancedTime / MovieClip.FRAME_TIME);


			let data = this.data;
			if (this.currentFrameIndex > this.TOTAL_FRAME) {
				console.log("帧数错误,位置 ： " + this.currentFrameIndex);
				return;
			} else {

				let frameData = data.frames[this.currentFrameIndex];
				let url = frameData.image;//得到当前图片信息

				this.src = url;
			}
		}

		play() {
			Ticker.getInstance().register(this.ticker);
		}

		stop() {
			Ticker.getInstance().unregister(this.ticker)
		}

		setMovieClipData(data: MovieClipData) {
			this.data = data;

			this.TOTAL_FRAME = this.data.frames.length;
			this.currentFrameIndex = 0;
			// 创建 / 更新 
		}
	}
}