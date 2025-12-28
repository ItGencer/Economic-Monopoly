const cellTypes = {
  ads: {
    title: "ADS",
    folder: "Outer circle",
    image: "ADS.png"
  },
  casino1x1: {
    folder: "Outer circle",
    image: "Casino 1х1.png"
  },
  casino1x15: {
    folder: "Inner circle",
    image: "Casino 1х1,5.png"
  },
  client: {
    title: "Client",
    folder: "Outer circle",
    image: "Client.png"
  },
  cleaning: {
    title: "Clining",
    folder: "Companies",
    image: "Clining.png"
  },
  deal: {
    title: "Deal",
    folder: "Inner circle",
    image: "Deal 1х1,5.png"
  },
  director: {
    title: "Director",
    folder: "Outer circle",
    image: "Director.png"
  },
  factoryAero: {
    title: "Aerofactory",
    folder: "Companies",
    image: "Aerofactory.png"
  },
  factoryBuilding: {
    title: "Building",
    folder: "Companies",
    image: "Building.png"
  },
  factoryTV: {
    title: "TV Factory",
    folder: "Companies",
    image: "TV_factory.png"
  },
  imege1x1: {
    title: "Imege",
    folder: "Outer circle",
    image: "Imege 1х1.png"
  },
  imege1x15: {
    title: "Imege",
    folder: "Inner circle",
    image: "Imege 1х1,5.png"
  },
  negativeReputation1x1: {
    title: "Reputation",
    folder: "Outer circle",
    image: "DiZLike 1х1.png"
  },
  negativeReputation1x15: {
    title: "Reputation",
    folder: "Inner circle",
    image: "DiZLike 1х1,5.png"
  },
  positiveReputation: {
    title: "Reputation",
    folder: "Outer circle",
    image: "Like.png"
  },
  radioStudio: {
    title: "Radio Studio",
    folder: "Companies",
    image: "Radio_Studio.png"
  },
  random: {
    title: "Random",
    folder: "Outer circle",
    image: "Random 1x1.png"
  },
  salary1x1: {
    title: "Salary",
    folder: "Outer circle",
    image: "Salary 1х1.png"
  },
  salary1x15: {
    title: "Salary",
    folder: "Inner circle",
    image: "Salary 1х1,5.png"
  },
  start: {
    title: "Start"
  },
  tax: {
    title: "Tax",
    folder: "Outer circle",
    image: "Tax.png"
  },
  tenderBrazil: {
    title: "Brazil",
    folder: "Tender",
    image: "Brazil.jpg"
  },
  tenderFrance: {
    title: "France",
    folder: "Tender",
    image: "France.jpg"
  },
  tenderGermany: {
    title: "Germany",
    folder: "Tender",
    image: "Germany.jpg"
  },
  tenderItaly: {
    title: "Italy",
    folder: "Tender",
    image: "Italy.jpg"
  },
  tenderMexico: {
    title: "Mexico",
    folder: "Tender",
    image: "Mexico.jpg"
  },
  tenderUkraine: {
    title: "Ukraine",
    folder: "Tender",
    image: "Ukraine.jpg"
  },
  travelAgency: {
    title: "Travel Agency",
    folder: "Companies",
    image: "Travel_Agency.jpg"
  },
  vacation: {
    title: "Vacation",
    folder: "Outer circle",
    image: "Vacation 1х1.png"
  }
  
};

const outerRing = [
  "imege1x1",
  "tax",
  "negativeReputation1x1",
  "ads",
  "casino1x1",
  "imege1x1",
  "salary1x1",
  "tax",
  "vacation",
  "client",
  "random",
  "director",
  "factoryTV",

  "director",
  "imege1x1",
  "tenderGermany",
  "casino1x1",
  "random",
  "tenderUkraine",
  "factoryAero",
  "factoryBuilding",
  "salary1x1",
  "random",
  "tenderMexico",
  "ads",
  "client",
  "tenderItaly",

  "positiveReputation",
  "travelAgency",
  "negativeReputation1x1",
  "tenderFrance",
  "imege1x1",
  "client",
  "cleaning",
  "random",
  "tenderBrazil",
  "salary1x1",
  "radioStudio",
  "tax",
  "client"
];

const innerRing = [
  "start",
  "deal",
  "imege1x15",
  "casino1x15",
  "deal",
  "deal",
  "deal",
  "random",
  "casino1x15",
  "vacation",
  "deal",
  "imege1x15",
  "salary1x15",
  "random",
  "deal",
  "imege1x15",
  "vacation",
  "negativeReputation1x15"
];

function renderCells(container, layout, typeMap) {
  layout.forEach(typeKey => {
    const data = typeMap[typeKey];
    if (!data) return;

    const cell = document.createElement("div");
    cell.className = `field__cell field__cell__${typeKey}`;
    cell.dataset.type = typeKey;

    const h1 = document.createElement("h1");
    h1.textContent = data.title;
    h1.className = `field__cell field__cell__${typeKey}__title`;
    cell.append(h1);

    if (data.image !== undefined)
      {
      const img = document.createElement("img");
      img.src = `assets/materials/${data.folder}/${data.image}`;
      img.alt = data.title!==undefined ? data.title : typeKey;
      img.className = `field__cell field__cell__${typeKey}__img`;
      cell.append(img);
    }

    container.appendChild(cell);
  });
}

renderCells(
  document.querySelector(".field"),
  outerRing,
  cellTypes
);

renderCells(
  document.querySelector(".field-center"),
  innerRing,
  cellTypes
);
