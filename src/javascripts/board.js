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
		console.log('board constructed');
	}
	
	resetCanvas() {
		this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
	}

  displayCard(x, y) { // displays a single card
    const { ctx, deck } = this;

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
		this.ctx.stroke();

		const card = deck.deal();

		const pos = { x, y };
		this.board.push({ pos, card });

		card.image.onload = () => {
			ctx.drawImage(card.image, x + 30, y + 30); // modify x and y later to center images
		};
  }

	initialDisplayCards() { // displays all 12 cards
		CARD_COORDS.forEach(coords => {
			const { x, y } = coords;
			this.displayCard(x, y);
		});
		console.log(this.board);
  }
}

export default Board;