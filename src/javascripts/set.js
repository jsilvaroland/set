import Game from './game';
import { throttle } from "./util";

class Set {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.addGameEventListeners(this.canvas);
  }

  addGameEventListeners(canvas) {
    this.clickCallback = (e) => this.game.handleClick(e);
    this.event = canvas.addEventListener("click", this.clickCallback);

    this.mousedownCallback = (e) => this.game.handleMousedown(e);
    canvas.addEventListener("mousedown", this.mousedownCallback);

    this.mouseupCallback = (e) => this.game.handleMouseup(e);
  	canvas.addEventListener("mouseup", throttle(e => {
  		this.game.handleMouseup(e);
    }, 1000));

    this.unthrottledMouseupCallback = () => this.game.unthrottledHandleMouseup();
    canvas.addEventListener("mouseup", this.unthrottledMouseupCallback);
  }

  newGameExpert() {
    this.game = new Game(this.ctx, this.canvas, "expert");
  }

  newGameNovice() {
    this.game = new Game(this.ctx, this.canvas, "novice");
  }
}

export default Set;