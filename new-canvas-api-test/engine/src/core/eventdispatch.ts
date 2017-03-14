namespace engine {
	export interface IEventDispatcher {
		/**
		 * 注册事件监听器
		 */
		addEventListener(type: MouseState, listener: (e?: MouseEvent) => void, useCapture?: boolean);
		/**
		 * 移除事件监听器
		 */
		removeEventListener(type: MouseState, listener: (e?: MouseEvent) => void, useCapture?: boolean);
		/**
		 * 时间派发器
		 */
		dispatchEvent(event: MyEvent);
	}

	/**
	 * 事件
	 */
	export class MyEvent {
		currentTarget: IEventDispatcher;
		target: IEventDispatcher;
		type: MouseState;
		cancelBubble = false;
		constructor(type: MouseState, target: IEventDispatcher, currentTarget: IEventDispatcher, cancelBubble?: boolean) {
			this.type = type;
			this.currentTarget = currentTarget;
			this.target = target;
			this.cancelBubble = cancelBubble;
		}
	}

	export class MyTouchevent {
		/**
		 * 鼠标事件
		 */
		Mouse_Event: MyEvent;
		/**
		 * 函数
		 */
		listener: (e?: MouseEvent) => void;

		public constructor(Mouse_Event: MyEvent, listener: (e?: MouseEvent) => void) {
			this.Mouse_Event = Mouse_Event;
			this.listener = listener;
		}
	}

	export class EventDispatcher implements IEventDispatcher {
		//事件组
		totalEventArray: MyTouchevent[] = [];
		static dispatchEventArray: MyTouchevent[] = []              //调度用eventArray；


		addEventListener(type: MouseState, listener: (e?: MouseEvent) => void, useCapture?: boolean) {
			var thisObject: IEventDispatcher = this;
			var event = new MyEvent(type, null, thisObject, useCapture);
			var newTouchEvent = new MyTouchevent(event, listener);
			this.totalEventArray.push(newTouchEvent);
		}


		removeEventListener(type: MouseState, listener: Function, useCapture?: boolean) {
			var thisObject: IEventDispatcher = this;
			var event = new MyEvent(type, null, thisObject, useCapture);
			var copyArray = this.totalEventArray;
			for (let currentEvent of this.totalEventArray) {
				if (currentEvent.Mouse_Event == event && currentEvent.listener == listener) {
					var index = this.totalEventArray.indexOf(currentEvent);
					copyArray.splice(index, 1);
				}
			}
			this.totalEventArray = copyArray;
		}

		//  事件触发器 获取事件流列表
		dispatchEvent(event: MyEvent) { }



		//执行事件
		static eventDispatch(e: MouseEvent) {//执行dispatchEventArray中所有的命令（都是目标正确的,），然后清空该列表
			for (let currentEvent of EventDispatcher.dispatchEventArray) {
				currentEvent.listener(e);
			}
			EventDispatcher.dispatchEventArray = [];
		}
	}



	export enum MouseState {
		MOUSE_UP = 1,
		MOUSE_DOWN = 2,
		MOUSE_MOVE = 3,
		MOUSE_CLICK = 0

	}

}