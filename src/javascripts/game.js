import Board from './board';

class Game {
  constructor(ctx, canvas, difficulty) {
		this.board = new Board(ctx, canvas, difficulty);
    this.canvas = canvas;
    this.clickedCards = [];
    this.setOnBoard = [];
    this.setsFound = 0;
    this.difficulty = difficulty;
  }

  handleMousedown(e) {
    const mousedownPos = { x: e.layerX, y: e.layerY };

    if (
      mousedownPos.x >= 400 &&
      mousedownPos.x < 400 + 108 &&
      mousedownPos.y >= 15 &&
      mousedownPos.y < 15 + 37
    ) {
      this.board.highlightFindSet();
    } else if (
      mousedownPos.x >= 528 &&
      mousedownPos.x < 528 + 143 &&
      mousedownPos.y >= 15 &&
      mousedownPos.y < 15 + 37
    ) {
      this.board.highlightAdd3Cards();
    }
  }

  unthrottledHandleMouseup() {
    this.board.displayAdd3Cards();
    this.board.displayFindSet();
  }

  handleMouseup(e) {
    const mouseupPos = { x: e.layerX, y: e.layerY };

    if (
      mouseupPos.x >= 400 &&
      mouseupPos.x < 400 + 108 &&
      mouseupPos.y >= 15 &&
      mouseupPos.y < 15 + 37
    ) {
      this.handleClickFindSet();
    } else if (
      mouseupPos.x >= 528 &&
      mouseupPos.x < 528 + 143 &&
      mouseupPos.y >= 15 &&
      mouseupPos.y < 15 + 37
      ) {
        this.handleClickAdd3Cards();
      }
  }

  handleClick(e) {
    const clickPos = { x: e.layerX, y: e.layerY };
    const clickedCard = this.findClickedCard(clickPos);

    if (clickedCard) {
      // if a card was clicked
      if (this.clickedCards.includes(clickedCard)) {
        // if card has already been clicked
        this.clickedCards = this.clickedCards.filter(
          (card) => card !== clickedCard
        );
        this.board.unhighlight(clickedCard);
      } else {
        this.clickedCards.push(clickedCard);
        this.board.highlight(clickedCard);
      }
      this.checkClickedCards();
    }
    console.log(this.clickedCards);
  }

  handleClickFindSet() {
    if (this.anySetsOnBoard()) {
      this.clickedCards.forEach((card) => {
        this.board.unhighlight(card);
      });

      this.setOnBoard.forEach((card) => {
        this.board.highlightSet(card);
      });

      this.clickedCards[0] = this.setOnBoard[0];
      this.clickedCards[1] = this.setOnBoard[1];
      this.clickedCards[2] = this.setOnBoard[2];

      this.setFound();
    } else {
      console.log("no sets on the board");
      //console.log('3 cards added');
      // no sets on board, 3 cards added.
      // this.board.displayExtraCards
      // add a cap to this at 18
    }
  }

  handleClickAdd3Cards() {
    console.log("add 3 cards");
  }

  findClickedCard(clickPos) {
    const { field } = this.board;

    return field.find((card) => {
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

      if (this.isSet(clickedCards[0], clickedCards[1], clickedCards[2])) {
        clickedCards.forEach((card) => {
          this.board.highlightSet(card);
          console.log('calling highligh set(should only happen thrice');
          //display message "SET FOUND"
        });
        this.setFound();
      } else {
        this.notASet();
      }
      this.clickedCards = [];
    }
  }

  setFound() {
    const { clickedCards, board } = this;
    this.clickedCards = [];
    this.setsOnBoard = [];
		this.setsFound++;
		board.displaySetsFound(this.setsFound);
    setTimeout(function () {
      let cardPosX, cardPosY;
      clickedCards.forEach((card) => {
        cardPosX = card.pos.x;
        cardPosY = card.pos.y;
        board.clearCardArea(cardPosX, cardPosY);
        board.removeCard(card);
        if (board.deck.cards.length) {
          board.displayCard(cardPosX, cardPosY);
        }
      });
      console.log(board.field);
      board.displayDeckCount();
      if (
        this.isBoardEmpty.call(this) ||
        (this.isDeckEmpty.call(this) && !this.anySetsOnBoard.call(this))
      ) {
        this.win.call(this);
      }
		}.bind(this), 250);
  }

  isDeckEmpty() {
    return !this.board.deck.cards.length;
  }

  isBoardEmpty() {
    return !this.board.field.some((card) => card);
  }

  notASet() {
    const { board, clickedCards } = this;

    clickedCards.forEach((card) => {
      this.board.errorHighlight(card);
      //display message "NOT A SET"
    });
    setTimeout(function () {
      clickedCards.forEach((card) => {
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
      colorReq = true;
    } else if (
      card1.card.color !== card2.card.color &&
      card1.card.color !== card3.card.color &&
      card2.card.color !== card3.card.color
    ) {
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

  anySetsOnBoard() {
		const { field } = this.board;
    // iterate through board, all combinations of 3 cards
    for (let i = 0; i < field.length; i++) {
      const card1 = field[i];
      for (let j = i + 1; j < field.length; j++) {
        const card2 = field[j];
        for (let k = j + 1; k < field.length; k++) {
          const card3 = field[k];
          if (!card1 || !card2 || !card3) { // if the spot on the board is empty
            continue;
          } else if (this.isSet(card1, card2, card3)) {
            this.setOnBoard = [card1, card2, card3];
            return true;
          }
        }
      }
    }
    return false;
  }

  increaseTimer() {
    // increases timer, likely will call within newGame
  }

  win() {
		this.board.drawWin();
  }
}

export default Game;