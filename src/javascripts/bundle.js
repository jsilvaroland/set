/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/javascripts/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/javascripts/board.js":
/*!**********************************!*\
  !*** ./src/javascripts/board.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deck */ "./src/javascripts/deck.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button */ "./src/javascripts/button.js");



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

    this.board = [];
    this.deck = new _deck__WEBPACK_IMPORTED_MODULE_0__["default"](difficulty);
    this.findSetButton = new _button__WEBPACK_IMPORTED_MODULE_1__["default"](400, 15, 106, 35);
    this.add3CardsButton = new _button__WEBPACK_IMPORTED_MODULE_1__["default"](528, 15, 141, 35);
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
    const i = this.board.indexOf(card);
    delete this.board[i];
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

    if (this.board.includes(undefined)) {
      for (let i = 0; i < this.board.length; i++) {
        if (typeof this.board[i] == "undefined") {
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

/* harmony default export */ __webpack_exports__["default"] = (Board);

/***/ }),

/***/ "./src/javascripts/button.js":
/*!***********************************!*\
  !*** ./src/javascripts/button.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Button {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./src/javascripts/card.js":
/*!*********************************!*\
  !*** ./src/javascripts/card.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Card {
    constructor(color, number, shape, shading, image) {
        this.color = color;
        this.number = number;
        this.shape = shape;
        this.shading = shading;
        this.image = image;
        this.width = 195;
        this.height = 135;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Card);

/***/ }),

/***/ "./src/javascripts/deck.js":
/*!*********************************!*\
  !*** ./src/javascripts/deck.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ "./src/javascripts/card.js");


const ATTRIBUTES = {
	colors: ['red', 'green', 'purple'],
	numbers: ['one', 'two', 'three'],
	shapes: ['oval', 'squiggle', 'diamond'],
	shadings: ['solid', 'striped', 'open'],
};

class Deck {
	constructor(difficulty) {
		if (difficulty === 'expert') {
			this.resetDeckExpert(); // for now deck will be made in constructor, once novice mode is introduced, resetDeck will be removed from constructor and will have to be called depending on button push
		} else {
			this.resetDeckNovice();
		}
	}

	repopulateDeckNovice() {
	// empties deck if not already empty
		this.deck = [];
		let image, card;
		let shading = { shading: 'solid' };

		ATTRIBUTES.colors.forEach(color => {
			ATTRIBUTES.numbers.forEach(number => {
				ATTRIBUTES.shapes.forEach(shape => {
					image = new Image();
					image.src = `./src/assets/${color}-${number}-${shape}-solid.png`;

					card = new _card__WEBPACK_IMPORTED_MODULE_0__["default"](color, number, shape, shading, image);
					this.deck.push(card);
				});
			});
		});
	}

	repopulateDeckExpert() {
		// empties deck if not already empty
		this.deck = [];
		let image, card;

		ATTRIBUTES.colors.forEach(color => {
			ATTRIBUTES.numbers.forEach(number => {
				ATTRIBUTES.shapes.forEach(shape => {
					ATTRIBUTES.shadings.forEach(shading => {
						image = new Image();
						image.src = `./src/assets/${color}-${number}-${shape}-${shading}.png`;

						card = new _card__WEBPACK_IMPORTED_MODULE_0__["default"](color, number, shape, shading, image);
						this.deck.push(card);
					});
				});
			});
		});
	}

	shuffle() {
		const { deck } = this;
		let count = deck.length;
		let i;

		while (count) {
			i = Math.floor(Math.random() * count--);
			[deck[count], deck[i]] = [deck[i], deck[count]];
		}
	}

	resetDeckNovice() {
		this.repopulateDeckNovice();
		this.shuffle();
	}

	resetDeckExpert() {
		this.repopulateDeckExpert();
		this.shuffle();
	}

	deal() {
		return this.deck.pop();
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Deck);

/***/ }),

/***/ "./src/javascripts/entry.js":
/*!**********************************!*\
  !*** ./src/javascripts/entry.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set */ "./src/javascripts/set.js");


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("set-game");
    const set = new _set__WEBPACK_IMPORTED_MODULE_0__["default"](canvas);
    
    const newGameNovice = document.getElementById("new-game-novice");
    newGameNovice.addEventListener("click", () => {
      set.newGameNovice();
    });

    const newGameExpert = document.getElementById("new-game-expert");
    newGameExpert.addEventListener("click", () => {
      set.newGameExpert();
    });
});

/***/ }),

/***/ "./src/javascripts/game.js":
/*!*********************************!*\
  !*** ./src/javascripts/game.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/javascripts/board.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/javascripts/util.js");



class Game {
  constructor(ctx, canvas, difficulty) {
		this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, canvas, difficulty);
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
		canvas.addEventListener("click", Object(_util__WEBPACK_IMPORTED_MODULE_1__["throttle"])(e => {
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

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/javascripts/set.js":
/*!********************************!*\
  !*** ./src/javascripts/set.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/javascripts/game.js");


class Set {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.dimensions = { width: canvas.width, height: canvas.height };
  }

  newGameExpert() {
    if (this.game) {
      this.game.removeGameEventListeners(this.canvas);
    }
    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, this.canvas, 'expert');
    this.game.addGameEventListeners(this.canvas);

    // remove menu onClicks
  }

  newGameNovice() {
    if (this.game) {
      this.game.removeGameEventListeners(this.canvas);
    }
    this.game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, this.canvas, 'novice');
    this.game.addGameEventListeners(this.canvas);

    // remove menu onClicks
  }

  // menu stuff will go here later on
}

/* harmony default export */ __webpack_exports__["default"] = (Set);

/***/ }),

/***/ "./src/javascripts/util.js":
/*!*********************************!*\
  !*** ./src/javascripts/util.js ***!
  \*********************************/
/*! exports provided: throttle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments, context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map