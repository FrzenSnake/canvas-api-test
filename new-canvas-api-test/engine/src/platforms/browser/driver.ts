namespace engine {
	export let run = (canvas: HTMLCanvasElement) => {
		/**
		 * 底层容器
		 */
		var stage = new DisplayObjectContainer();
		let context2D = canvas.getContext("2d");
		let lastNow = Date.now();  //记录当前时间
		let frameHandler = () => {
			let now = Date.now();
			let deltaTime = now - lastNow;
			Ticker.getInstance().notify(deltaTime);//心跳控制器广播
			context2D.clearRect(0, 0, 1500, 1500);
			context2D.save();
			stage.draw(context2D);
			context2D.restore();
			lastNow = now;
			window.requestAnimationFrame(frameHandler);
		}
		window.requestAnimationFrame(frameHandler);

		window.onmousedown = (e) => {
			stage.handle(e, MouseState.MOUSE_DOWN);

			let downX = e.offsetX;
			let downY = e.offsetY;
			window.onmousemove = (e) => {
				stage.handle(e, MouseState.MOUSE_MOVE);
			}
			window.onmouseup = (e) => {
				stage.handle(e, MouseState.MOUSE_UP);
				window.onmousemove = (e) => { }
				let upX = e.offsetX;
				let upY = e.offsetY;
				let resultX = Math.abs(upX - downX);
				let resultY = Math.abs(upY - downY);
				if (resultX < 10 &&
					resultY < 10) {
					stage.handle(e, MouseState.MOUSE_CLICK);
				}
			}
		}
		return stage;
	}
}