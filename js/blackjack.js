function Player(name){
  this.money = 1000;
  this.totalScore = 0;
  this.cards = [];
  this.name = name;
}

Player.prototype.bet = function(amount){
  this.money -= amount;
}

Player.prototype.dealCard = function(card){
  this.cards.push(card);
}

Player.prototype.calculateScore = function(){

  // Reset the score to count again
  this.totalScore = 0;

  // Add the value of each card in the injected player's hand
  for(card in this.cards){
    // If the card is an ace, and if the total of all cards in their
    // hand is over 21
    if(this.cards[card].name.substring(0,1) === "A" && this.totalScore + 11 > 21){
      // set the ace's value to 1
      this.cards[card].value = 1;
    }
    this.totalScore += this.cards[card].value;
  }
  return this.totalScore;
}

function Game(){
  this.deck = this.createDeck();
  this.bet = 0;
}

Game.prototype.createDeck = function(){
  // Set up the card deck
  var values = ["A", "2", "3", "4", "5", "6","7",
                "8", "9", "10", "J", "Q", "K"];
  var suits = ["S", "H", "C", "D"];
  var deck = [];

  // The Math.min function here sets everything 10 or greater to just
  // 10, ensuring face cards always have a value of 10.
  for(suit in suits){
    for(value in values){
      if(values[value].substring(0,1) === "A"){
        var cardVal = 11;
      } else {
        var cardVal = Math.min(10, parseInt(value)+1);
      }
      var tmpCard = {
          "name" : values[value] + suits[suit],
          "value" : cardVal
        };
      deck.push(tmpCard);
    }
  }
  return deck;
}

Game.prototype.dealCard = function(player, count){
  for(var i = 0; i < count; i++){
    var card = this.deck.pop();
    player.dealCard(card);
  }
}

// this is classified as a "command" - it doesn't return info like a query, just does stuff
Game.prototype.shuffleCards = function(){
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

  // Implicit access to private variable
  //this.deck = deck;

  // commands & queries used to access private variables; better than setters/getters

}

Game.prototype.addBet = function(amount, player){
  this.bet += amount;
  player.bet(amount);
}
