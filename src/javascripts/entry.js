import Set from './set';

document.addEventListener('DOMContentLoaded', () => {
  // Modal logic
  const modal = document.getElementById("instructions-modal");
  const modalPage2 = document.getElementById("instructions-modal-page-2");
  const instructionsBtn = document.getElementById("instructions-btn");
  const closeModalX = document.getElementsByClassName("close")[0];
  const modalNext = document.getElementsByClassName("next")[0];

  instructionsBtn.onclick = () => {
    modal.style.display = "block";
  };

  closeModalX.onclick = () => {
    modal.style.display = "none";
    modalPage2.style.display = "none";
  };

  modalNext.onclick = () => {
    modal.style.display = "none";
    modalPage2.style.display = "block";
  };

  window.onclick = (e) => {
    if (e.target == modal || e.target == modalPage2) {
      modal.style.display = "none";
      modalPage2.style.display = "none";
    }
  };

  // Canvas
  const canvas = document.getElementById("set-game");
  const set = new Set(canvas);
  
  set.newGameNovice(); // loads page with novice difficulty game
  
  const newGameNovice = document.getElementById("new-game-novice");
  newGameNovice.addEventListener("click", () => {
    set.newGameNovice();
  });

  const newGameExpert = document.getElementById("new-game-expert");
  newGameExpert.addEventListener("click", () => {
    set.newGameExpert();
  });
});