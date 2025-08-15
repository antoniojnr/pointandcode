let personagem;
let camera;
let info;
let plataformas = [];
let plataformasVisiveis = [];
let montanhas1 = [];
let montanhas2 = [];
let montanhas3 = [];

function setup() {
  createCanvas(400, 400);
  personagem = new Personagem(100, 100, 40, 60, "red");
  plataformas.push(
    new Plataforma(50, 300, 300, 50, "lime"),
    new Plataforma(300, 200, 50, 30, "lime"),
    new Plataforma(50, 240, 40, 60, "lime"),
    new Plataforma(150, 240, 40, 60, "lime"),
    new Plataforma(400, 300, 300, 50, "lime"),
    new Plataforma(750, 300, 300, 50, "lime"),
    new Plataforma(1100, 300, 50, 50, "lime"),
    new Plataforma(1200, 300, 50, 50, "lime"),
    new Plataforma(1300, 300, 150, 50, "lime")
  );
  montanhas1 = gerarMontanhas(-200, 5 * width, 0.005, 0, 300, 99);
  montanhas2 = gerarMontanhas(-200, 5 * width, 0.004, 120, 200, 150);
  montanhas3 = gerarMontanhas(-200, 5 * width, 0.005, 250, 200, 1150);
  camera = new Camera(0, 0, personagem, 0.3);
  info = createP("Blocos: " + plataformas.length);
}

function draw() {
  background("#bdecffff");

  camera.atualizar();

  push();
  translate(-camera.x, 0);

  desenharMontanhas(montanhas1, "#7cbd59ff", 0.1);
  desenharMontanhas(montanhas2, "#5e9a3dff", 0.2);
  desenharMontanhas(montanhas3, "#4a832bff", 0.3);

  personagem.andar();
  personagem.mover();
  personagem.limitar(50, 1350);

  plataformasVisiveis = filtrarBlocosVisiveis();
  info.html(
    `Exibindo ${plataformasVisiveis.length} de ${plataformas.length} blocos`
  );

  for (let plataforma of plataformasVisiveis) {
    personagem.colide(plataforma);
    plataforma.mostrar();
  }

  personagem.mostrar();
  pop();
}

function gerarMontanhas(inicio, fim, suavidade, deslocamento, amplitude, seed) {
  noiseSeed(seed);
  let pontos = [];
  for (let i = inicio; i < fim; i++) {
    pontos.push({
      x: i,
      y: deslocamento + amplitude * noise(i * suavidade),
    });
  }

  return pontos;
}

function desenharMontanhas(pontos, cor, fatorParallax) {
  let deslocamentoMontanha = camera.x * fatorParallax;
  let deslocamento = camera.x - deslocamentoMontanha;

  noStroke();
  fill(cor);
  beginShape();
  vertex(pontos[0].x + deslocamento, height);
  for (let i = 0; i < pontos.length; i++) {
    vertex(pontos[i].x + deslocamento, pontos[i].y);
  }
  vertex(pontos[pontos.length - 1].x + deslocamento, height);
  endShape(CLOSE);
}

function filtrarBlocosVisiveis() {
  let resultado = [];
  let limEsq = 0;
  let limDir = width;

  resultado = plataformas.filter(
    (p) => p.x - camera.x + p.largura > limEsq && p.x - camera.x < limDir
  );

  return resultado;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    personagem.pular();
  }
}
