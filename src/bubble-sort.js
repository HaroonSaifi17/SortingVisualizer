import {
  delay,
  updateUI,
  container,
  defaultColor,
  compareColor,
  swapColor,
  sortedColor,
} from "./core";
import { array } from "./core";

let hasRun = false;

export default async function bubbleSort() {
  if (hasRun) return;
  hasRun = true;
  const n = array.length;
  try {
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        container.children[j].style.backgroundColor = compareColor;
        container.children[j + 1].style.backgroundColor = compareColor;
        await delay();
        if (array[j] > array[j + 1]) {
          updateUI(j, j + 1);
          container.children[j].style.backgroundColor = swapColor;
          container.children[j + 1].style.backgroundColor = swapColor;
          await delay();
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;
          await delay();
        }
        container.children[j].style.backgroundColor = defaultColor;
        container.children[j + 1].style.backgroundColor = defaultColor;
        await delay();
      }
      container.children[n - i - 1].style.backgroundColor = sortedColor;
      if (!swapped) break;
    }
    for (let k = 0; k < n; k++) {
      container.children[k].style.backgroundColor = sortedColor;
    }
  } catch {
    hasRun = false;
    return;
  }
  hasRun = false;
  return;
}
