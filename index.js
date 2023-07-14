let colorOne = document.getElementById("color-1");
let colorTwo = document.getElementById("color-2");
let currentDirection = 'to bottom';
let outputCode = document.getElementById("code");
let addColorBtn = document.getElementById("addColorBtn");
let colorInputs = document.getElementById("colorInputs");
let colors = [colorOne.value, colorTwo.value];
let randomColorBtn = document.getElementById("randomColorBtn");
let selectPaletteBtn = document.getElementById("selectPaletteBtn");
let paletteContainer = document.getElementById("paletteContainer");

addColorBtn.addEventListener("click", addColorInput);
colorOne.addEventListener("input", updateGradient);
colorTwo.addEventListener("input", updateGradient);
document.getElementById("copy").addEventListener("click", copyText);
randomColorBtn.addEventListener("click", generateRandomColor);

selectPalette();

function setDirection(value, _this) {
  let directions = document.querySelectorAll(".arrowsButtons button");
  for (let i of directions) {
    i.classList.remove("active");
  }
  _this.classList.add("active");
  currentDirection = value;
  updateGradient();
}

function updateGradient() {
  let gradientColors = Array.from(colorInputs.getElementsByTagName("input")).map(input => input.value);
  outputCode.value = `background-image: linear-gradient(${currentDirection}, ${gradientColors.join(", ")})`;
  document.body.style.backgroundImage = `linear-gradient(${currentDirection}, ${gradientColors.join(", ")})`;
}

function addColorInput() {
  let newColorInput = document.createElement("div");
  newColorInput.className = "color-input";

  let input = document.createElement("input");
  input.type = "color";
  input.addEventListener("input", updateGradient);

  let removeColorBtn = document.createElement("button");
  removeColorBtn.innerHTML = "X";
  removeColorBtn.className = "remove-color-btn";
  removeColorBtn.addEventListener("click", function() {
    removeColorInput(newColorInput);
  });

  newColorInput.appendChild(input);
  newColorInput.appendChild(removeColorBtn);
  colorInputs.appendChild(newColorInput);
  colors.push(input.value);
  updateGradient();

  colorInputs.style.display = "flex";
  colorInputs.style.alignItems = "center";
  colorInputs.style.gap = "10px";
}

function removeColorInput(colorInput) {
  if (colorInputs.childElementCount <= 2) {
    alert("Debes mantener al menos 2 colores");
    return;
  }

  let input = colorInput.querySelector("input");
  let index = Array.from(colorInputs.children).indexOf(colorInput);
  colors.splice(index, 1);
  colorInputs.removeChild(colorInput);
  updateGradient();
}

function copyText() {
  let codeTextarea = document.getElementById("code");
  codeTextarea.select();
  codeTextarea.setSelectionRange(0, 99999);
  document.execCommand("copy");

  copyMessage.style.display = "inline";
  setTimeout(function() {
    copyMessage.style.display = "none";
  }, 2000);
}

function generateRandomColor() {
  let colorInputs = document.querySelectorAll("#colorInputs input");
  colorInputs.forEach(input => {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    input.value = "#" + randomColor;
  });
  updateGradient();
}


//PALETTES COLORS DIV1
function selectPalette() {
  const predefinedPalettes = [
    ['#1baf92', '#a55df8'],
    ['#e388ca', '#4f72c9'],
    ['#e0dd65', '#e767ba'],
    ['#daf7d9', '#81484b'],    
    ['#e73d92', '#9fa353'],

    ['#19bc99', '#bdf36d'],
    ['#29e55c', '#137795'],
    ['#17e8e5', '#45c981'],
    ['#4372a0', '#2edcb5'],
    ['#8dbdd1', '#482dba'],

    ['#31104e', '#9dfdd0'],    
    ['#43d1b0', '#911e58'],    
    ['#24099a', '#a622e9'],    
    ['#8988eb', '#000000'],    
    ['#000000', '#461ff8'],    
  ];

  paletteContainer.innerHTML = "";
  let paletteRow;
  predefinedPalettes.forEach((palette, index) => {
    if (index % 5 === 0) {
      paletteRow = document.createElement("div");
      paletteRow.className = "palette-row";
      paletteContainer.appendChild(paletteRow);
    }
    
    let paletteDiv = document.createElement("div");
    paletteDiv.className = "palette";
    paletteDiv.style.background = `linear-gradient(to bottom, ${palette.join(", ")})`;

    paletteDiv.addEventListener("click", function() {
      applyPalette(palette);
      selectPalette(paletteDiv);
    });

    paletteRow.appendChild(paletteDiv);
  });
}

function applyPalette(palette) {
  colorOne.value = palette[0];
  colorTwo.value = palette[1];
  updateGradient();
}

updateGradient();