import Deck from './deck';
import Button from './button';

const CARD_COORDS = [
	{ x: 50, y: 100 },
	{ x: 262, y: 100 },
	{ x: 474, y: 100 },
	{ x: 50, y: 252 },
	{ x: 262, y: 252 },
	{ x: 474, y: 252 },
	{ x: 50, y: 404 },
	{ x: 262, y: 404 },
	{ x: 474, y: 404 },
	{ x: 50, y: 557 },
	{ x: 262, y: 557 },
	{ x: 474, y: 557 }
];

class Board {
  constructor(ctx, canvas, difficulty) {
    this.ctx = ctx;
    this.dimensions = { width: canvas.width, height: canvas.height };

    this.field = [];
    this.deck = new Deck(difficulty);
    this.findSetButton = new Button(400, 15, 106, 35);
    this.add3CardsButton = new Button(528, 15, 141, 35);
    this.resetCanvas();
    this.initialDisplayCards();
    this.displayDeckCount();
    this.displaySetsFound(0);
    this.displayFindSet();
    this.displayAdd3Cards();
  }

  resetCanvas() {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  drawRoundedRect(x, y, w, h, stroke, fill, borderRad = 10, lineWidth = 3) {
    const { ctx } = this;

    ctx.beginPath();
    ctx.moveTo(x + borderRad, y);
    ctx.lineTo(x + w - borderRad, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + borderRad);
    ctx.lineTo(x + w, y + h - borderRad);
    ctx.quadraticCurveTo(x + w, y + h, x + w - borderRad, y + h);
    ctx.lineTo(x + borderRad, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - borderRad);
    ctx.lineTo(x, y + borderRad);
    ctx.quadraticCurveTo(x, y, x + borderRad, y);
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = lineWidth;
    this.ctx.stroke();
    this.ctx.fill();
  }

  clearCardArea(x, y) {
    this.ctx.clearRect(x - 3, y - 3, 197 + 3, 137 + 3);
  }

  removeCard(card) {
    const i = this.field.indexOf(card);
    delete this.field[i];
  }

  highlight(card) {
    const { x, y } = card.pos;
    const { width, height } = card.card;

    this.clearCardArea(x, y);
    this.drawRoundedRect(x, y, width, height, "#959595", "#DDEFFE");
    this.drawCardImage(card.card, card.pos);
  }

  highlightSet(card) {
    const { x, y } = card.pos;
    const { width, height } = card.card;

    this.clearCardArea(x, y);
    this.drawRoundedRect(x, y, width, height, "#959595", "#DDFEDF");
    this.drawCardImage(card.card, card.pos);
  }

  unhighlight(card) {
    const { x, y } = card.pos;
    const { width, height } = card.card;

    this.drawRoundedRect(x, y, width, height, "#959595", "#FFFFFF");
    this.drawCardImage(card.card, card.pos);
  }

  errorHighlight(card) {
    const { x, y } = card.pos;
    const { width, height } = card.card;

    this.clearCardArea(x, y);
    this.drawRoundedRect(x, y, width, height, "#959595", "#FEDDDF");
    this.drawCardImage(card.card, card.pos);
  }

  displayCard(x, y) {
    const card = this.deck.deal();
    const { width, height } = card;
    const pos = { x, y };

    this.drawRoundedRect(x, y, width, height, "#959595", "#FFFFFF");

    if (this.field.includes(undefined)) {
      for (let i = 0; i < this.field.length; i++) {
        if (typeof this.field[i] == "undefined") {
          this.field[i] = { pos, card };
        }
      }
      this.drawCardImage(card, pos);
    } else {
      this.field.push({ pos, card });
      card.image.onload = () => {
        this.drawCardImage(card, pos);
      };
    }

    // card.image.onload = () => {
    // 	this.drawCardImage(card, pos);
    // };
  }

  drawCardImage(card, pos) {
    this.ctx.drawImage(card.image, pos.x + 28, pos.y + 25);
  }

  initialDisplayCards() {
    // displays all 12 cards
    CARD_COORDS.forEach((coords) => {
      const { x, y } = coords;
      this.displayCard(x, y);
    });
  }

  displayDeckCount() {
    const { ctx } = this;
    const { deck } = this.deck;

    this.ctx.clearRect(0, 0, 160, 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    this.ctx.fillText(`Deck: ${deck.length}`, 50, 40);
    ctx.fillStyle = "#FFFFFF";
  }

  displaySetsFound(setsFound) {
    const { ctx } = this;
    this.ctx.clearRect(160, 0, 160, 50);
    ctx.fillStyle = "#000000";
    this.ctx.fillText(`Sets Found: ${setsFound}`, 165, 40);
    ctx.fillStyle = "#FFFFFF";
  }

  displayFindSet() {
    const { ctx } = this;
		const { x, y, width, height } = this.findSetButton;

		this.ctx.clearRect(x - 2, y - 2, width + 5, height + 5);
    this.drawRoundedRect(x, y, width, height, "#959595", "#FFFFFF");

    ctx.fillStyle = "#000000";
    this.ctx.fillText(`Find Set`, x + 15, y + 25);
    ctx.fillStyle = "#FFFFFF";
  }

  highlightFindSet() {
    const { ctx } = this;
    const { x, y, width, height } = this.findSetButton;

		this.ctx.clearRect(x - 2, y - 2, width + 5, height + 5);
    this.drawRoundedRect(x, y, width, height, "#959595", "#DDEFFE");

    ctx.fillStyle = "#000000";
    this.ctx.fillText(`Find Set`, x + 15, y + 25);
    ctx.fillStyle = "#FFFFFF";
  }

  displayAdd3Cards() {
    const { ctx } = this;
    const { x, y, width, height } = this.add3CardsButton;

		this.ctx.clearRect(x - 5, y - 5, width + 5, height + 5);
    this.drawRoundedRect(x, y, width, height, "#959595", "#FFFFFF");

    ctx.fillStyle = "#000000";
    this.ctx.fillText(`Add 3 Cards`, x + 15, y + 25);
    ctx.fillStyle = "#FFFFFF";
  }

  highlightAdd3Cards() {
    const { ctx } = this;
    const { x, y, width, height } = this.add3CardsButton;

		this.ctx.clearRect(x - 5, y - 5, width + 5, height + 5);
    this.drawRoundedRect(x, y, width, height, "#959595", "#DDEFFE");

    ctx.fillStyle = "#000000";
    this.ctx.fillText(`Add 3 Cards`, x + 15, y + 25);
    ctx.fillStyle = "#FFFFFF";
  }

  drawWin() {
    const { ctx } = this;

		this.drawRoundedRect(165 - 73, 400 - 48 - 73, 389 + (73 * 2), 73 + (48 * 2), "#959595", "#FFFFFF", 30, 5);

		ctx.font = "100px Arial";
    ctx.fillStyle = "#000000";
    this.ctx.fillText(`You Win!`, 165, 400);
		// change these coordinates later
		ctx.font = "20px Arial";
    ctx.fillStyle = "#FFFFFF";
  }
}

export default Board;