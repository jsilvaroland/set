import Set from './set';

//testing 
// end testing

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("set-game");
    const set = new Set(canvas);
    
    const newGameNovice = document.getElementById("new-game-novice");
    newGameNovice.addEventListener("click", () => {
      set.newGameNovice();
    });

    const newGameExpert = document.getElementById("new-game-expert");
    newGameExpert.addEventListener("click", () => {
      set.newGameExpert();
    });
});

// document.addEventListener('click', () => {
//     const newGame = document.getElementById("new-game");
//     console.log('hello');
// });
