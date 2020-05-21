import Game from './game';

class Set {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.dimensions = { width: canvas.width, height: canvas.height };
    }

    newGame() {
        console.log('clearing prev game event listeners');
        if (this.game) {
            this.game.removeGameEventListeners(this.canvas);
            console.log('hi');
        }
        this.game = new Game(this.ctx, this.canvas);
        this.game.addGameEventListeners(this.canvas);
        
        // remove menu onClicks
        // set up game click listeners
    }
    

    // have onClick canvas logic here? if so,

    // menu stuff will go here later on
    
}

export default Set;