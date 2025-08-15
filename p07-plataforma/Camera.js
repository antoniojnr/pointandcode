class Camera {
  constructor(x, y, alvo, suavizacao) {
    this.x = x;
    this.y = y;
    this.alvo = alvo;
    this.suavizacao = suavizacao;
  }

  atualizar() {
    let alvoX = this.alvo.x - width / 2;
    this.x += (alvoX - this.x) * this.suavizacao;
  }
}
