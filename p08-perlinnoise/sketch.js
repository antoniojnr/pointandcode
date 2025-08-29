let varX = 0;
let varY = 0;
let mudou = true;
let inc;
let faixaAzul, faixaAmarela, faixaVerde;

function setup() {
  createCanvas(400, 400);
  createSpan("Inc:");
  inc = createSlider(0, 0.5, 0.02, 0.01);
  createSpan("Azul:");
  faixaAzul = createSlider(0, 100, 30, 1);
  createSpan("Amarelo:");
  faixaAmarela = createSlider(0, 100, 60, 1);
  createSpan("Verde:");
  faixaVerde = createSlider(0, 100, 90, 1);

  inc.input(sliderMudou);
  faixaAzul.input(sliderMudou);
  faixaAmarela.input(sliderMudou);
  faixaVerde.input(sliderMudou);
}

function sliderMudou() {
  mudou = true;
}

function draw() {
  noiseSeed(100);
  if (mudou) {
    background(220);
    noFill();
    let color;
    for (let x = 0; x < width; x++) {
      varY = 0;
      for (let y = 0; y < height; y++) {
        let ruido = noise(varX, varY) * 100;
        if (ruido < 15) {
          color = "#00356fff";
        } else if (ruido < faixaAzul.value()) {
          color = "#005dc0ff";
        } else if (ruido < faixaAmarela.value()) {
          color = "#ffea62ff";
        } else if (ruido < faixaVerde.value()) {
          color = "#3b8d4fff";
        } else {
          color = "#e2e2e2ff";
        }
        stroke(color);
        point(x, y);
        varY += inc.value();
      }
      varX += inc.value();
    }
    mudou = false;
  }
}
