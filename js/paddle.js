/**
 * Clase encargada de mostrar la paleta
 */
var Paddle = function(x, y, paddlewidth, width, height) {
    this.width = paddlewidth;
    this.height = 10;

    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 0;
    this.containerHeight = height;
    this.containerWidth = width;
}
/**
 * Renderiza el objeto paleta
 */
Paddle.prototype.render = function (ctx) {
    roundRect(Dibujante.canvas.getContext('2d'), this.x, this.y, this.width, this.height, 5, true, null);
};
/**
 * Mueve el objeto paleta
 */
Paddle.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if (this.x < 0) {
        this.x = 0;
        this.x_speed = 0;
    }
    else if (this.x + this.width > this.containerWidth) {
        this.x = this.containerWidth - this.width;
        this.x_speed = 0;
    }
};