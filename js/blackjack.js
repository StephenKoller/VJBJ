function Player(){
  this.score = 100;
  this.cards = [];
}

function Game(){
  var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  var suits = ["S", "H", "C", "D"];
  this.deck = [];

  for(suit in suits){
    for(value in values){
      var tmpCard = { "name" : values[value] + suits[suit], "value" : parseInt(value) + 1 };
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
  // Found this nice Fisher-Yates shuffle algorithm at http://bost.ocks.org/mike/shuffle/
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

Game.prototype.checkScore = function(player){
  var total = 0;
  for(card in player.cards){
    total += player.cards[card].value;
  }
  return total;
}
