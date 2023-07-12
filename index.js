let colorOne = document.getElementById("color-1");
let colorTwo = document.getElementById("color-2");
let currentDirection = 'to bottom';
let outputCode = document.getElementById("code");
let addColorBtn = document.getElementById("addColorBtn");
let colorInputs = document.getElementById("colorInputs");
let colors = [colorOne.value, colorTwo.value];

addColorBtn.addEventListener("click", addColorInput);
colorOne.addEventListener("input", updateGradient);
colorTwo.addEventListener("input", updateGradient);

function setDirection(value, _this) {
  let directions = document.querySelectorAll(".buttons button");
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
  document.getElementsByTagName("BODY")[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${gradientColors.join(", ")})`;
}

function addColorInput() {
  let newColorInput = document.createElement("input");
  newColorInput.type = "color";
  newColorInput.addEventListener("input", updateGradient);

  let removeColorBtn = document.createElement("button");
  removeColorBtn.innerHTML = "Delete";
  removeColorBtn.addEventListener("click", function() {
    removeColorInput(newColorInput);
  });

  let colorInputContainer = document.createElement("div");
  colorInputContainer.appendChild(newColorInput);
  colorInputContainer.appendChild(removeColorBtn);

  colorInputs.appendChild(colorInputContainer);
  colors.push(newColorInput.value);
  updateGradient();
}

function removeColorInput(inputElement) {
  if (colorInputs.childElementCount <= 2) {
    alert("Debes mantener al menos 2 colores");
    return;
  }

  let colorInputContainer = inputElement.parentNode;
  let index = Array.from(colorInputContainer.parentNode.children).indexOf(colorInputContainer);
  colors.splice(index, 1);
  colorInputs.removeChild(colorInputContainer);
  updateGradient();
}

updateGradient();