let cellTypes;
let outerRing;
let innerRing;

async function loadFieldData() {
  const res = await fetch("field-data.json");
  const data = await res.json();

  cellTypes = data.cellTypes;
  outerRing = data.outerRing;
  innerRing = data.innerRing;
}

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

export async function initField() {
  await loadFieldData();
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
}