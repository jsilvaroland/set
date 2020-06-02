import Board from './board';
import { throttle } from './util';

class Game {
  constructor(ctx, canvas, difficulty) {
		this.board = new Board(ctx, canvas, difficulty);
		this.canvas = canvas;
    this.clickedCards = [];
    this.setOnBoard = [];
    this.setsFound = 0;
    this.difficulty = difficulty;
  }

  addGameEventListeners(canvas) {
    this.clickCallback = (e) => this.handleClick(e);
    this.mousedownCallback = (e) => this.handleMousedown(e);
    this.mouseupCallback = (e) => this.handleMouseup(e);
    canvas.addEventListener("click", this.clickCallback);
		canvas.addEventListener("click", throttle(e => {
			this.handleButtonClick(e);
		}, 1000));
    canvas.addEventListener("mousedown", this.mousedownCallback);
    canvas.addEventListener("mouseup", this.mouseupCallback);
  }

  removeGameEventListeners(canvas) {
    canvas.removeEventListener("click", this.clickCallback);
    canvas.removeEventListener("click", this.buttonClickCallback);
    canvas.removeEventListener("mousedown", this.mousedownCallback);
    canvas.removeEventListener("mouseup", this.mouseupCallback);
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

  handleMouseup(e) {
    const mouseupPos = { x: e.layerX, y: e.layerY };

    if (
      mouseupPos.x >= 400 &&
      mouseupPos.x < 400 + 108 &&
      mouseupPos.y >= 15 &&
      mouseupPos.y < 15 + 37
    ) {
			this.board.displayFindSet();
    } else if (
      mouseupPos.x >= 528 &&
      mouseupPos.x < 528 + 143 &&
      mouseupPos.y >= 15 &&
      mouseupPos.y < 15 + 37
    ) {
      this.board.displayAdd3Cards();
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

  handleButtonClick(e) {
    // finds the button that was clicked
    const clickPos = { x: e.layerX, y: e.layerY };

    if (
      clickPos.x >= 400 &&
      clickPos.x < 400 + 108 &&
      clickPos.y >= 15 &&
      clickPos.y < 15 + 37
    ) {
      this.handleClickFindSet();
    } else if (
      clickPos.x >= 528 &&
      clickPos.x < 528 + 143 &&
      clickPos.y >= 15 &&
      clickPos.y < 15 + 37
    ) {
      this.handleClickAdd3Cards();
    }
  }

  handleClickFindSet() {
    if (this.anySetsOnBoard(this.board, this.isSet)) {
      // call set found with a setTimeout
      console.log(this.setOnBoard);

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
    const { board } = this.board;

    return board.find((card) => {
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
    const {
      clickedCards,
			board,
      isBoardEmpty,
      isDeckEmpty,
      anySetsOnBoard,
      win,
			isSet,
    } = this;
    this.clickedCards = [];
    this.setsOnBoard = [];
		console.log("is a set!");
		this.setsFound++;
		board.displaySetsFound(this.setsFound);
    setTimeout(function () {
      let cardPosX, cardPosY;
      clickedCards.forEach((card) => {
        cardPosX = card.pos.x;
        cardPosY = card.pos.y;
        board.clearCardArea(cardPosX, cardPosY);
        board.removeCard(card);
        // if deck has cards left, displayCard
        if (board.deck.deck.length) {
          board.displayCard(cardPosX, cardPosY);
        }
      });
      console.log(board.board);
      board.displayDeckCount();
      // board.displaySetsFound(setsFound);
      // check if deck is empty and if any sets on board. if not, game over you win!

      if (
        isBoardEmpty(board) ||
        (isDeckEmpty(board) && !anySetsOnBoard(board, isSet))
      ) {
        win(board);
      }
    }, 250);
  }

  isDeckEmpty(board) {
    return !board.deck.deck.length;
  }

  isBoardEmpty(board) {
    return !board.board.some((card) => card);
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

  anySetsOnBoard(board, isSet) {
    // iterate through board, all combinations of 3 cards
    for (let i = 0; i < board.board.length; i++) {
      const card1 = board.board[i];
      for (let j = i + 1; j < board.board.length; j++) {
        const card2 = board.board[j];
        for (let k = j + 1; k < board.board.length; k++) {
          const card3 = board.board[k];
          if (!card1 || !card2 || !card3) { // if the spot on the board is empty
            continue;
          } else if (isSet(card1, card2, card3)) {
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

  win(board) {
		board.drawWin();
  }
}

export default Game;