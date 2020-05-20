// import Deck from './deck';

// game logic will go here, but not menu logic

class Game {
	constructor() {
		// this.deck = new Deck();

		// this.handleClicks();
	}

	newGame() {
		// lay 12 cards out on playing field
		
		this.deck.resetDeckExpert();

			// i have an array of shuffled cards
		// start timer.
	}

	click(e) {
		// if certain areas are clicked, certain functions within game will be called
		// put it in an array, when array length reaches 3 check to see if it's a set.
			// if it is, remove the cards and call some function in board
			// if not, flash red or something? idk
	}

	increaseTimer() {
		// increases timer, likely will call within newGame
	}
}

export default Game;