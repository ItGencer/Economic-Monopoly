import { initDice } from "./dice.js";

let player = null;
let innerPath = [];
let position = 0;

/* 🔹 ІНІЦІАЛІЗАЦІЯ РУХУ ГРАВЦЯ */
export function initPlayerMove() {
  player = document.querySelector(".player-tokens");

  if (!player) {
    console.error("❌ Player not found");
    return;
  }

  const field = document.querySelector(".field-center");
  if (!field) {
    console.error("❌ Field center not found");
    return;
  }

  // 🔹 1. Будуємо шлях по колу
  const rawPath = buildInnerPath(field);

  // 🔹 2. Робимо start першою клітинкою
  innerPath = normalizePath(rawPath);

  // 🔹 DEBUG (можеш видалити пізніше)
  // console.log(
  //   "INNER PATH:",
  //   innerPath.map(c => c.dataset.type)
  // );

  // 🔹 3. Підключаємо кубик
  initDice(movePlayer);
}

/* 🔹 БУДУЄМО ШЛЯХ ПО КОЛУ */
function buildInnerPath(field) {
  const cells = [...field.querySelectorAll(".field__cell")];
  const fieldRect = field.getBoundingClientRect();

  const cx0 = fieldRect.left + fieldRect.width / 2;
  const cy0 = fieldRect.top + fieldRect.height / 2;

  return cells
    .map(cell => {
      const rect = cell.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const angle = Math.atan2(cy - cy0, cx - cx0);

      return { cell, angle };
    })
    .sort((a, b) => a.angle - b.angle)
    .map(item => item.cell);
}

/* 🔹 РОБИМО START ПЕРШИМ */
function normalizePath(path) {
  const startIndex = path.findIndex(
    cell => cell.dataset.type === "start"
  );

  if (startIndex === -1) {
    console.warn("⚠️ Start cell not found");
    return path;
  }

  return [
    ...path.slice(startIndex),
    ...path.slice(0, startIndex)
  ];
}

/* 🔹 РУХ ГРАВЦЯ */
export function movePlayer(steps) {
  if (!innerPath.length || !player) return;

  position = (position + steps) % innerPath.length;
  const cell = innerPath[position];

  const rect = cell.getBoundingClientRect();
  const boardRect = document
    .querySelector(".field-center")
    .getBoundingClientRect();

  // 🔹 Центруємо фішку в клітинці
  player.style.left =
    rect.left - boardRect.left + rect.width / 2 + "px";

  player.style.top =
    rect.top - boardRect.top + rect.height / 2 + "px";

  // console.log(
  //   `🎯 Player on: ${cell.dataset.type} (index ${position})`
  // );
}