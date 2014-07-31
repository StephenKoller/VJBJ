function Player(name){
  this.money = 1000;
  this.totalScore = 0;
  this.cards = [];
  this.name = name;
}

function Game(){
  this.deck = [];
  this.createDeck(this.deck);
  this.bet = 0;
}

Game.prototype.createDeck = function(deckArray){
  // Set up the card deck
  var values = ["A", "2", "3", "4", "5", "6","7",
                "8", "9", "10", "J", "Q", "K"];
  var suits = ["S", "H", "C", "D"];

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
      this.deck.push(tmpCard);
    }
  }
}

Game.prototype.dealCard = function(player, count){
  for(var i = 0; i < count; i++){
    var card = this.deck.pop();
    player.cards.push(card);
  }

  return;
}

Game.prototype.shuffleCards = function(){
  // Found this nice Fisher-Yates shuffle algorithm at
  // http://bost.ocks.org/mike/shuffle/
  var deck = this.deck;
  var unshuffled = deck.length,
    currentCard,
    randomCard;

  // While unshuffled cards remain, (ex: unshuffled == 51)
  while (unshuffled) {

    // Find a remaining card
    randomCard = Math.floor(Math.random() * unshuffled--);

    // And switch it with current element
    currentCard = deck[unshuffled];
    deck[unshuffled] = deck[randomCard];
    deck[randomCard] = currentCard;
  }

  this.deck = deck;
}

Game.prototype.calculateScore = function(player){

  // Reset the score to count again
  player.totalScore = 0;

  // Add the value of each card in the injected player's hand
  for(card in player.cards){
    // If the card is an ace, and if the total of all cards in their
    // hand is over 21
    if(player.cards[card].name.substring(0,1) === "A" && player.totalScore + 11 > 21){
      // set the ace's value to 1
      player.cards[card].value = 1;
    }
    player.totalScore += player.cards[card].value;
  }
  return player.totalScore;
}

Game.prototype.addBet = function(amount){
  game.bet += amount;
  player.money -= amount;
}
