"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(name) {
        _classCallCheck(this, Player);

        // TODO: make private variables
        this.money = 1000;
        this.totalScore = 0;
        this.cards = [];
        this.name = name;
    }

    _createClass(Player, [{
        key: "bet",
        value: function bet(game, amount) {
            this.money -= amount;
            game.addBet(amount);
        }
    }, {
        key: "dealCard",
        value: function dealCard(card) {
            this.cards.push(card);
        }
    }, {
        key: "calculateScore",
        value: function calculateScore() {
            // Reset the score to count again
            this.totalScore = 0;

            // Add the value of each card in the player's hand
            for (var i = 0; i < this.cards.length; i++) {
                this.totalScore += this.cards[i].value;
            }

            // TODO: account for possible 3 ace situation

            // if total > 21
            if (this.totalScore > 21) {
                var aceCount = 0;
                this.totalScore = 0;

                for (i = 0, j = this.cards.length; i < j; i++) {
                    if (this.cards[i].name.substring(0, 1) === "A" && aceCount === 0) {
                        // set the ace's value to 1
                        this.cards[i].value = 1;
                        aceCount++;
                    }
                    this.totalScore += this.cards[i].value;
                }
            }

            return this.totalScore;
        }
    }]);

    return Player;
}();