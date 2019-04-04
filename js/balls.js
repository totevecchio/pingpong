/**
 * Definición del objeto Ball
 */
var Ball = function (x, y, speedX, speedY, rad) {
    this.radius = rad || 5;
    this.containerWidth = 400;
    this.containerHeight = 300;
    this.default_x_position = function () { return typeof x === 'undefined' ? this.containerWidth / 2 : x; };
    this.default_y_position = function () { return typeof y === 'undefined' ? this.containerHeight / 2 : y; };

    this.default_x_speed = function () { return typeof speedX === 'undefined' ? 0 : speedX; };
    this.default_y_speed = function () { return typeof speedY === 'undefined' ? 3 : speedY; };
    
    this.resetSpeed = function () {
        this.x_speed = this.default_x_speed();
        this.y_speed = this.default_y_speed();
    };
    this.resetPosition = function () {
        this.x = this.default_x_position();
        this.y = this.default_y_position();
    };

    this.reset = function () {
        this.resetSpeed();
        this.resetPosition();
    };

    this.reset();
}

Ball.prototype.render = function () {
    Dibujante.canvas.getContext('2d').beginPath();
    Dibujante.canvas.getContext('2d').fillStyle = "#d23636";
    Dibujante.canvas.getContext('2d').arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    Dibujante.canvas.getContext('2d').fill();
};
/**
 * La puntuación se determina cuando la pelota se mueve.
 * La velocidad y la posición de la bola se determinan internamente al objeto de la bola.
 */
Ball.prototype.update = function (playerBottom, playerTop) {
    // La velocidad se aplica a las posiciones x e y de la pelota, que a la vez mueve la pelota.
    this.x += this.x_speed;
    this.y += this.y_speed;

    var top_x = this.x - this.radius;
    var top_y = this.y - this.radius;
    var bottom_x = this.x + this.radius;
    var bottom_y = this.y + this.radius;
    var paddleBottom = playerBottom.paddle;
    var paddleTop = playerTop.paddle;

    // Averigua si la dirección de la pelota debe cambiar
    var ballHitLeftWall = this.x - this.radius < 0;
    var ballHitRightWall = this.x + this.radius > this.containerWidth;
    if (ballHitLeftWall) {
        this.x = this.radius;
        this.x_speed = -this.x_speed;
    }
    else if (ballHitRightWall) {
        this.x = this.containerWidth - this.radius;
        this.x_speed = -this.x_speed;
    }

    // Cuando alguien hace un punto posiciona la pelota al centro
    var bottomScored = this.y < 0;
    var topScored = this.y > 300;
    if (bottomScored || topScored) {

        if (bottomScored) {
            playerBottom.score++;
        }
        if (topScored) {
            playerTop.score++;
        }

        this.reset();
    }

    // Determina cuanto debe cambiar la velocidad de la pelota
    // Cuando la pelota toca la paleta:
    // the ball vertical trajectory reverses and gets set to a randomly but loosely based on the paddle speed,
    // and the horizontal speed increases by half the speed of the paddle.

    var ballInBottomOfScreen = top_y > (this.containerHeight * 0.75);
    if (ballInBottomOfScreen) {

        var bottomPaddleYArea = paddleBottom.y + paddleBottom.height;
        var ballTopIsUnderBottomPaddle = top_y < bottomPaddleYArea;
        var ballBottomIsAboveBottomPaddle = bottom_y > paddleBottom.y;
        var ballYOverlapsBottomPaddle = ballTopIsUnderBottomPaddle && ballBottomIsAboveBottomPaddle;

        var bottomPaddleXArea = paddleBottom.x + paddleBottom.width;
        var ballXOverlapsBottomPaddle = top_x < bottomPaddleXArea && bottom_x > paddleBottom.x;

        var ballHitBottomPaddle = ballYOverlapsBottomPaddle && ballXOverlapsBottomPaddle;

        if (ballHitBottomPaddle) {
            this.y_speed = randomOffset(-(Math.abs(paddleBottom.x_speed || 4)), -0.9 * Math.abs(paddleBottom.x_speed || 4));
            this.x_speed += (paddleBottom.x_speed / 2);
            this.y += this.y_speed;
        }
    }
    else {
        var topPaddleBottom = paddleTop.y + paddleTop.height;
        var ballTopIsOverTopPaddle = top_y < topPaddleBottom;
        var ballBottomIsUnderTopPaddle = bottom_y > paddleTop.y;
        
        var ballXOverlapsTopPaddle = top_x < (paddleTop.x + paddleTop.width) && bottom_x > paddleTop.x;

        var ballHitTopPaddle = ballTopIsOverTopPaddle && ballBottomIsUnderTopPaddle && ballXOverlapsTopPaddle;
        
        if (ballHitTopPaddle) {
            this.y_speed = randomOffset(0.9 * Math.abs(paddleTop.x_speed || 4), Math.abs(paddleTop.x_speed || 4));
            this.x_speed += (paddleTop.x_speed / 2);
            this.y += this.y_speed;
        }
    }

};