import Game from './game';
import Board from './board';

class SetOnline {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.game = new Game();
        // this.board = new Board(this.ctx); // in the constructor for now, will switch to onClick function or something later
    }

    drawBoard() {
        this.board = new Board(this.ctx);
    }

    // some on click stuff. if newGame is clicked, make new Game AND CALL board = new Board() here

    
}

export default SetOnline;