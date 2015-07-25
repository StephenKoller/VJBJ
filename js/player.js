function Player(name){
  // TODO: make private variables
  this.money = 1000;
  this.totalScore = 0;
  this.cards = [];
  this.name = name;
}

Player.prototype.bet = function(game, amount){
  this.money -= amount;
  game.addBet(amount);
};

Player.prototype.dealCard = function(card){
  this.cards.push(card);
};

Player.prototype.calculateScore = function(){
  // Reset the score to count again
  this.totalScore = 0;

  // Add the value of each card in the player's hand
  for(var i = 0; i < this.cards.length; i++){
    this.totalScore += this.cards[i].value;
  }

  // TODO: account for possible 3 ace situation

  // if total > 21
  if(this.totalScore > 21){
    var aceCount = 0;
    this.totalScore = 0;

    for(i = 0; i < this.cards.length; i++){
      if(this.cards[i].name.substring(0,1) === "A" && aceCount === 0){
        // set the ace's value to 1
        this.cards[i].value = 1;
        aceCount++;
      }
      this.totalScore += this.cards[i].value;
    }
  }

  return this.totalScore;
};
