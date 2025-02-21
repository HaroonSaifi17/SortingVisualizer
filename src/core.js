let array = [];
const container = document.querySelector("#container");
const length = 50;

function initializeScreen() {
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * (80 - 10 + 1)) + 10);
  }
  array.forEach((item) => {
    const element = document.createElement("div");
    element.style.height = item + "vh";
    element.style.width = 80 / length + "vw";
    container.appendChild(element);
  });
}

async function delay() {
  const promise = new Promise((resolve, _reject) => {
    setTimeout(() => {
      return resolve();
    }, 5);
  });
  await promise;
}

function updateUI(i, j) {
  container.children[i].style.height = array[j] + "vh";
  container.children[j].style.height = array[i] + "vh";
}

const defaultColor = "#4C566A";
const compareColor = "#5E81AC";
const swapColor = "#BF616A";
const sortedColor = "#A3BE8C";

export { array, initializeScreen, delay, updateUI, container, defaultColor, compareColor, swapColor, sortedColor };
