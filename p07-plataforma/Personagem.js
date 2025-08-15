class Personagem {
  constructor(x, y, largura, altura, cor) {
    this.x = x;
    this.y = y;
    this.velocidadeX = 0;
    this.velocidadeY = 0;
    this.gravidade = 4;
    this.incVelocidade = 5;
    this.forcaPulo = -35;
    this.largura = largura;
    this.altura = altura;
    this.cor = cor;
    this.pulando = true;
  }

  mostrar() {
    push();
    noStroke();
    fill(this.cor);
    rect(this.x, this.y, this.largura, this.altura);
    pop();
  }

  mover() {
    this.velocidadeY += this.gravidade;
    this.y += this.velocidadeY;
    this.x += this.velocidadeX;
  }

  limitar(inicio, fim) {
    if (this.x < inicio) {
      this.x = inicio;
    }

    if (this.x > fim) {
      this.x = fim - this.largura;
    }
  }

  pular() {
    if (!this.pulando) {
      this.velocidadeY = this.forcaPulo;
      this.pulando = true;
    }
  }

  colide(outro) {
    let a = this;
    let b = outro;

    let colidiu =
      a.y + a.altura > b.y &&
      a.y < b.y + b.altura &&
      a.x < b.x + b.largura &&
      a.x + a.largura > b.x;

    if (colidiu) {
      let topo = a.y + a.altura - b.y;
      let base = b.y + b.altura - a.y;
      let esquerda = a.x + a.largura - b.x;
      let direita = b.x + b.largura - a.x;

      let menor = Math.min(topo, base, esquerda, direita);

      if (menor === topo && this.velocidadeY > 0) {
        this.velocidadeY = 0;
        this.y = b.y - this.altura;
        this.pulando = false;
      } else if (menor === base && this.velocidadeY < 0) {
        this.velocidadeY = 0;
        this.y = b.y + b.altura;
      } else if (menor == direita && this.velocidadeX < 0) {
        this.velocidadeX = 0;
        this.x = b.x + b.largura;
      } else if (menor == esquerda && this.velocidadeX > 0) {
        this.velocidadeX = 0;
        this.x = b.x - this.largura;
      }
    }
  }

  andar() {
    if (keyIsDown(LEFT_ARROW)) {
      this.velocidadeX = -this.incVelocidade;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.velocidadeX = this.incVelocidade;
    } else {
      this.velocidadeX = 0;
    }
  }
}
