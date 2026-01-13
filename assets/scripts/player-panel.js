// Populate Player Info Items & Tables
const companies = [
    { id: 1, value: "Aerofactory" },
    { id: 2, value: "Building" },
    { id: 4, value: "Clining" },
    { id: 3, value: "Radio Studio" },
    { id: 5, value: "Travel Agency" },
    { id: 6, value: "TV factory" },
]

document.querySelectorAll('.player-panel__info__item').forEach(el => {
    const span = document.createElement('span');
    span.textContent = el.dataset.title;
    el.textContent = el.dataset.value || '0';
    el.prepend(span);
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
        
        el.dataset.id = companies[el.rowIndex - 1]?.id || 0;
        companiesTitle.textContent = companies[el.rowIndex - 1]?.value || '';
        companiesShares.textContent = el.dataset.shares || '0';
        el.append(companiesTitle);
        el.append(companiesShares);
    });
}

export function initPlayerPanel() {
    createElementiInTbody();
}