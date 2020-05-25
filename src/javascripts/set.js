import Game from './game';

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
    this.game = new Game(this.ctx, this.canvas, 'expert');
    this.game.addGameEventListeners(this.canvas);

    // remove menu onClicks
  }

  newGameNovice() {
    if (this.game) {
      this.game.removeGameEventListeners(this.canvas);
    }
    this.game = new Game(this.ctx, this.canvas, 'novice');
    this.game.addGameEventListeners(this.canvas);

    // remove menu onClicks
  }

  // menu stuff will go here later on
}

export default Set;