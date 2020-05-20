import Set from './set';

//testing 
// end testing

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("set-game");
    const set = new Set(canvas); // change this to new Set (from future set.js), later only create new Game when new game button inside menu is clicked
    
    const newGame = document.getElementById("new-game");
    newGame.addEventListener("click", () => {
      set.drawBoard();
    });
});

// document.addEventListener('click', () => {
//     const newGame = document.getElementById("new-game");
//     console.log('hello');
// });
