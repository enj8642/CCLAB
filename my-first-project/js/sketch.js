let circleSize = 15;
let numCircles = 8;
let circleX = [];
let circleY = [];
let originalCircleX = [];
let originalCircleY = [];
let stars = [];
let changeColors = false;
let speedMultiplier = 1;
let spreading = false;
let spreadAmount = 5;

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("p5-canvas");
  colorMode(HSB, 100);

  // Original circle positions
  for (let i = 0; i < numCircles; i++) {
    originalCircleX[i] = mouseX;
    originalCircleY[i] = mouseY;
  }

  // Circle positions
  resetCirclePositions();

  // Background for star
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let radius = random(2, 5);
    let speed = random(0.1, 1);
    let star = { x, y, radius, speed };
    stars.push(star);
  }
}

function resetCirclePositions() {
  for (let i = 0; i < numCircles; i++) {
    circleX[i] = originalCircleX[i];
    circleY[i] = originalCircleY[i];
  }
}

function draw() {
  background(0);

  // Stars
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.radius += 0.02 * star.speed;
    if (star.radius > 5 || star.radius < 2) {
      star.speed *= -1;
    }
    noStroke();
    ellipse(star.x, star.y, star.radius, star.radius);
  }

  if (spreading) {
    for (let i = 0; i < numCircles; i++) {
      circleX[i] += random(-spreadAmount, spreadAmount);
      circleY[i] += random(-spreadAmount, spreadAmount);
    }
  }

  // Positions of circles with noise
  for (let i = 0; i < numCircles; i++) {
    let noiseX = noise(i * 0.1, frameCount * 0.01) * 100 - 50;
    let noiseY = noise(i * 0.1 + 100, frameCount * 0.01) * 100 - 50;
    circleX[i] = lerp(circleX[i], mouseX + noiseX, 0.05);
    circleY[i] = lerp(circleY[i], mouseY + noiseY, 0.05);
  }

  if (changeColors) {
    let c = map(sin(frameCount * 0.1 * speedMultiplier), -1, 1, 0, 100);
    fill(c, 25, 75);
  } else {
    let c = map(sin(frameCount * 0.01), -1, 1, 0, 100);
    fill(c, 25, 75);
  }

  // Circles
  for (let i = 0; i < numCircles; i++) {
    circle(circleX[i] - 5, circleY[i] - 5, circleSize);
  }

  stroke(255);

  // Lines on the circles
  for (let i = 0; i < numCircles - 1; i++) {
    line(circleX[i] - 5, circleY[i] - 5, circleX[i + 1] - 5, circleY[i + 1] - 5);
  }
}

// Speed/color/spread
function mousePressed() {
  changeColors = true;
  speedMultiplier = 2;
  spreading = true;
}

function mouseReleased() {
  changeColors = false;
  speedMultiplier = 1;
  spreading = false;
  resetCirclePositions();
}
