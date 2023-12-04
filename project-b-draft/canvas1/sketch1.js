let unlightedBulb, lightedBulb;
let isLighted = false;

function preload() {
  unlightedBulb = loadImage('unlit.png');
  lightedBulb = loadImage('lit.png');
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("myContainer");
}

function draw() {
  background(245);

  if (isLighted) {
    image(lightedBulb, 75, 15);
  } else {
    image(unlightedBulb, 75, 20);
  }
}

function mouseClicked() {
  if (mouseX > 100 && mouseX < 100 + unlightedBulb.width && mouseY > 100 && mouseY < 100 + unlightedBulb.height) {
    isLighted = !isLighted;
  }
}
