describe("Game", function() {
  var player;
  var game;

  beforeEach(function() {
    game = new Game();
    player1 = new Player();
  });

  it("should have a player1 with a score of 100", function() {
    expect(player1.score).toEqual(100);
  });

  describe("when dealing cards it", function(){
    it("should deal each card only once if dealing a full deck", function(){
      for(var i = 0; i < 52; i++){
        game.dealCard(player1);
      }

      expect(player1.cards.length).toEqual(52);

      expect(player1.cards.indexOf("6C")).not.toEqual(-1);
      expect(player1.cards.indexOf("9H")).not.toEqual(-1);
    });

    it("should not have the same deck order after shuffling", function(){

      expect(game.deck.indexOf("AS")).toEqual(0);
      expect(game.deck.indexOf("AC")).toEqual(26);
      expect(game.deck.indexOf("KD")).toEqual(51);

      game.shuffleCards();

      var ace_of_spades_shuffled = (game.deck.indexOf("AS") !== 0);
      var ace_of_clubs_shuffled = (game.deck.indexOf("AC") !== 26);
      var king_of_diamonds_shuffled = (game.deck.indexOf("KD") !== 51);

      var all_cards_shuffled = (ace_of_spades_shuffled && ace_of_clubs_shuffled && king_of_diamonds_shuffled);

      // I know this is a brittle test, but I'm not sure how to make it better
      expect(all_cards_shuffled).toBe(true);
    });

    it("should do x", function(){
      
    });
  });

});
