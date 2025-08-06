let points = [];
let count = 12;

function setup() {
  createCanvas(1200, 800);
  colorMode(HSB);
  for (let i = 0; i < count; i++) {
    points.push({
      x: random(width),
      y: random(height),
      color: random(256),
    });
  }
}

function draw() {
  points[0].x = mouseX;
  points[0].y = mouseY;
  let resolution = 1;

  for (let y = 0; y < height; y += resolution) {
    for (let x = 0; x < width; x += resolution) {
      let smallestDist = Infinity;
      let closest = 0;

      for (let i = 0; i < points.length; i++) {
        let d = dist(x, y, points[i].x, points[i].y);
        if (d < smallestDist) {
          smallestDist = d;
          closest = i;
        }
      }

      let color = points[closest].color;
      let brightness = map(smallestDist, 0, 400, 100, 30);
      fill(color, 80, brightness);

      noStroke();
      rect(x, y, resolution, resolution);
    }
  }
  for (let p of points) {
    fill(0);
    ellipse(p.x, p.y, 4, 4);
  }
}
