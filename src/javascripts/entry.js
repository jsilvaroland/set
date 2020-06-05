import Set from './set';

document.addEventListener('DOMContentLoaded', () => {
  // Modal logic
  const modal = document.getElementById("instructions-modal");
  const modalPage2 = document.getElementsByClassName("modal-page-2")[0];
  const instructionsBtn = document.getElementById("instructions-btn");
  const closeModalXBtns = document.getElementsByClassName("close");
  const prevBtn = document.getElementsByClassName("prev")[0];
  const nextBtn = document.getElementsByClassName("next")[0];

  instructionsBtn.onclick = () => {
    modal.style.display = "block";
  };

  closeModalXBtns[0].onclick = () => {
    modal.style.display = "none";
    modalPage2.style.display = "none";
  };

  closeModalXBtns[1].onclick = () => {
    modal.style.display = "none";
    modalPage2.style.display = "none";
  };

  nextBtn.onclick = () => {
    modal.style.display = "none";
    modalPage2.style.display = "block";
  };

  prevBtn.onclick = () => {
    modal.style.display = "block";
    modalPage2.style.display = "none";
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