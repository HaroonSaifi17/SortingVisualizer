import "./style.css";
import { initializeScreen, changeSpeed, reset } from "./core";
import bubbleSort from "./bubble-sort";

initializeScreen();

function changeSize($event) {
  length = $event.target.value;
  initializeScreen(length);
}

const sizeRange = document.querySelector("#sizeRange");
sizeRange.addEventListener("input", changeSize);

const bubbleSortButton = document.querySelector("#bubble-sort");
bubbleSortButton.addEventListener("click", () => bubbleSort());

const speedRange = document.querySelector("#speedRange");
speedRange.addEventListener("input", changeSpeed);

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", reset);
