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
		this.deck = new _deck__WEBPACK_IMPORTED_MODULE_0__["default"]();
		this.resetCanvas();
		this.initialDisplayCards();
		console.log('board constructed');
	}
	
	resetCanvas() {
		this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
	}

	highlight(card) {
		const { ctx } = this;
		const { x, y } = card.pos;

		ctx.clearRect(x-3, y-3, 197 + 3, 137 + 3); // clears area first
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

		ctx.clearRect(x-3, y-3, 197 + 3, 137 + 3);
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

		this.board.push({ pos, card });

		
		card.image.onload = () => {
			this.drawCardImage(card, pos);
		};
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
}

/* harmony default export */ __webpack_exports__["default"] = (Board);

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
        this.highlighted = false;
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
	constructor() {
		// this.deck = [];
		this.resetDeckExpert(); // for now deck will be made in constructor, once novice mode is introduced, resetDeck will be removed from constructor and will have to be called depending on button push
	}

	repopulateDeckNovice() {
	// empties deck if not already empty
		this.deck = [];

		ATTRIBUTES.colors.forEach(color => {
			ATTRIBUTES.numbers.forEach(number => {
				ATTRIBUTES.shapes.forEach(shape => {
					this.deck.push({ color, number, shape, shading: 'solid' });
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


//testing 
// end testing

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("set-game");
    const set = new _set__WEBPACK_IMPORTED_MODULE_0__["default"](canvas); // change this to new Set (from future set.js), later only create new Game when new game button inside menu is clicked
    
    const newGame = document.getElementById("new-game");
    newGame.addEventListener("click", () => {
      set.newGame();
    });
});

// document.addEventListener('click', () => {
//     const newGame = document.getElementById("new-game");
//     console.log('hello');
// });


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


class Game {
	constructor(ctx, canvas) {
		this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, canvas);
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
		const clickedCard = this.findClickedCard(clickPos);

		if (clickedCard) {
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
			console.log('check if set');
			// check to see if the 3 clicked cards make a set
		}
	}

	increaseTimer() {
		// increases timer, likely will call within newGame
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

    newGame() {
        if (this.game) {
            console.log('clearing prev game event listeners');
            this.game.removeGameEventListeners(this.canvas);
        }
        this.game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, this.canvas);
        this.game.addGameEventListeners(this.canvas);
        
        // remove menu onClicks
    }
    

    // menu stuff will go here later on
    
}

/* harmony default export */ __webpack_exports__["default"] = (Set);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map