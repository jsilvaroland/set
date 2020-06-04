import Set from './set';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("set-game");
  const set = new Set(canvas);
  // loads page with novice difficulty game
  set.newGameNovice();
  
  const newGameNovice = document.getElementById("new-game-novice");
  newGameNovice.addEventListener("click", () => {
    set.newGameNovice();
  });

  const newGameExpert = document.getElementById("new-game-expert");
  newGameExpert.addEventListener("click", () => {
    set.newGameExpert();
  });
});