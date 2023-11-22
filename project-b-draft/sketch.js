let sentences = [
    "The quick brown fox jumps over the lazy dog",
    "Coding is fun and rewarding",
    "Practice makes perfect",
    "Hello World",
    "Keep calm and code on"
  ];
  
  let currentSentence = "";
  let typedText = "";
  let raceStarted = false;
  let carPosition = 0;
  
  function setup() {
    let canvas = createCanvas(600, 600);
    noCursor();
    newSentence();
    canvas.parent("p5-canvas");
  }
  
  function draw() {
    background(255);
  
    if (raceStarted) {
      displaySentence();
      displayCar();
    } else {
      displayStartScreen();
    }
  }
  
  function keyPressed() {
    if (!raceStarted) {
      raceStarted = true;
      return;
    }
  
    if (keyCode === BACKSPACE) {
      typedText = typedText.slice(0, -1); // Delete the last character
    } else if (keyCode >= 65 && keyCode <= 90 || keyCode === 32) {
      typedText += key;
    }
  
    checkTypedText();
  }
  
  function displaySentence() {
    textAlign(LEFT);
    textSize(24);
  
    for (let i = 0; i < currentSentence.length; i++) {
      let currentChar = currentSentence.charAt(i);
      let typedChar = typedText.charAt(i);
      let correct = (currentChar === typedChar);
      let textColor = correct ? color(0, 255, 0) : color(255, 0, 0);
  
      fill(textColor);
      text(currentChar, 20 + i * 20, height / 2);
    }
  
    let typedWidth = textWidth(typedText);
    stroke(0);
    line(20 + typedWidth, height / 2 - 20, 20 + typedWidth, height / 2 + 10);
  }
  
  function displayCar() {
    let carX = 20 + textWidth(typedText);
    let carY = height / 2 + 30;
    fill(255, 0, 0);
    rect(carX, carY, 40, 20);
  }
  
  function displayStartScreen() {
    textAlign(CENTER, CENTER);
    textSize(36);
    fill(0);
    text("Press any key to start the race!", width / 2, height / 2);
  }
  
  function checkTypedText() {
    let input = typedText.toLowerCase();
    let target = currentSentence.toLowerCase().substring(0, input.length);
  
    if (input === target) {
      carPosition = textWidth(typedText);
      if (input === currentSentence.toLowerCase()) {
        newSentence();
        typedText = "";
        carPosition = 0;
      }
    }
  }
  
  function newSentence() {
    currentSentence = random(sentences);
  }
  