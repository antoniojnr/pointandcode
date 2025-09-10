class Star {
  constructor(x, y, vx, vy, va, vCount, radius, internalRadius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.va = va;
    this.radius = radius;
    this.internalRadius = internalRadius;
    this.vCount = vCount;
    this.color = color;
    this.angle = 0;
    this.vertices = [];
    this.generate();
  }

  generate() {
    let half = false;

    for (let i = 0; i < this.vCount * 2; i++) {
      let r = half ? this.internalRadius : this.radius;
      half = !half;

      this.vertices.push({
        x: cos(radians(this.angle)) * r,
        y: sin(radians(this.angle)) * r,
      });

      this.angle += 360 / (this.vCount * 2);
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.color);
    noStroke();
    beginShape();
    for (let v of this.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
  }

  move() {
    this.angle += this.va;
    this.x += this.vx;
    this.y += this.vy;

    this.borders();
  }

  borders() {
    if (this.x > width + this.radius) this.x = -this.radius;
    if (this.x < -this.radius) this.x = width + this.radius;
    if (this.y > height + this.radius) this.y = -this.radius;
    if (this.y < -this.radius) this.y = height + this.radius;
  }
}

let stars = [];

function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < 40; i++) {
    stars.push(
      new Star(
        random(width), // x
        random(height), // y
        random(-1, 1), // vx
        random(-1.5, 1.5), // vy
        random(-0.1, 0.1), // v angular
        Math.floor(random(3, 20)), // qtd vértices
        random(40, 60), // raio externo
        random(10, 30), // raio interno
        color(
          random(150, 255),
          random(150, 255),
          random(150, 255),
          random(180, 220)
        )
      )
    );
  }
}

function draw() {
  background(255);
  for (let star of stars) {
    star.show();
    star.move();
  }
}
