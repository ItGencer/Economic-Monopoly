import { initField } from "./field.js";
import { initPlayerPanel } from "./player-panel.js";
import { initPlayers } from "./player.js";
import { initDice } from "./dice.js";

await initField();
initPlayerPanel();
initPlayers();
initDice();

// Toggle Player Panel

let statePanel = false;
const menuButton = document.querySelector('.menu-button');
menuButton.addEventListener('click', () => {
    const panel = document.querySelector('.player-panel');
    
    if (statePanel) {
        panel.style.display = 'none';
        statePanel = !statePanel;
        menuButton.src = 'assets/materials/menu-open.png';
    } else {
        panel.style.display = 'block';
        statePanel = !statePanel;
        menuButton.src = 'assets/materials/menu-close.png';
    }
});
