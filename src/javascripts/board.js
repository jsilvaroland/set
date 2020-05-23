import Deck from './deck';

const CARD_COORDS = [
	{ x: 50, y: 50 },
	{ x: 262, y: 50 },
	{ x: 474, y: 50 },
	{ x: 50, y: 202 },
	{ x: 262, y: 202 },
	{ x: 474, y: 202 },
	{ x: 50, y: 354 },
	{ x: 262, y: 354 },
	{ x: 474, y: 354 },
	{ x: 50, y: 507 },
	{ x: 262, y: 507 },
	{ x: 474, y: 507 }
];

class Board {
  constructor(ctx, canvas) {
		this.ctx = ctx;
		this.dimensions = { width: canvas.width, height: canvas.height };

		this.board = [];
		this.deck = new Deck();
		this.resetCanvas();
		this.initialDisplayCards();
		this.displayDeckCount();
		this.displaySetsFound(0);
	}
	
	resetCanvas() {
		this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
	}

	clearCardArea(x, y) {
		this.ctx.clearRect(x-3, y-3, 197 + 3, 137 + 3); // clears area
	}

	removeCard(card) {
		const i = this.board.indexOf(card);
		delete this.board[i];
	}

	highlight(card) {
		const { ctx } = this;
		const { x, y } = card.pos;

		this.clearCardArea(x, y);
		ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 185, y);
    ctx.quadraticCurveTo(x + 195, y, x + 195, y + 10);
    ctx.lineTo(x + 195, y + 125);
    ctx.quadraticCurveTo(x + 195, y + 135, x + 185, y + 135);
    ctx.lineTo(x + 10, y + 135);
    ctx.quadraticCurveTo(x, y + 135, x, y + 125);
    ctx.lineTo(x, y + 10);
    ctx.quadraticCurveTo(x, y, x + 10, y);
		ctx.strokeStyle = "#959595";
		ctx.fillStyle = "#DDEFFE";
		ctx.lineWidth = 3; // maybe change this
		this.ctx.stroke();
		this.ctx.fill();

		this.drawCardImage(card.card, card.pos);
	}

	unhighlight(card) {
		const { ctx } = this;
		const { x, y } = card.pos;

		this.clearCardArea(x, y);
		ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 185, y);
    ctx.quadraticCurveTo(x + 195, y, x + 195, y + 10);
    ctx.lineTo(x + 195, y + 125);
    ctx.quadraticCurveTo(x + 195, y + 135, x + 185, y + 135);
    ctx.lineTo(x + 10, y + 135);
    ctx.quadraticCurveTo(x, y + 135, x, y + 125);
    ctx.lineTo(x, y + 10);
		ctx.quadraticCurveTo(x, y, x + 10, y);
		ctx.strokeStyle = "#959595";
		ctx.fillStyle = "#FFFFFF";
		ctx.lineWidth = 3;
		this.ctx.stroke();
		this.ctx.fill();

		this.drawCardImage(card.card, card.pos);
	}

	errorHighlight(card) {
		const { ctx } = this;
    const { x, y } = card.pos;

    this.clearCardArea(x, y);
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 185, y);
    ctx.quadraticCurveTo(x + 195, y, x + 195, y + 10);
    ctx.lineTo(x + 195, y + 125);
    ctx.quadraticCurveTo(x + 195, y + 135, x + 185, y + 135);
    ctx.lineTo(x + 10, y + 135);
    ctx.quadraticCurveTo(x, y + 135, x, y + 125);
    ctx.lineTo(x, y + 10);
    ctx.quadraticCurveTo(x, y, x + 10, y);
    ctx.strokeStyle = "#959595";
    ctx.fillStyle = "#FEDDDF";
    ctx.lineWidth = 3;
    this.ctx.stroke();
    this.ctx.fill();

    this.drawCardImage(card.card, card.pos);
	}

  displayCard(x, y) { // displays a single card
    const { ctx, deck } = this;
		const card = deck.deal();
		const pos = { x, y };

    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x + 185, y);
    ctx.quadraticCurveTo(x + 195, y, x + 195, y + 10);
    ctx.lineTo(x + 195, y + 125);
    ctx.quadraticCurveTo(x + 195, y + 135, x + 185, y + 135);
    ctx.lineTo(x + 10, y + 135);
    ctx.quadraticCurveTo(x, y + 135, x, y + 125);
    ctx.lineTo(x, y + 10);
		ctx.quadraticCurveTo(x, y, x + 10, y);
		ctx.strokeStyle = "#959595";
		ctx.fillStyle = "#FFFFFF";
		ctx.lineWidth = 3;
		this.ctx.stroke();
		this.ctx.fill();

		if (this.board.includes(undefined)) {
			for (let i = 0; i < this.board.length; i++) {
				if (typeof this.board[i] == 'undefined') {
					this.board[i] = { pos, card };
				}
			}
			this.drawCardImage(card, pos);
		} else {
			this.board.push({ pos, card });
			card.image.onload = () => {
				this.drawCardImage(card, pos);
			};
		}
		
		// card.image.onload = () => {
		// 	this.drawCardImage(card, pos);
		// };
	}
	
	drawCardImage(card, pos) {
		this.ctx.drawImage(card.image, pos.x + 28, pos.y + 25); // modify x and y later to center images
	}

	initialDisplayCards() { // displays all 12 cards
		CARD_COORDS.forEach(coords => {
			const { x, y } = coords;
			this.displayCard(x, y);
		});
		console.log(this.board);
	}
	
	displayDeckCount() {
		const { ctx } = this;
		const { deck } = this.deck;

		this.ctx.clearRect(0, 0, 200, 40);
		ctx.font = '20px Arial';
		ctx.fillStyle = '#000000';
		this.ctx.fillText(`Deck: ${deck.length}`, 50, 20);
		ctx.fillStyle = '#FFFFFF';
	}

	displaySetsFound(setsFound) {
		const { ctx } = this;

		this.ctx.clearRect(200, 0, 200, 40);
		ctx.fillStyle = '#000000';
		this.ctx.fillText(`Sets found: ${setsFound}`, 200, 20);
		ctx.fillStyle = '#FFFFFF';
	}
}

export default Board;