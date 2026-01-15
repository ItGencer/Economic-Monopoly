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
  let rollButton = document.getElementById("roll-button");
  let value = 0;
  const dice = [...document.querySelectorAll(".die-list")];

  dice.forEach(die => {
    toggleClasses(die);
    die.dataset.roll = getRandomNumber(1, 6);
    value = parseInt(die.dataset.roll);
  });

  rollButton.textContent = "Waiting...";
  rollButton.disabled = true;
  setTimeout(() => {
    rollButton.disabled = false;
    rollButton.textContent = "Roll Dice";
  }, 2000);

  return value;
}

export function initDice(movePlayerCallback) {
  const rollButton = document.getElementById("roll-button");
  if (!rollButton) {
    console.warn("roll-button not found");
    return;
  }

  rollButton.addEventListener("click", () => {
    const diceValue = rollDice();

    if (diceValue && movePlayerCallback) {
      movePlayerCallback(diceValue);
    }
  });
}