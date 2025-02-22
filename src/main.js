import "./style.css";
import { visualizer } from "./utils/visualizer.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { insertionSort } from "./algorithms/insertionSort.js";
import { quickSort } from "./algorithms/quickSort.js";
import { mergeSort } from "./algorithms/mergeSort.js";
import { heapSort } from "./algorithms/heapSort.js";
import { selectionSort } from "./algorithms/selectionSort.js";
import { shellSort } from "./algorithms/shellSort.js";

visualizer.initialize("container");

document.getElementById("sizeRange").addEventListener("input", (e) => {
  visualizer.updateSize(parseInt(e.target.value));
});

document.getElementById("speedRange").addEventListener("input", (e) => {
  visualizer.updateSpeed(parseFloat(e.target.value));
});

document.getElementById("reset").addEventListener("click", () => {
  visualizer.reset();
});

const sortingAlgorithms = {
  "bubble-sort": bubbleSort,
  "insertion-sort": insertionSort,
  "quick-sort": quickSort,
  "merge-sort": mergeSort,
  "heap-sort": heapSort,
  "selection-sort": selectionSort,
  "shell-sort": shellSort,
};

Object.entries(sortingAlgorithms).forEach(([id, algorithm]) => {
  document.getElementById(id).addEventListener("click", algorithm);
});
