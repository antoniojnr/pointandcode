class Plataforma {
  constructor(x, y, largura, altura, cor) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.cor = cor;
  }

  mostrar() {
    push();
    noStroke();
    fill(this.cor);
    rect(this.x, this.y, this.largura, this.altura);
    pop();
  }
}
