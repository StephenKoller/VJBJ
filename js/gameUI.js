function GameUI(game, player, dealer){
  // Dependency injection(?)
  this.game = game;
  this.player = player;
  this.dealer = dealer;

  // Player action buttons
  this.hitButton = document.getElementById("hitButton");
  this.standButton = document.getElementById("standButton");
  this.dealButton = document.getElementById("dealButton");
  this.newGameButton = document.getElementById("newGameButton");

  // Betting buttons
  this.bet1 = document.getElementById("bet1");
  this.bet5 = document.getElementById("bet5");
  this.bet10 = document.getElementById("bet10");
  this.bet25 = document.getElementById("bet25");
  this.bet100 = document.getElementById("bet100");

  // Container element for card elements
  this.playerCardsOnScreen = document.getElementById("player");
  this.dealerCardsOnScreen = document.getElementById("dealer");

  // Visible dealer card at beginning of game
  this.dealerCard = this.dealerCardsOnScreen.getElementsByClassName("card")[0];

  // Text on screen to relay game info (win/loss, bet amount, player money)
  this.gameStatus = document.getElementById("gameStatus");
  this.betAmount = document.getElementById("betAmount");
  this.playerMoney = document.getElementById("playerMoney");

  // Player & dealer score elements
  this.playerScore = document.getElementById("playerScore");
  this.dealerScore = document.getElementById("dealerScore");
}

GameUI.prototype.resetUI = function(){
  // Reset players' hands in DOM to empty
  this.playerCardsOnScreen.innerHTML = "<div id='empty' class='card'></div><div id='empty' class='card'></div>";
  this.dealerCardsOnScreen.innerHTML = "<div id='empty' class='card'></div><div id='hiddenCard' class='card'></div>";

  // playerCardsUI.reset();
  this.playerScore.innerHTML = "";
  this.dealerScore.innerHTML = "";

  // gameStatus.reset();
  gameStatus.innerHTML = "";
  betAmount.innerHTML = "0";

  this.disableHitStand();
  this.disableDeal();
  this.enableNewGame();
}

GameUI.prototype.setBackgroundImage = function(element, name){
    element.style.backgroundImage = "url(../img/cards/" + name + ".png)";
}

GameUI.prototype.displayMessage = function(message){
  this.gameStatus.innerHTML = message;
}

GameUI.prototype.hit = function(){
  this.game.dealCard(this.player, 1);

  // Create a new DOM element
  var newCard = document.createElement("div");

  // Find the name of the new card that has been dealt and add it to the DOM element
  var card = this.player.cards[this.player.cards.length-1];
  newCard.id = card.name;

  // Set the styling
  newCard.className = "card";
  this.setBackgroundImage(newCard, card.name);

  // Add new element to the DOM
  this.playerCardsOnScreen.appendChild(newCard);

  this.updatePlayerScore();

  this.game.checkFor21(this.player);
}

GameUI.prototype.stand = function(){
  // First show the second card the dealer already has in their hand
  this.dealerCard.id = this.dealer.cards[1].name;
  this.setBackgroundImage(this.dealerCard, this.dealer.cards[1].name);

  // Then while the dealer's score is less than 17, keep dealing cards and displaying them
  var i = 2;
  while(this.dealer.calculateScore() < 17){
    this.game.dealCard(this.dealer,1);
    var newCard = document.createElement("div");
    newCard.id = this.dealer.cards[i].name;
    newCard.className = "card";
    this.setBackgroundImage(newCard, this.dealer.cards[i].name);
    this.dealerCardsOnScreen.appendChild(newCard);
    i++;
  }

  this.updateDealerScore();

  this.game.checkFinalScore();
}

GameUI.prototype.reset = function(){
    // Disable hit, stand, deal buttons
    hitButton.disabled = "disabled";
    standButton.disabled = "disabled";
    dealButton.disabled = "disabled";

    // Enable new game button
    newGameButton.disabled = "";

    // Reset bet amount, player money
    betAmount.innerHTML = "0";
    playerMoney.innerHTML = player.money;

    // Show the dealer's second card (useful if bust after a hit)
    setBackgroundImage(dealerCard, dealer.cards[1].name);

    gameUI.newGameButton.disabled = "disabled";
    resetGame();
}

