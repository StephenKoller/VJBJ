function Game(){
  this.deck = this.createDeck();
  this.pot = 0;

  // this is classified as a "command" - it doesn't return info like a query, just does stuff
  this.shuffleCards = function (){
    // Found this nice Fisher-Yates shuffle algorithm at
    // http://bost.ocks.org/mike/shuffle/

    // Using this.deck everywhere is discouraged for testing and encapsulation
    // var deck = this.deck;
    var unshuffled = this.deck.length,
      currentCard,
      randomCard;

    // While unshuffled cards remain, (ex: unshuffled == 51)
    while (unshuffled) {

      // Find a remaining card
      randomCard = Math.floor(Math.random() * unshuffled--);

      // And switch it with current element
      currentCard = this.deck[unshuffled];
      this.deck[unshuffled] = this.deck[randomCard];
      this.deck[randomCard] = currentCard;
    }
  };
}

Game.prototype.createDeck = function(){
  // Set up the card deck
  var cardVal;
  var values = ["A", "2", "3", "4", "5", "6", "7",
                "8", "9", "10", "J", "Q", "K"];
  var suits = ["S", "H", "C", "D"];
  var deck = [];

  // The Math.min function here sets everything 10 or greater to just
  // 10, ensuring face cards always have a value of 10.

  for(var suit = 0; suit<suits.length; suit++){
    for(var value = 0; value<values.length; value++){
      if(values[value].substring(0,1) === "A"){
        cardVal = 11;
      } else {
        cardVal = Math.min(10, parseInt(value)+1);
      }
      var tmpCard = {
          "name" : values[value] + suits[suit],
          "value" : cardVal
        };
      deck.push(tmpCard);
    }
  }
  return deck;
};

Game.prototype.startNewGame = function(){
  this.shuffleCards();

  // Reset the players' hands
  this.player.cards = [];
  this.dealer.cards = [];

  this.gameUI.enableBetting();
  this.gameUI.disableNewGame();
};


Game.prototype.firstDeal = function(player, dealer){
    this.dealCard(player, 2);
    this.dealCard(dealer, 2);

    this.gameUI.showCards();
    this.gameUI.enableHitStand();

    this.gameUI.showFirstDealerCard(dealer);
    this.gameUI.updatePlayerScore();
};

Game.prototype.dealCard = function(player, count){
  for(var i = 0; i < count; i++){
    var card = this.deck.pop();
    player.dealCard(card);
  }
};

Game.prototype.checkFinalScore = function(){

  if(this.dealer.calculateScore() > 21)
  {
    this.gameUI.displayMessage("You win, dealer busts!");
    this.player.money += this.pot*2;
  } else if (this.dealer.calculateScore() === 21 )
  {
      this.gameUI.displayMessage("Dealer wins!");
      this.player.money -= this.pot;
    // game passes message to player (you lose!), make player give money to dealer
  } else if(this.player.calculateScore() === 21) {
      this.gameUI.displayMessage("21, you win!");
      this.player.money += this.pot*2;
  } else if (this.player.calculateScore() > this.dealer.calculateScore())
  {
    this.gameUI.displayMessage("You win!");
    this.player.money += this.pot*2;
  } else if (this.player.calculateScore() <= this.dealer.calculateScore())
  {
    this.gameUI.displayMessage("You lose!");
    this.player.money -= this.pot;
    }

  this.pot = 0;
  this.gameUI.updateMoney();
  this.gameUI.disableHitStand();
  this.gameUI.enableNewGame();
};

Game.prototype.addBet = function(amount){
  this.pot += amount;
  this.gameUI.enableDeal();
};

Game.prototype.checkFor21 = function(player){
  if(player.calculateScore() > 21){
    this.gameUI.displayMessage("Busted! You're over 21!");
    this.gameUI.updateMoney();
    this.gameUI.disableHitStand();
    this.gameUI.enableNewGame();
  }

  if(this.dealer.calculateScore() > 21){
    this.gameUI.displayMessage("Dealer loses! You win!");
    this.gameUI.updateMoney();
  }
};
