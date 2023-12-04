let deck, player, dealer;

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("myContainer");
  deck = new Deck();
  player = new Player();
  dealer = new Player();
  startGame();
}

function draw() {
  background(255);
  player.display(50, 300);
  dealer.display(50, 100);

  textSize(16);
  fill(0);
  text('Player Score: ' + player.score(), 200, 380); //player scores
  text('Dealer Score: ' + dealer.score(), 200, 20);

}

function keyPressed() {
  if (key == ' ') {
    player.hit();
    if (player.isBust()) gameOver('You busted! Dealer wins.'); //win conditions
  } else if (key == 'd') {
    dealer.play();
    if (dealer.isBust()) gameOver('Dealer busted! You win.');
    else determineWinner();
  }
}

function startGame() {
  player.addCard(deck.drawCard(), deck.drawCard()); //drawing first 2 cards
  dealer.addCard(deck.drawCard(), deck.drawCard());
}

function determineWinner() {
  let result = player.score() > dealer.score() ? 'You win!' : //win conditions
               dealer.score() > player.score() ? 'Dealer wins!' :
               'Tie!';
  gameOver(result);
}

function gameOver(message) { //end result
  alert(message);
  setup();
}

class Card { //card creation
  constructor(rank, suit) { 
    this.rank = rank;
    this.suit = suit;
  }

  getValue() { 
    return this.rank == 'A' ? 11 : ['K', 'Q', 'J'].includes(this.rank) ? 10 : parseInt(this.rank);
  }
  //help from friend

  display(x, y) {
    textSize(16);
    fill(0);
    text(this.rank, x, y);
    text(this.suit, x, y + 30); 
  }
}

class Deck { //deck creation
  constructor() {
    this.cards = [];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

    for (let suit of suits)
      for (let rank of ranks)
        this.cards.push(new Card(rank, suit));

    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = floor(random(i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawCard() {
    return this.cards.pop();
  }
}
//class Deck help from friend

class Player { //player info cards
  constructor() {
    this.hand = [];
  }

  addCard(...cards) {
    this.hand.push(...cards);
  }

  score() {
    let total = this.hand.reduce((sum, card) => sum + card.getValue(), 0);
    let numAces = this.hand.filter(card => card.rank === 'A').length;

    while (total > 21 && numAces) {
      total -= 10;
      numAces--;
    }

    return total;
  }
  //score change help from friend

  display(x, y) {
    this.hand.forEach((card, i) => card.display(x + i * 50, y));
  }

  hit() {
    this.addCard(deck.drawCard());
  }

  isBust() {
    return this.score() > 21;
  }

  play() {
    while (this.score() < 17) this.hit();
  }
}