import { initDice } from "./dice.js";
import { players } from "./player.js";

let innerPath = [];
let activePlayerIndex = 0;

function getTokenOffset(index) {
  const spacing = 12;

  const positions = [
    { x: 0, y: 0 },
    { x: spacing, y: 0 },
    { x: 0, y: spacing },
    { x: spacing, y: spacing },
    { x: spacing * 2, y: 0 },
    { x: spacing * 2, y: spacing }
  ];
  
  return positions[index] || { x: 0, y: 0 };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* 🔹 РУХ АКТИВНОГО ГРАВЦЯ */
function movePlayerToken(player) {
  const cell = innerPath[player.positionIndex];
  const rect = cell.getBoundingClientRect();
  const boardRect = document
    .querySelector(".field-center")
    .getBoundingClientRect();

  const playersOnCell = players.filter(
    item => item.positionIndex === player.positionIndex
  );

  const indexInCell = playersOnCell.indexOf(player);
  const offset = getTokenOffset(indexInCell);

  const token = player.token;

  // 🔹 плавність
  token.style.transition = "left 0.3s linear, top 0.3s linear";

  token.style.left =
    rect.left - boardRect.left +
    rect.width / 2 -
    token.offsetWidth / 2 +
    offset.x +
    "px";

  token.style.top =
    rect.top - boardRect.top +
    rect.height / 2 -
    token.offsetHeight / 2 +
    offset.y +
    "px";
}

async function movePlayerSmooth(steps) {
  const player = players[activePlayerIndex];

  for (let i = 0; i < steps; i++) {
    player.positionIndex =
      (player.positionIndex + 1) % innerPath.length;

    movePlayerToken(player);
    await sleep(300); // ⏱ швидкість руху
  }
}

function updateTurnUI() {
  const el = document.querySelector('.center-new__name-player');
  if (!el) return;

  el.textContent = `Move: ${players[activePlayerIndex].name}`;
}

/* 🔹 НАСТУПНИЙ ГРАВЕЦЬ */
function nextTurn() {
  activePlayerIndex =
    (activePlayerIndex + 1) % players.length;
    
  updateTurnUI();
  // console.log(
  //   `➡️ Next turn: ${players[activePlayerIndex].name}`
  // );
}

/* 🔹 PATH HELPERS */
function buildInnerPath(field) {
  const cells = [...field.querySelectorAll(".field__cell")];
  const rect = field.getBoundingClientRect();
  const cx0 = rect.left + rect.width / 2;
  const cy0 = rect.top + rect.height / 2;

  return cells
    .map(cell => {
      const r = cell.getBoundingClientRect();
      return {
        cell,
        angle: Math.atan2(
          r.top + r.height / 2 - cy0,
          r.left + r.width / 2 - cx0
        )
      };
    })
    .sort((a, b) => a.angle - b.angle)
    .map(o => o.cell);
}

function normalizePath(path) {
  const i = path.findIndex(c => c.dataset.type === "start");
  return i === -1
    ? path
    : [...path.slice(i), ...path.slice(0, i)];
}


/* 🔹 ІНІЦІАЛІЗАЦІЯ */
export function initPlayerMove() {
  const field = document.querySelector(".field-center");
  if (!field) return;

  innerPath = normalizePath(buildInnerPath(field));

  // 🔹 показати першого гравця ОДРАЗУ
  updateTurnUI();
  let isMoving = false;

  initDice(async steps => {
    if (isMoving) return;
    isMoving = true;

    await movePlayerSmooth(steps); // 🚶 плавний рух
    nextTurn();                    // ⏭ наступний гравець

    isMoving = false;
  });
}