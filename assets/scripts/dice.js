// ================================
// DICE MODULE
// ================================

let dice;
let buttonDice;


// 🔹 Основна функція

function rollDice() {
  if (!dice) return;

  dice.classList.add("rolling");
  dice.textContent = "";

  const result = getRandomDiceValue();

  setTimeout(() => {
    dice.classList.remove("rolling");
    dice.textContent = result;

    // 🔔 Подія для гри (дуже важливо)
    dice.dispatchEvent(
      new CustomEvent("diceRolled", {
        detail: { value: result }
      })
    );
  }, 800);

  return result;
}

// 🔹 Генерація числа 1–6
function getRandomDiceValue() {
  return Math.floor(Math.random() * 6) + 1;
}

export function initDice() {
  dice = document.getElementById("dice");
  buttonDice = document.getElementById("dice__button");

  if (!dice || !buttonDice) {
    console.warn("Dice elements not found");
    return;
  }

  buttonDice.addEventListener("click", rollDice);
}