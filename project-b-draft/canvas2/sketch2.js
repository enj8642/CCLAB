let couch;
let money = [];
let moneyImage;

function preload() {
  moneyImage = loadImage('coin.png');
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('myContainer');
  couch = new Couch(width / 2, height / 2, 150, 80);
}

function draw() {
  background(220);

  couch.display();

  for (let i = money.length - 1; i >= 0; i--) {
    money[i].update();
    money[i].display();
    if (money[i].reachedLimit()) {
      money[i].stop();
    }
  }
}

function mouseClicked() {
  if (couch.contains(mouseX, mouseY)) {
    let m = new Money(mouseX, mouseY);
    money.push(m);
  }
}

// Couch
class Couch {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.armrestWidth = 20;
    this.armrestHeight = 40;
  }

  display() {
    fill(139, 69, 19);
    rectMode(CENTER);

    //couch
    rect(this.x, this.y, this.width, this.height, 20);

    //armrest lef
    ellipse(this.x - this.width / 2 - this.armrestWidth / 2, this.y, this.armrestWidth + 15, this.armrestHeight);
    rect(this.x - this.width / 2 - this.armrestWidth / 2, this.y + this.armrestHeight / 2, this.armrestWidth + 15, this.height - this.armrestHeight);

    //armrest right
    ellipse(this.x + this.width / 2 + this.armrestWidth / 2, this.y, this.armrestWidth + 15, this.armrestHeight);
    rect(this.x + this.width / 2 + this.armrestWidth / 2, this.y + this.armrestHeight / 2, this.armrestWidth + 15, this.height - this.armrestHeight);
  }

  contains(px, py) {
    let distance = dist(px, py, this.x, this.y);
    return distance < this.width / 2 && distance < this.height / 2;
  }
}

// Money
class Money {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40; 
    this.height = 40;
    this.speed = 3;
    this.limitY = height - 100;
    this.stopped = false;
  }

  update() {
    if (!this.stopped) {
      this.y += this.speed;
    }
  }

  display() {
    if (!this.stopped) {
      image(moneyImage, this.x, this.y, this.width, this.height);
    }
  }

  reachedLimit() {
    return this.y >= this.limitY;
  }

  stop() {
    this.stopped = true;
  }
}
