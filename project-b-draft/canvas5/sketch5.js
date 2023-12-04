let wheel;
let ball;
let gameOver = false;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('myContainer');
  wheel = new RouletteWheel(width / 2, height / 2, 200);
  ball = new Ball(wheel);
}

function draw() {
  background(255);
  wheel.display();
  
  if (!gameOver) {
    ball.display();
    ball.update();
  } else {
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You Lose", width / 2, 350);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    // Reset the game when Enter key is pressed
    ball.reset();
    gameOver = false;
  }
}

class RouletteWheel {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
  }

  display() {
    // Draw wheel
    fill(150);
    stroke(0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.diameter);

    // Draw red and black sections
    for (let i = 0; i < 360; i += 18) {
      if (i % 36 === 0) {
        fill(255, 0, 0); // Red
      } else {
        fill(0); // Black
      }
      arc(this.x, this.y, this.diameter, this.diameter, radians(i), radians(i + 18));
    }
  }
}

class Ball {
  constructor(wheel) {
    this.wheel = wheel;
    this.angle = 0;
    this.radius = this.wheel.diameter / 2;
    this.speed = 2;
    this.stopped = false;
  }

  update() {
    if (!this.stopped) {
      this.angle += this.speed;
      if (this.angle >= 360) {
        this.angle = 0;
      }

      // Check if 6 seconds have passed
      if (millis() > 2000) {
        this.stopped = true;
        this.angle = round(random(0, 360));
        gameOver = true;
      }
    }
  }

  display() {
    // Calculate ball position based on the angle
    let ballX = this.wheel.x + this.radius * cos(radians(this.angle));
    let ballY = this.wheel.y + this.radius * sin(radians(this.angle));

    // Draw ball
    fill(0);
    noStroke();
    ellipse(ballX, ballY, 10);
  }

  reset() {
    this.angle = 0;
    this.stopped = false;
    gameOver = false;
  }
}
