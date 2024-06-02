let colors = ['#e6302b', '#fd7800', '#fbd400', '#3bd89f', '#0045e8', '#f477c3', '#70499c', '#006494', '#1b98e0'];
let points = [];

function setup() {
  createCanvas(740, 740);
  rectMode(CENTER);
  noLoop(); // Initially, do not loop

  // Set a timeout to start the animation after 3 seconds
  setTimeout(() => {
    loop(); // Start animation
    setInterval(updatePoints, 3000); // Update points every 3 seconds
  }, 2000); // 2000 milliseconds = 2 seconds
}

function draw() {
  background(0);
  if (points.length === 0) {
    let cp = new CirclePacking(width / 2, height / 2, width, height);
    cp.draw();
    points = cp.points;
  } else {
    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      noFill();
      noStroke();
      fill(random(colors));
      let size = p.z * (0.5 + 0.5 * sin(TWO_PI * millis() / 3000)); // Animate size
      if (p.z < 30) {
        drawShape(p.x, p.y, size, p.shape);
      } else {
        let tt = int(random(30, 40));
        let rgn = 67;
        for (let j = 0; j < tt; j++) {
          let mn = map(j, 0, tt, 1, 0.5);
          let dd = map(j, 0, tt, size, size * 0);
          fill(random(colors));
          form(p.x, p.y, dd, rgn, mn);
        }
      }
    }
  }
}

function drawShape(x, y, size, shape) {
  if (shape === 'circle') {
    circle(x, y, size);
  } else if (shape === 'triangle') {
    let h = size * (sqrt(3) / 2); // Height of the triangle
    beginShape();
    vertex(x, y - h / 2);
    vertex(x - size / 2, y + h / 2);
    vertex(x + size / 2, y + h / 2);
    endShape(CLOSE);
  } else if (shape === 'polygon') {
    let sides = int(random(5, 9)); // Random number of sides for the polygon
    let angle = TWO_PI / sides;
    beginShape();
    for (let i = 0; i < sides; i++) {
      let vx = x + size * 0.5 * cos(i * angle);
      let vy = y + size * 0.5 * sin(i * angle);
      vertex(vx, vy);
    }
    endShape(CLOSE);
  } else if (shape === 'rect') {
    rect(x, y, size, size);
  }
}

class CirclePacking {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.points = [];
    this.generatePoints();
  }

  generatePoints() {
    let count = int(this.w * this.h);
    for (let i = 0; i < count; i++) {
      let z = random(15, 300);
      let x = this.x + random(-this.w / 2 + z / 2, this.w / 2 - z / 2);
      let y = this.y + random(-this.h / 2 + z / 2, this.h / 2 - z / 2);
      let add = true;
      for (let j = 0; j < this.points.length; j++) {
        let p = this.points[j];
        if (dist(x, y, p.x, p.y) < (z + p.z) * 0.5) {
          add = false;
          break;
        }
      }
      if (add) {
        let shape = random(['circle', 'triangle', 'polygon', 'rect']);
        this.points.push({ x: x, y: y, z: z, shape: shape });
      }
    }
  }

  draw() {
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      noFill();
      noStroke();
      fill(random(colors));
      drawShape(p.x, p.y, p.z, p.shape);
    }
  }
}

function form(x, y, d, num, mn) {
  push();
  translate(x, y);
  beginShape();
  for (let i = 0; i < num; i++) {
    let a = map(i, 0, num - 1, 0, PI * 2);
    let r = d * 0.5;
    if (i % 2 == 0) r *= mn;
    let vx = r * cos(a);
    let vy = r * sin(a);
    vertex(vx, vy);
  }
  endShape();
  pop();
}

function updatePoints() {
  points = [];
  let cp = new CirclePacking(width / 2, height / 2, width, height);
  cp.draw();
  points = cp.points;
}
