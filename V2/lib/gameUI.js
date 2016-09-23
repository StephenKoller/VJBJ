"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameUI = function () {
    function GameUI(game, player, dealer) {
        _classCallCheck(this, GameUI);

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
        this.playerScoreText = document.getElementById("playerScore");
        this.dealerScoreText = document.getElementById("dealerScore");
    }

    _createClass(GameUI, [{
        key: "resetUI",
        value: function resetUI() {
            // Reset players' hands in DOM to empty
            this.playerCardsOnScreen.innerHTML = "<div id='empty' class='card'></div><div id='empty' class='card'></div>";
            this.dealerCardsOnScreen.innerHTML = "<div id='empty' class='card'></div><div id='hiddenCard' class='card'></div>";

            // playerCardsUI.reset();
            this.playerScoreText.innerHTML = "";
            this.dealerScoreText.innerHTML = "";

            // gameStatus.reset();
            gameStatus.innerHTML = "";
            betAmount.innerHTML = "0";

            this.disableHitStand();
            this.disableDeal();
            this.enableNewGame();
        }
    }, {
        key: "setBackgroundImage",
        value: function setBackgroundImage(element, name) {
            element.style.backgroundImage = "url(../img/cards/" + name + ".png)";
        }
    }, {
        key: "displayMessage",
        value: function displayMessage(message) {
            this.gameStatus.innerHTML = message;
        }
    }, {
        key: "hit",
        value: function hit() {
            this.game.dealCard(this.player, 1);

            // Create a new DOM element
            var newCard = document.createElement("div");

            // Find the name of the new card that has been dealt and add it to the DOM element
            var card = this.player.cards[this.player.cards.length - 1];
            newCard.id = card.name;

            // Set the styling
            newCard.className = "card";
            this.setBackgroundImage(newCard, card.name);

            // Add new element to the DOM
            this.playerCardsOnScreen.appendChild(newCard);

            this.updatePlayerScore();

            this.game.checkFor21(this.player);
        }
    }, {
        key: "stand",
        value: function stand() {
            // First show the second card the dealer already has in their hand
            this.dealerCard.id = this.dealer.cards[1].name;
            this.setBackgroundImage(this.dealerCard, this.dealer.cards[1].name);

            // Then while the dealer's score is less than 17, keep dealing cards and displaying them
            var i = 2;
            while (this.dealer.calculateScore() < 17) {
                this.game.dealCard(this.dealer, 1);
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
    }, {
        key: "reset",
        value: function reset() {
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
    }, {
        key: "updateMoney",
        value: function updateMoney() {
            this.betAmount.innerHTML = this.game.pot;
            this.playerMoney.innerHTML = this.player.money;
        }
    }, {
        key: "updatePlayerScore",
        value: function updatePlayerScore() {
            // Update display for score of cards currently held by player
            this.playerScoreText.innerHTML = this.player.calculateScore();
        }
    }, {
        key: "updateDealerScore",
        value: function updateDealerScore() {
            // Update display for score of cards currently held by dealer
            this.dealerScoreText.innerHTML = this.dealer.calculateScore();
        }
    }, {
        key: "enableNewGame",
        value: function enableNewGame() {
            newGameButton.disabled = "";
        }
    }, {
        key: "disableNewGame",
        value: function disableNewGame() {
            newGameButton.disabled = "disabled";
        }
    }, {
        key: "enableDeal",
        value: function enableDeal() {
            dealButton.disabled = "";
        }
    }, {
        key: "disableDeal",
        value: function disableDeal() {
            dealButton.disabled = "disabled";
        }
    }, {
        key: "enableHitStand",
        value: function enableHitStand() {
            // Enable hit/stand buttons
            hitButton.disabled = "";
            standButton.disabled = "";
        }
    }, {
        key: "disableHitStand",
        value: function disableHitStand() {
            // disable buttons
            hitButton.disabled = "disabled";
            standButton.disabled = "disabled";
        }
    }, {
        key: "enableBetting",
        value: function enableBetting() {
            // Enable betting buttons
            bet1.disabled = "";
            bet5.disabled = "";
            bet10.disabled = "";
            bet25.disabled = "";
            bet100.disabled = "";
        }
    }, {
        key: "disableBetting",
        value: function disableBetting(buttons) {
            bet1.disabled = "disabled";
            bet5.disabled = "disabled";
            bet10.disabled = "disabled";
            bet25.disabled = "disabled";
            bet100.disabled = "disabled";
        }
    }, {
        key: "showFirstDealerCard",
        value: function showFirstDealerCard(dealer) {
            this.setBackgroundImage(this.dealerCard, dealer.cards[0].name);
        }
    }, {
        key: "showCards",
        value: function showCards() {
            // Update DOM to match dealt cards
            // may need to rewrite this...
            for (var i = 0; i < this.player.cards.length; i++) {
                var card = this.player.cards[i];
                var cardBox = this.playerCardsOnScreen.getElementsByTagName("div")[i];
                this.setBackgroundImage(cardBox, card.name);
            }
        }
    }, {
        key: "setEventListeners",
        value: function setEventListeners(game, player, dealer) {
            var gameUI = this;

            hitButton.addEventListener('click', function () {
                gameUI.hit();
            }, false);

            standButton.addEventListener('click', function () {
                gameUI.stand();
            }, false);

            dealButton.addEventListener('click', function () {
                gameUI.disableBetting();
                game.firstDeal(player, dealer);
                gameUI.disableDeal();
            }, false);

            newGameButton.addEventListener('click', function () {
                gameUI.resetUI();
                game.startNewGame(player, dealer);
            }, false);

            function _addBet(amount) {
                player.bet(game, amount);
                gameUI.updateMoney();
                gameUI.enableDeal();
            }

            bet1.addEventListener('click', function () {
                _addBet(1);
            }, false);

            bet5.addEventListener('click', function () {
                _addBet(5);
            }, false);

            bet10.addEventListener('click', function () {
                _addBet(10);
            }, false);

            bet25.addEventListener('click', function () {
                _addBet(25);
            }, false);

            bet100.addEventListener('click', function () {
                _addBet(100);
            }, false);
        }
    }]);

    return GameUI;
}();