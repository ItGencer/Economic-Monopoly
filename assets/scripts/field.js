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
  image: {
    title: "Image",
    folder: "Outer circle",
    image: "Image 1х1.png"
  },
  negativeReputation1x1: {
    title: "Negative Reputation",
    folder: "Outer circle",
    image: "DiZLike 1х1.png"
  },
  negativeReputation1x15: {
    title: "Negative Reputation",
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
  "image",
  "tax",
  "negativeReputation1x1",
  "ads",
  "casino1x1",
  "image",
  "salary1x1",
  "tax",
  "vacation",
  "client",
  "random",
  "director",
  "factoryTV",

  "director",
  "image",
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
  "image",
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
  "image",
  "casino1x15",
  "deal",
  "deal",
  "deal",
  "random",
  "casino1x15",
  "vacation",
  "deal",
  "image",
  "salary1x15",
  "random",
  "deal",
  "image",
  "vacation",
  "negativeReputation1x15"
];
  
function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1))
    .join("");
}

function getCellClass({ folder, title }, typeKey) {
  if (typeKey === "casino1x1" || typeKey === "casino1x15") {
    return "field__cell field__cell__casino";
  }

  const folderMap = {
    Tender: "tender",
    Companies: "factory"
  };

  const suffix = folderMap[folder] ?? toCamelCase(title ?? typeKey);
  return `field__cell field__cell__${suffix}`;
}

function renderCells(container, layout, typeMap) {
  const fragment = document.createDocumentFragment();

  layout.forEach(typeKey => {
    const data = typeMap[typeKey];
    if (!data) return;

    const cell = document.createElement("div");
    cell.className = getCellClass(data, typeKey);
    cell.dataset.type = typeKey;

    addCell({
      ...data,
      typeKey,
      block: cell
    });

    fragment.appendChild(cell);
  });

  container.appendChild(fragment);
}

function addCell({ title, image, folder, typeKey, block }) {
  if (title) {
    const h1 = document.createElement("h1");
    h1.textContent = title;
    h1.id = title === "Start" ? "start" : "";
    h1.className = title === "Start" ? "" : "field__cell__title";
    block.appendChild(h1);
  }

  if (image && folder) {
    const img = document.createElement("img");
    img.src = `assets/materials/${folder}/${image}`;
    img.alt = title || typeKey;
    img.className = "field__cell__img";
    block.appendChild(img);
  }
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

