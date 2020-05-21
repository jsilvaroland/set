import Board from './board';

// game logic will go here, but not menu logic

class Game {
	constructor(ctx, canvas) {
		this.board = new Board(ctx, canvas);
		this.clickedCards = [];
	}

	addGameEventListeners(canvas) {
		let { board } = this.board;

		// board.forEach(card => {
		// 	canvas.addEventListener('click', this.handleHandleClick); 
		// });
		board.forEach(card => {
			this.callback = e => this.handleClick(e, card);
			canvas.addEventListener('click', this.callback); 
		});
	}

	removeGameEventListeners(canvas) {
		// not functioning atm
		let { board } = this.board;

		// board.forEach(card => {
			canvas.removeEventListener("click", this.callback); 
		// });
	}

	handleClick(e, card) {
		const clickPos = { x: e.clientX, y: e.clientY };

		if (clickPos.x >= card.pos.x && clickPos.x < (card.pos.x + 197) && clickPos.y >= card.pos.y && clickPos.y < (card.pos.y + 137)) {
			console.log(card);
		}
	}

	increaseTimer() {
		// increases timer, likely will call within newGame
	}
}

export default Game;