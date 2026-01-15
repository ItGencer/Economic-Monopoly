import { players } from './player.js';
const playerData = players[0];

// Populate Player Info Items & Tables
const companies = [
    { id: 1, value: "Aerofactory" },
    { id: 2, value: "Building" },
    { id: 4, value: "Clining" },
    { id: 3, value: "Radio Studio" },
    { id: 5, value: "Travel Agency" },
    { id: 6, value: "TV factory" },
]

let playerName = document.querySelector('.player-panel__info__name');
playerName.textContent += playerData.name;
document.querySelectorAll('.player-panel__info__item').forEach(el => {
    const span = document.createElement('span');
    let value;
    
    span.textContent = el.dataset.title;
    el.append(span);
    
    if (el.dataset.title === 'Money: '){
        value = `${playerData.money} $`;
    }
    else{
        value = el.dataset.value || 0;
    }

    el.append(value);
});

function creatTerms(params) {
    for (let i = 0; i < params; i++) {
        const tr = document.createElement('tr');
        document.querySelector("tbody").append(tr);
    }
}
creatTerms(companies.length);

function createElementiInTbody() {
    document.querySelector("tbody").querySelectorAll("tr").forEach(el => {
        const companiesTitle = document.createElement('td');
        const companiesShares = document.createElement('td');

        companiesTitle.textContent = companies[el.rowIndex - 1]?.value || '';

        playerData.shares.forEach( share => {
            if (share.companyId == companies[el.rowIndex - 1]?.id) {
                el.dataset.shares = share.percentage;
            }
        });
        let shareValue =  el.dataset.shares || '0'
        companiesShares.textContent = `${shareValue} %`;
        
        el.append(companiesTitle);
        el.append(companiesShares);
    });
}

export function initPlayerPanel() {
    createElementiInTbody();
}