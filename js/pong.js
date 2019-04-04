
var Pong = function() {
    difficulty= 0.8,
    width= 400;
    height= 300;  
    paddlewidth= 50;  

}


Pong.prototype.Init = function() {
    var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

    Dibujante.inicializarCanvas(this.width, this.height);

    var player = new Player(this.width, this.height, this.paddlewidth);
    var computer = new Computer(this.width, this.height, this.paddlewidth, this.difficulty);
    var ball = new Ball();
    ball.containerWidth = this.width;
    ball.containerHeight = this.height;

    var keysDown = {};
    
    /**
     * Renderiza todos los elementos del juego
     */    
    function render() {
        Dibujante.canvas.getContext('2d').fillStyle = '#f9fafc';
        Dibujante.canvas.getContext('2d').fillRect(0, 0, Dibujante.canvas.width, Dibujante.canvas.height);
        Dibujante.canvas.getContext('2d').fillStyle = COLOR;

        //Renderizar objetos
    }
    /**
     * Actualiza la posición de todos los elementos en el juego
     */
    function update() {
        //Actualizar todos los objetos
    }

    /**
     * Se encarga de posicionar y renderizar todos los elementos del juego de manera continua
     */
    function step() {
        update();
        render();
        animate(step);
    }

    animate(step);

    var keydownEvent = function (event) {
        keysDown[event.keyCode] = true;
    };
    var keyupEvent = function (event) {
        delete keysDown[event.keyCode];
    };
    var elementDestroyed = function (event) {
        window.removeEventListener('keydown', keydownEvent, false);
        window.removeEventListener('keyup', keyupEvent, false);
        window.removeEventListener('DOMNodeRemoved', elementDestroyed, false);
    };

    window.addEventListener("keydown", keydownEvent);
    window.addEventListener("keyup", keyupEvent);
    window.addEventListener("DOMNodeRemoved", elementDestroyed);
};
