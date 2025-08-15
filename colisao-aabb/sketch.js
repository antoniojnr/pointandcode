class Objeto {
  constructor(x, y, largura, altura, rotulo) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.rotulo = rotulo;
    this.vx = 0;
    this.vy = 0;
  }

  mostrar() {
    fill(255, 80);
    rect(this.x, this.y, this.largura, this.altura);
    textSize(12);
    textAlign(LEFT, TOP);
    fill("black");
    text(`(${this.x}, ${this.y})`, this.x + 3, this.y + 3);
    text(`${this.largura}x${this.altura}`, this.x + 3, this.y + 19);

    textAlign(LEFT, BOTTOM);
    text(this.rotulo, this.x + 3, this.y + this.altura - 3);
  }

  seguir(x, y) {
    this.x = x;
    this.y = y;
  }

  mover() {
    this.x += this.vx;
    this.y += this.vy;
  }
}

let movel, fixo, controlarComMouse;
function setup() {
  createCanvas(400, 400);
  fixo = new Objeto(200, 150, 70, 90, "B");
  movel = new Objeto(100, 100, 70, 50, "A");
  controlarComMouse = true;
}

function draw() {
  background(220);
  text(
    "Pressione barra de espaço para alternar o controle \ndo objeto A entre mouse e setas direcionais.",
    10,
    10
  );
  movel.mover();
  movel.mostrar();
  fixo.mostrar();

  checarColisao();
  controlar();
  desenharInfo();
}

function checarColisao() {
  let colide =
    movel.y + movel.altura > fixo.y &&
    movel.y < fixo.y + fixo.altura &&
    movel.x < fixo.x + fixo.largura &&
    movel.x + movel.largura > fixo.x;

  if (colide) {
    let overlapLeft = movel.x + movel.largura - fixo.x;
    let overlapRight = fixo.x + fixo.largura - movel.x;
    let overlapTop = movel.y + movel.altura - fixo.y;
    let overlapBottom = fixo.y + fixo.altura - movel.y;

    let minOverlap = Math.min(
      overlapBottom,
      overlapLeft,
      overlapRight,
      overlapTop
    );

    if (minOverlap === overlapTop && movel.vy > 0) {
      movel.y = fixo.y - movel.altura;
      movel.vy = 0;
    } else if (minOverlap === overlapBottom && movel.vy < 0) {
      movel.y = fixo.y + fixo.altura;
      movel.vy = 0;
    } else if (minOverlap === overlapLeft && movel.vx > 0) {
      movel.x = fixo.x - movel.largura;
      movel.vx = 0;
    } else if (minOverlap === overlapRight && movel.vx < 0) {
      movel.x = fixo.x + fixo.largura;
      movel.vx = 0;
    }
  }
}

function controlar() {
  if (controlarComMouse) {
    movel.seguir(mouseX - movel.largura / 2, mouseY - movel.largura / 2);
  } else {
    if (keyIsDown(UP_ARROW)) {
      movel.vy = -1;
    } else if (keyIsDown(DOWN_ARROW)) {
      movel.vy = 1;
    } else {
      movel.vy = 0;
    }
    if (keyIsDown(LEFT_ARROW)) {
      movel.vx = -1;
    } else if (keyIsDown(RIGHT_ARROW)) {
      movel.vx = 1;
    } else {
      movel.vx = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    controlarComMouse = !controlarComMouse;
  }
}

function desenharInfo() {
  let topo = 300;
  textSize(12);
  textAlign(LEFT, TOP);
  fill("black");
  text("Colisão:", 10, topo);
  text(
    `Base de A > Topo de B: ${movel.y + movel.altura > fixo.y}`,
    10,
    topo + 20
  );
  text(
    `Topo de A < Base de B: ${movel.y < fixo.y + fixo.altura}`,
    10,
    topo + 40
  );
  text(
    `Esquerda de A < Direita de B: ${movel.x < fixo.x + fixo.largura}`,
    10,
    topo + 60
  );
  text(
    `Direita de A > Esquerda de B: ${movel.x + movel.largura > fixo.x}`,
    10,
    topo + 80
  );

  let overlapLeft = movel.x + movel.largura - fixo.x;
  let overlapRight = fixo.x + fixo.largura - movel.x;
  let overlapTop = movel.y + movel.altura - fixo.y;
  let overlapBottom = fixo.y + fixo.altura - movel.y;

  text("Sobreposição:", 220, topo);
  text(`Cima: ${overlapTop}`, 220, topo + 20);
  text(`Baixo: ${overlapBottom}`, 220, topo + 40);
  text(`Esquerda: ${overlapLeft}`, 220, topo + 60);
  text(`Direita: ${overlapRight}`, 220, topo + 80);

  text("Velocidade:", 320, topo);
  text(`vx: ${movel.vx}`, 320, topo + 20);
  text(`vy: ${movel.vy}`, 320, topo + 40);
}
