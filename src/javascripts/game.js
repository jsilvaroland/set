import Board from './board';

class Game {
	constructor(ctx, canvas) {
		this.board = new Board(ctx, canvas);
		this.clickedCards = [];
	}

	addGameEventListeners(canvas) {
		this.callback = e => this.handleClick(e);
		canvas.addEventListener('click', this.callback);
	}

	removeGameEventListeners(canvas) {
		canvas.removeEventListener('click', this.callback);
	}

	handleClick(e) {
		const clickPos = { x: e.layerX, y: e.layerY };
		const card = this.findClickedCard(clickPos);
		
		if (card) {
			this.clickedCards.push(card);
			this.checkClickedCards();
		}
	}

	findClickedCard(clickPos) {
		let { board } = this.board;

		return board.find(card => (
			clickPos.x >= card.pos.x &&
			clickPos.x < card.pos.x + 197 &&
			clickPos.y >= card.pos.y &&
			clickPos.y < card.pos.y + 137
		));
	}

	checkClickedCards() {
		if (this.clickedCards.length === 3) {
			console.log('three cards have been clicked');
			// check to see if the 3 clicked cards make a set
		}
	}

	increaseTimer() {
		// increases timer, likely will call within newGame
	}
}

export default Game;