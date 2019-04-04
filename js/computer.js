/**
 * TODO Crear Constructor
 */
var Computer = function(width, height, paddlewidth, difficulty){
    this.score = 0;
    this.paddleX = (width / 2) - (paddlewidth / 2);
    this.paddleY = 10;
    this.paddle = new Paddle(this.paddleX, this.paddleY, paddlewidth, width, height);
    this.difficulty = difficulty;
    this.containerHeight = height;
    this.containerWidth = width;
}

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

/**
 * Se encarga de renderizar al jugador computadora
 */
Computer.prototype.render = function () {
    Dibujante.canvas.getContext('2d').fillStyle = "#CCCCCC";
    this.paddle.render();
    Dibujante.canvas.getContext('2d').fillStyle = "#CCCCCC";
    Dibujante.canvas.getContext('2d').fillText(this.score.toString(), 5, 30);
};

/**
 * Actualiza la posición del jugador
 */
Computer.prototype.update = function (ball) {
    var ball_x_position = ball.x;
    // difference between ball x and the paddle x
    var diff = -((this.paddle.x + (this.paddle.width / 2)) - ball_x_position);
    if (diff < 0 && diff < -4) {
        diff = -5;
    }
    else if (diff > 0 && diff > 4) {
        diff = 5;
    }

    // sets the difficulty, an offset between these two numbers
    this.paddle.move(diff * randomOffset(this.difficulty, 1), 0);

    if (this.paddle.x < 0) {
        this.paddle.x = 0;
    }
    else if (this.paddle.x + this.paddle.width > this.containerHeight) {
        this.paddle.x = this.containerHeight - this.paddle.width;
    }
};