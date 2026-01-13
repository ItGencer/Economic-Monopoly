// ================================
// PLAYER CONFIG
// ================================

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 6;

// 🔹 Дані гравців
export const players = [
  {
    id: 0,
    name: "Player 1",
    color: "#e74c3c",
    money: 3000,
    position: "start"
  },
  {
    id: 1,
    name: "Player 2",
    color: "#3498db",
    money: 3000,
    position: "start"
  }
  // ➕ можна додати до 6
];

// ================================
// VALIDATION
// ================================

function validatePlayers() {
  if (players.length < MIN_PLAYERS || players.length > MAX_PLAYERS) {
    throw new Error(
      `Players count must be between ${MIN_PLAYERS} and ${MAX_PLAYERS}`
    );
  }
}

// ================================
// FIELD HELPERS
// ================================

function getStartCell() {
  return document.querySelector('.field__cell[data-type="start"]');
}

// ================================
// TOKENS
// ================================

function createPlayerToken(player) {
  const token = document.createElement("div");
  token.className = "player-token";
  token.dataset.playerId = player.id;
  token.title = player.name;
  token.style.backgroundColor = player.color;
  return token;
}

function placePlayersOnStart() {
  const startCell = getStartCell();
  if (!startCell) {
    console.warn("Start cell not found");
    return;
  }

  let tokensContainer = startCell.querySelector(".player-tokens");

  if (!tokensContainer) {
    tokensContainer = document.createElement("div");
    tokensContainer.className = "player-tokens";
    startCell.appendChild(tokensContainer);
  }

  players.forEach(player => {
    const token = createPlayerToken(player);
    tokensContainer.appendChild(token);
  });
}

// ================================
// FUTURE API (for next steps)
// ================================

// 🔜 movePlayer(playerId, steps)
// 🔜 setActivePlayer(playerId)
// 🔜 updatePlayerPanel(playerId)

// ================================
// INIT
// ================================

export function initPlayers() {
  validatePlayers();
  placePlayersOnStart();
}
