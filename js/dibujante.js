/* El objeto dibujante se encarga de manipular el canvas y hacer todo lo necesario
para poder pintar en la pantalla. Es un objeto que abstrae las complejidades del
canvas, brindandonos una interfaz para controlarlo facilmente en el juego.
No tenes que preocuparte por este archivo, solo saber como usar sus funciones. */

var Dibujante = {
  canvas: document.createElement('canvas'),

  borrarAreaDeJuego: function () {
    this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  inicializarCanvas: function (anchoCanvas, altoCanvas) {
    this.canvas.width = anchoCanvas;
    this.canvas.height = altoCanvas;
    this.canvas.style.borderRadius = '5px';
    this.canvas.style.border = '2px solid #f9fafc';
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.canvas.getContext('2d').fillStyle = '#f9fafc';
    this.canvas.getContext('2d').font = "12px sans-serif";
  },
}
