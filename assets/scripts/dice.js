let pushBut = false;

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice() {
  pushBut = !pushBut;
  let rollbutton = document.getElementById("roll-button")
  const dice = [...document.querySelectorAll(".die-list")];
  
  if (pushBut) {
    dice.forEach(die => {
      toggleClasses(die);
      die.dataset.roll = getRandomNumber(1, 6);
    });

    rollbutton.textContent = "Waiting...";
    rollbutton.disabled = true;
    setTimeout(() => {
      rollbutton.disabled = false;
      rollbutton.textContent = "Roll Dice";
    }, 2000);
    pushBut = !pushBut;
  }
}


export function initDice(){
  document.getElementById("roll-button").addEventListener("click", rollDice);
}