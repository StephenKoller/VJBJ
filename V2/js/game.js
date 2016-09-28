class Game {
  constructor() {
    this.pot = 0;
    this.deck = [
      { name: "AS", value: 11 },
      { name: "2S", value: 2 },
      { name: "3S", value: 3 },
      { name: "4S", value: 4 },
      { name: "5S", value: 5 },
      { name: "6S", value: 6 },
      { name: "7S", value: 7 },
      { name: "8S", value: 8 },
      { name: "9S", value: 9 },
      { name: "10S", value: 10 },
      { name: "JS", value: 10 },
      { name: "QS", value: 10 },
      { name: "KS", value: 10 },
      { name: "AH", value: 11 },
      { name: "2H", value: 2 },
      { name: "3H", value: 3 },
      { name: "4H", value: 4 },
      { name: "5H", value: 5 },
      { name: "6H", value: 6 },
      { name: "7H", value: 7 },
      { name: "8H", value: 8 },
      { name: "9H", value: 9 },
      { name: "10H", value: 10 },
      { name: "JH", value: 10 },
      { name: "QH", value: 10 },
      { name: "KH", value: 10 },
      { name: "AD", value: 11 },
      { name: "2D", value: 2 },
      { name: "3D", value: 3 },
      { name: "4D", value: 4 },
      { name: "5D", value: 5 },
      { name: "6D", value: 6 },
      { name: "7D", value: 7 },
      { name: "8D", value: 8 },
      { name: "9D", value: 9 },
      { name: "10D", value: 10 },
      { name: "JD", value: 10 },
      { name: "QD", value: 10 },
      { name: "KD", value: 10 },
      { name: "AC", value: 11 },
      { name: "2C", value: 2 },
      { name: "3C", value: 3 },
      { name: "4C", value: 4 },
      { name: "5C", value: 5 },
      { name: "6C", value: 6 },
      { name: "7C", value: 7 },
      { name: "8C", value: 8 },
      { name: "9C", value: 9 },
      { name: "10C", value: 10 },
      { name: "JC", value: 10 },
      { name: "QC", value: 10 },
      { name: "KC", value: 10 }
    ] 
  }

  // this is classified as a "command" - it doesn't return info like a query, just does stuff
  shuffleCards() {
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
  }

  startNewGame() {
    shuffleCards();

    // Reset the players' hands
    this.player.emptyHand();
    this.dealer.emptyHand();

    this.gameUI.enableBetting();
    this.gameUI.disableNewGame();
  }

  firstDeal(player, dealer) {
    this.dealCard(player, 2);
    this.dealCard(dealer, 2);

    this.gameUI.showCards();
    this.gameUI.enableHitStand();

    this.gameUI.showFirstDealerCard(dealer);
    this.gameUI.updatePlayerScore();
  }

  dealCard(player, count) {
    for (var i = 0; i < count; i++) {
      var card = this.deck.pop();
      player.dealCard(card);
    }
  }

  checkFinalScore() {
    var dealerScore = this.dealer.calculateScore();
    var playerScore = this.player.calculateScore();

    if (dealerScore > 21) {
      this.gameUI.displayMessage("You win, dealer busts!");
      this.player.money += this.pot * 2;
    } else if (dealerScore === 21) {
      this.gameUI.displayMessage("Dealer wins!");
      this.player.money -= this.pot;
      // game passes message to player (you lose!), make player give money to dealer
    } else if (playerScore === 21) {
      this.gameUI.displayMessage("21, you win!");
      this.player.money += this.pot * 2;
    } else if (playerScore > dealerScore) {
      this.gameUI.displayMessage("You win!");
      this.player.money += this.pot * 2;
    } else if (playerScore <= dealerScore) {
      this.gameUI.displayMessage("You lose!");
      this.player.money -= this.pot;
    }

    this.pot = 0;
    this.gameUI.updateMoney();
    this.gameUI.disableHitStand();
    this.gameUI.enableNewGame();
  }

  addBet(amount) {
    this.pot += amount;
    this.gameUI.enableDeal();
  }

  checkFor21(player) {
    if (player.calculateScore() > 21) {
      this.gameUI.displayMessage("Busted! You're over 21!");
      this.gameUI.updateMoney();
      this.gameUI.disableHitStand();
      this.gameUI.enableNewGame();
    }

    if (this.dealer.calculateScore() > 21) {
      this.gameUI.displayMessage("Dealer loses! You win!");
      this.gameUI.updateMoney();
    }
  }
}
