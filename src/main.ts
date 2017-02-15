class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }


}

window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context = canvas.getContext("2d");
    var container = new DisplayObjectContainer();
    var image = new DrawBitmap();
    var textfield = new DrawTextField();
    container.addChild(textfield);
    container.addChild(image);
    container.draw(context);
};
interface Drawable {
    draw(contextId, x: number, y: number);
}
class DisplayObjectContainer implements Drawable {
    list = [];
    addChild(x) {
        this.list.push(x);
    }
    draw(contextId) {
        for (let element of this.list) {
            element.draw(contextId);
        }
    }
}
class DrawBitmap extends DisplayObjectContainer {
    draw(contextId) {
        //var c=document.getElementById("myCanvas")as HTMLCanvasElement;
        // var cxt=c.getContext("2d");
        // cxt.fillStyle="#FF0000";
        // cxt.fillRect(0,0,150,75);
        var image = new Image();
        image.src = "AH2.jpg";
        image.onload = () => {
            contextId.drawImage(image, 0, 150);
        }
    }
}

class DrawTextField extends DisplayObjectContainer {
    draw(contextId) {
        var c = document.getElementById("myCanvas") as HTMLCanvasElement;
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
    }
}