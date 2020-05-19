import Game from './game';

//testing 
// end testing

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("set-game");
    const game = new Game(canvas); // change this to new Set (from future set.js), later only create new Game when new game button inside menu is clicked
});