GameUI.prototype.updateMoney = function(){
  this.betAmount.innerHTML = this.game.pot;
  this.playerMoney.innerHTML = this.player.money;
}

GameUI.prototype.updatePlayerScore = function(){
  // Update display for score of cards currently held by player
  this.playerScore.innerHTML = this.player.calculateScore();
}

GameUI.prototype.updateDealerScore = function(){
  // Update display for score of cards currently held by dealer
  this.dealerScore.innerHTML = this.dealer.calculateScore();
}

// #########################################################################
// Helper methods to enable/disable buttons - can maybe refactor down to one
// #########################################################################

GameUI.prototype.enableNewGame = function(){
  newGameButton.disabled = "";
}

GameUI.prototype.disableNewGame = function(){
  newGameButton.disabled = "disabled";
}

GameUI.prototype.enableDeal = function(){
  dealButton.disabled = "";
}

GameUI.prototype.disableDeal = function(){
  dealButton.disabled = "disabled";
}

GameUI.prototype.enableHitStand = function(){
  // Enable hit/stand buttons
  hitButton.disabled = "";
  standButton.disabled = "";
}

GameUI.prototype.disableHitStand = function(){
  // disable buttons
  hitButton.disabled = "disabled";
  standButton.disabled = "disabled";
}

GameUI.prototype.enableBetting = function(){
  // Enable betting buttons
  bet1.disabled = "";
  bet5.disabled = "";
  bet10.disabled = "";
  bet25.disabled = "";
  bet100.disabled = "";
}

GameUI.prototype.disableBetting = function(buttons){
  bet1.disabled = "disabled";
  bet5.disabled = "disabled";
  bet10.disabled = "disabled";
  bet25.disabled = "disabled";
  bet100.disabled = "disabled";
}

// #########################################################################

GameUI.prototype.showFirstDealerCard = function(dealer){
  debugger;
  this.setBackgroundImage(this.dealerCard, dealer.cards[0].name);
}

GameUI.prototype.showCards = function(){
  // Update DOM to match dealt cards
  // may need to rewrite this...
  for(var i in this.player.cards){
    var card = this.player.cards[i];
    var cardBox = this.playerCardsOnScreen.getElementsByTagName("div")[i];
    this.setBackgroundImage(cardBox, card.name);
  }
}

GameUI.prototype.setEventListeners = function(game, player, dealer){
  // moving event listeners to GameUI object

  var gameUI = this;

  hitButton.addEventListener('click', function() {
    gameUI.hit();
  }, false);

  standButton.addEventListener('click', function() {
    gameUI.stand();
  }, false);

  dealButton.addEventListener('click', function() {
    gameUI.disableBetting();
    game.firstDeal(player, dealer);
    gameUI.disableDeal();
  }, false);

  newGameButton.addEventListener('click',function(){
    gameUI.resetUI();
    game.startNewGame(player, dealer);
  }, false);

  bet1.addEventListener('click', function() {
    player.bet(game, 1);
    gameUI.updateMoney();
    gameUI.enableDeal();
  }, false);

  bet5.addEventListener('click', function() {
    player.bet(game, 5);
    gameUI.updateMoney();
    gameUI.enableDeal();
  }, false);

  bet10.addEventListener('click', function() {
    player.bet(game, 10);
    gameUI.updateMoney();
    gameUI.enableDeal();
  }, false);

  bet25.addEventListener('click', function() {
    player.bet(game, 25);
    gameUI.updateMoney();
    gameUI.enableDeal();
  }, false);

  bet100.addEventListener('click', function() {
    player.bet(game, 100);
    gameUI.updateMoney();
    gameUI.enableDeal();
  }, false);
}
