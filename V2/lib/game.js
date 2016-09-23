"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.deck = this.createDeck();
    this.pot = 0;
  }

  // this is classified as a "command" - it doesn't return info like a query, just does stuff


  _createClass(Game, [{
    key: "shuffleCards",
    value: function shuffleCards() {
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
  }, {
    key: "createDeck",
    value: function createDeck() {
      // Set up the card deck
      var cardVal;
      var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      var suits = ["S", "H", "C", "D"];
      var deck = [];

      // The Math.min function here sets everything 10 or greater to just
      // 10, ensuring face cards always have a value of 10.
      for (var i = 0, j = suits.length; i < j; i++) {
        for (var k = 0, l = values.length; k < l; k++) {
          if (values[k].substring(0, 1) === "A") {
            cardVal = 11;
          } else {
            cardVal = Math.min(10, parseInt(j) + 1);
          }
          var tmpCard = {
            "name": values[k] + suits[i],
            "value": cardVal
          };
          deck.push(tmpCard);
        }
      }
      return deck;
    }
  }, {
    key: "startNewGame",
    value: function startNewGame() {
      this.shuffleCards();

      // Reset the players' hands
      this.player.cards = [];
      this.dealer.cards = [];

      this.gameUI.enableBetting();
      this.gameUI.disableNewGame();
    }
  }, {
    key: "firstDeal",
    value: function firstDeal(player, dealer) {
      this.dealCard(player, 2);
      this.dealCard(dealer, 2);

      this.gameUI.showCards();
      this.gameUI.enableHitStand();

      this.gameUI.showFirstDealerCard(dealer);
      this.gameUI.updatePlayerScore();
    }
  }, {
    key: "dealCard",
    value: function dealCard(player, count) {
      for (var i = 0; i < count; i++) {
        var card = this.deck.pop();
        player.dealCard(card);
      }
    }
  }, {
    key: "checkFinalScore",
    value: function checkFinalScore() {
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
  }, {
    key: "addBet",
    value: function addBet(amount) {
      this.pot += amount;
      this.gameUI.enableDeal();
    }
  }, {
    key: "checkFor21",
    value: function checkFor21(player) {
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
  }]);

  return Game;
}();