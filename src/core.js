let array = [];
let speed = 5;
const container = document.querySelector("#container");

function initializeScreen(length = 50) {
  container.innerHTML = "";
  for (let i = array.length; i < length; i++) {
    array.push(Math.floor(Math.random() * (80 - 10 + 1)) + 1);
  }
  if (array.length > length) {
    array = array.slice(0, length);
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
    }, speed);
  });
  await promise;
}

function reset() {
  array = [];
  initializeScreen();
}

function changeSpeed($event) {
  speed = 200 - (0.1 + (199.9 / 5000) * $event.target.value);
  console.log(speed);
}

function updateUI(i, j) {
  container.children[i].style.height = array[j] + "vh";
  container.children[j].style.height = array[i] + "vh";
}

const defaultColor = "#4C566A";
const compareColor = "#5E81AC";
const swapColor = "#BF616A";
const sortedColor = "#A3BE8C";

export {
  array,
  initializeScreen,
  delay,
  updateUI,
  container,
  defaultColor,
  compareColor,
  swapColor,
  sortedColor,
  changeSpeed,
  reset
};
