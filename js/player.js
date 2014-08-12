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
}

Player.prototype.dealCard = function(card){
  this.cards.push(card);
}

Player.prototype.calculateScore = function(){
  // Reset the score to count again
  this.totalScore = 0;

  // Add the value of each card in the player's hand
  for(card in this.cards){
    this.totalScore += this.cards[card].value;
  }

  // TODO(?): account for possible 3 ace situation

  // if total > 21 (maximum_score)
  if(this.totalScore > MAXIMUM_SCORE){
    var aceCount = 0;
    this.totalScore = 0;

    for(card in this.cards){
      if(this.cards[card].name.substring(0,1) === "A" && aceCount === 0){
        // set the ace's value to 1
        this.cards[card].value = 1;
        aceCount++;
      }
      this.totalScore += this.cards[card].value;
    }
  }

  return this.totalScore;
}
