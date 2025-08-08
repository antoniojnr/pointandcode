let nave, projetil;
let info;

function setup() {
  createCanvas(400, 400);
  nave = {
    x: width / 2,
    y: 350,
  };
  info = createP("Tecla: ");
}

function draw() {
  background(0);

  noFill();
  stroke("lime");
  strokeWeight(2);
  triangle(nave.x, nave.y, nave.x - 15, nave.y + 30, nave.x + 15, nave.y + 30);

  if (projetil) {
    ellipse(projetil.x, projetil.y, 4, 4);
    projetil.y -= 7;
  }

  controlarNaveTeclado();
  controlarNaveMouse();
}

function controlarNaveTeclado() {
  if (keyIsDown(LEFT_ARROW)) {
    nave.x -= 5;
  } else if (keyIsDown(RIGHT_ARROW)) {
    nave.x += 5;
  }
}

function controlarNaveMouse() {
  nave.x = mouseX;
}

function keyPressed() {
  if (keyCode === 32) {
    projetil = {
      x: nave.x,
      y: nave.y,
    };
  }
}

function mouseClicked() {
  projetil = {
    x: nave.x,
    y: nave.y,
  };
}
