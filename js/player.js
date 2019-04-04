/**
 * 
 */
var Player = function(width, height, paddlewidth) {
    this.score = 0,
    this.paddleX = ((width / 2) - (paddlewidth / 2)),
    this.paddleY = height - 20,
    this.paddle = new Paddle(this.paddleX, this.paddleY, paddlewidth, width, height);
    this.containerHeight = height;
    this.containerWidth = width;
}

Player.prototype.render = function () {
    //Renderizar objetos dependientes
    Dibujante.canvas.getContext('2d').fillText(this.score.toString(), 5, this.containerHeight - 30);
};

Player.prototype.update = function (keysDown) {
    var value;
    for (var key in keysDown) {
        value = Number(key);
        if (value === 37) {
            this.paddle.move(-4, 0);
        }
        else if (value === 39) {
            this.paddle.move(4, 0);
        }
        else {
            this.paddle.move(0, 0);
        }
    }
};
