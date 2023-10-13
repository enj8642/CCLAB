let circleSize = 15;
let numCircles = 8;
let circleX = [];
let circleY = [];

function setup() {
  let canvas = createCanvas(500, 500);
  //canvas.id("p5-canvas");
  canvas.parent("p5-canvas");
  colorMode(HSB, 100);

  //circle positions
  for (let i = 0; i < numCircles; i++) {
    circleX[i] = mouseX; 
    circleY[i] = mouseY;
  }
}

function draw() {
  background(0);

  //positions of circles
  for (let i = 0; i < numCircles; i++) {
    circle(circleX[i], circleY[i], circleSize);
  }

  stroke(255);

  //Lines on the circles
  for (let i = 0; i < numCircles - 1; i++) {
    line(circleX[i], circleY[i], circleX[i + 1], circleY[i + 1]);
  }

  //Positions movement
  for (let i = 0; i < numCircles; i++) {
    circleX[i] = mouseX + 50 * sin(frameCount * (0.05 + i * 0.01));
    circleY[i] = mouseY + 50 * cos(frameCount * (0.05 + i * 0.01));
  }

  let c = map(sin(frameCount * 0.01), -1, 1, 0, 100);
  fill(c, 25, 75);
}