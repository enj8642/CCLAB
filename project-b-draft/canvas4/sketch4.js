let slotMachine;
let result;
let showResultTimer = 0;

function setup() {
  let canvas = createCanvas(400, 300);
  canvas.parent('myContainer')
  slotMachine = new SlotMachine();
  result = "Spin the wheel!";
}

function draw() {
  background(255);
  slotMachine.display();
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(0);
  text(result, width / 2, height + 30);

  if (showResultTimer > 0) {
    showResultTimer--;
    fill(255, 0, 0);
    text("You lose!", 350, height / 2);
  }
}

function mouseClicked() {
  result = slotMachine.spin();
  showResultTimer = 120;
}

class SlotMachine {
  constructor() {
    this.symbols = ['🍒', '🍊', '🍋', '🍇', '🍉'];
    this.reels = [[], [], []];
    this.spinSpeed = 10;
    this.spinCount = 30;
  }

  spin() {
    for (let i = 0; i < this.reels.length; i++) {
      this.reels[i] = [];
      for (let j = 0; j < this.spinCount; j++) {
        let symbol = random(this.symbols);
        this.reels[i].push(symbol);
      }
    }

    return result;
  }

  display() {
    for (let i = 0; i < this.reels.length; i++) {
      for (let j = 0; j < this.reels[i].length; j++) {
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.reels[i][j], i * 100 + 50, j * 100 + 50);
      }
    }
  }
}
