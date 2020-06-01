import Board from './board';

class Game {
	constructor(ctx, canvas, difficulty) {
		this.board = new Board(ctx, canvas, difficulty);
		this.clickedCards = [];
		this.setsFound = 0;
		this.difficulty = difficulty;
	}

	addGameEventListeners(canvas) {
		this.clickCallback = e => this.handleClick(e);
		this.mousedownCallback = e => this.handleMousedown(e);
		canvas.addEventListener('click', this.clickCallback);
		canvas.addEventListener('mousedown', this.mousedownCallback);
	}

	removeGameEventListeners(canvas) {
		canvas.removeEventListener('click', this.clickCallback);
		canvas.removeEventListener('mousedown', this.mousedownCallback);
	}

	handleClick(e) {
		const clickPos = { x: e.layerX, y: e.layerY };
		const clickedCard = this.findClickedCard(clickPos);

		if (clickedCard) { // if a card was clicked
			if (this.clickedCards.includes(clickedCard)) { // if card has already been clicked
				this.clickedCards = this.clickedCards.filter(card => card !== clickedCard);
				this.board.unhighlight(clickedCard);
			} else {
				this.clickedCards.push(clickedCard);
				this.board.highlight(clickedCard);
			}
			this.checkClickedCards();
		}
		console.log(this.clickedCards);
	}

	handleMousedown(e) { // finds the button that was clicked
		const mousedownPos = { x: e.layerX, y: e.layerY };
		
		if (
			mousedownPos.x >= 400 &&
			mousedownPos.x < 400 + 108 &&
			mousedownPos.y >= 15 &&
			mousedownPos.y < 15 + 37
		) {
			this.handleMousedownFindSet();
		} else if (
			mousedownPos.x >= 528 &&
			mousedownPos.x < 528 + 143 &&
			mousedownPos.y >= 15 &&
			mousedownPos.y < 15 + 37
		) {
			this.handleMousedownAdd3Cards();
		}
	}

	handleMousedownFindSet() {
		console.log('find set');
	}

	handleMousedownAdd3Cards() {
		console.log('add 3 cards');
	}

	findClickedCard(clickPos) {
		let { board } = this.board;

		return board.find(card => {
			if (card) {
				return (
					clickPos.x >= card.pos.x &&
					clickPos.x < card.pos.x + 197 &&
					clickPos.y >= card.pos.y &&
					clickPos.y < card.pos.y + 137
				);
			}
		});
	}

	checkClickedCards() {
		if (this.clickedCards.length === 3) {
			const { clickedCards } = this;

			if(this.isSet(clickedCards[0], clickedCards[1], clickedCards[2])) {
				this.setFound();
			} else {
				this.notASet();
			}
			this.clickedCards = [];
		}
	}

	setFound() {
		this.setsFound++;
		console.log('is a set!');
		let cardPosX, cardPosY;
		this.clickedCards.forEach(card => {
			cardPosX = card.pos.x;
			cardPosY = card.pos.y;
			this.board.clearCardArea(cardPosX, cardPosY);
			this.board.removeCard(card);
			// if deck has cards left, displayCard
			if (this.board.deck.deck.length) {
				this.board.displayCard(cardPosX, cardPosY);
			}
		});
		console.log(this.board.board);
		this.board.displayDeckCount();
		this.board.displaySetsFound(this.setsFound);
		// check if deck is empty and if any sets on board. if not, game over you win!
		
		if (this.isBoardEmpty() || (this.isDeckEmpty() && !this.anySetsOnBoard())) {
			console.log("you win");
			this.win();
    }
	}

	isDeckEmpty() {
		return !this.board.deck.deck.length;
	}

	isBoardEmpty() {
		return !this.board.board.some(card => card);
	}

	notASet() {
		const { board, clickedCards } = this;

		console.log('not a set');
		clickedCards.forEach((card) => {
			this.board.errorHighlight(card);
			//display message "NOT A SET"
		});
		setTimeout(function() {
			clickedCards.forEach(card => {
				board.unhighlight(card);
				// unhighlight THE 3 CARDS, display message "NOT A SET"
			});
		}, 250);
		// add 30 seconds to timer
	}

	isSet(card1, card2, card3) {
		let colorReq = false;
    let numberReq = false;
    let shapeReq = false;
    let shadingReq = false;

    // color req
    if (
      card1.card.color === card2.card.color &&
      card2.card.color === card3.card.color
    ) {
      console.log("all cards same color");
      colorReq = true;
    } else if (
      card1.card.color !== card2.card.color &&
      card1.card.color !== card3.card.color &&
      card2.card.color !== card3.card.color
    ) {
      console.log("all cards diff color");
      colorReq = true;
    }

    // number req
    if (
      card1.card.number === card2.card.number &&
      card2.card.number === card3.card.number
    ) {
      numberReq = true;
    } else if (
      card1.card.number !== card2.card.number &&
      card1.card.number !== card3.card.number &&
      card2.card.number !== card3.card.number
    ) {
      numberReq = true;
    }

    // shape req
    if (
      card1.card.shape === card2.card.shape &&
      card2.card.shape === card3.card.shape
    ) {
      shapeReq = true;
    } else if (
      card1.card.shape !== card2.card.shape &&
      card1.card.shape !== card3.card.shape &&
      card2.card.shape !== card3.card.shape
    ) {
      shapeReq = true;
    }

    // shading req
    if (
      card1.card.shading === card2.card.shading &&
      card2.card.shading === card3.card.shading
    ) {
      shadingReq = true;
    } else if (
      card1.card.shading !== card2.card.shading &&
      card1.card.shading !== card3.card.shading &&
      card2.card.shading !== card3.card.shading
    ) {
      shadingReq = true;
		}
		
		return colorReq && numberReq && shapeReq && shadingReq; // returns true if it's a set
	}

	anySetsOnBoard(arg) {
		let { board } = this.board;
		// iterate through board, all combinations of 3 cards
		for (let i = 0; i < board.length; i++) {
			const card1 = board[i];
			for (let j = i + 1; j < board.length; j++) {
				const card2 = board[j];
				for (let k = j + 1; k < board.length; k++) {
					const card3 = board[k];
					if (!card1 || !card2 || !card3) {
						console.log('spot is empty');
						continue;
					} else if (this.isSet(card1, card2, card3)) {
						if (arg) {
							console.log('call find a set');
							this.board.highlight(card1);
							this.board.highlight(card2);
							this.board.highlight(card3);
						}
						return true;
					}
				}
			}
		}
		return false;
	}

	findSet() {
		anySetsOnBoard(true);
	}

	increaseTimer() {
		// increases timer, likely will call within newGame
	}

	win() {
		this.board.drawWin();
	}
}

export default Game;