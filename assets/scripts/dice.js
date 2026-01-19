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
   return new Promise(resolve => {
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

    // ⏳ чекаємо завершення анімації
    setTimeout(() => {
      rollButton.disabled = false;
      rollButton.textContent = "Roll Dice";
      resolve(value); // 🔥 ПОВЕРТАЄМО ЗНАЧЕННЯ ПІСЛЯ АНІМАЦІЇ
    }, 2000);
  });
}

export function initDice(movePlayerCallback) {
  const rollButton = document.getElementById("roll-button");
  if (!rollButton) {
    console.warn("roll-button not found");
    return;
  }

  rollButton.addEventListener("click", async() => {
    const diceValue = await rollDice();

    if (diceValue && movePlayerCallback) {
      movePlayerCallback(diceValue);
    }
  });
}