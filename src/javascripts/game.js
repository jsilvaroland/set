import Deck from './deck';

// game logic will go here, but not menu logic
// all canvas logic will go into set.js later

export default class Game {
	constructor(canvas) {
		this.ctx = canvas.getContext("2d");
		this.dimensions = { width: canvas.width, height: canvas.height };
		// this.handleClicks();
	}

	newGame() {
		// lay 12 cards out on playing field
			// i have an array of shuffled cards
		// start timer.
	}

	displayCards() {
		// calls draw card function at different locations on the board
	}

	displayCard(x, y) {
		const { ctx } = this;

		ctx.beginPath();
		ctx.moveTo(x+10, y);
		ctx.lineTo(x+185, y);
		ctx.quadraticCurveTo(x+195, y, x+195, y+10);
		ctx.lineTo(x+195, y+125);
		ctx.quadraticCurveTo(x+195, y+135, x+185, y+135);
		ctx.lineTo(x+10, y+135);
		ctx.quadraticCurveTo(x, y+135, x, y+125);
		ctx.lineTo(x, y+10);
		ctx.quadraticCurveTo(x, y, x+10, y);
		this.ctx.stroke();
	}

	click(e) {
		// if certain areas are clicked, certain functions within game will be called
	}

	increaseTimer() {
		// increases timer, likely will call within newGame
	}
}