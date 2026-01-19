class Player {
  constructor({
    id,
    name,
    color,
    money = 10000,
    position = "start",

    shares = [
      { companyId: 1, percentage: 0 },
      { companyId: 2, percentage: 0 },
      { companyId: 3, percentage: 0 },
      { companyId: 4, percentage: 0 },
      { companyId: 5, percentage: 0 },
      { companyId: 6, percentage: 0 }
    ]
  }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.money = money;
    this.position = position;
    this.shares = shares;
    this.positionIndex = 0; // 🔹 індекс у innerPath
    this.token = null; 
  }

  addMoney(amount) {
    this.money += amount;
  }

  removeMoney(amount) {
    this.money = Math.max(0, this.money - amount);
  }

  setPosition(position) {
    this.position = position;
  }

  updateShares(companyId, percentage) {
    const share = this.shares.find(item => item.companyId === companyId);
    if (share) {
      share.percentage = percentage;
    } else {
      this.shares.push({ companyId, percentage });
    }
  }
}

const MIN_PLAYERS = 1;
const MAX_PLAYERS = 6;

let players = [
  new Player({ id: 1, name: "Alice", color: "#ff0000"}),
  new Player({ id: 2, name: "Bob", color: "#00ff00"}),
  new Player({ id: 3, name: "Charlie", color: "#0000ff"}),
];

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
  player.token = token; // 🔥 ключовий зв’язок
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
    if(player.position == "start"){
      const token = createPlayerToken(player);
      tokensContainer.appendChild(token);
    }
    else{
      console.log("Player not on start:", player);
    }
  });
}

export function initPlayers() {
  validatePlayers();
  placePlayersOnStart();
}

export { players };