import {
  delay,
  updateUI,
  container,
  defaultColor,
  compareColor,
  swapColor,
  sortedColor,
} from "./core";

export default async function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      container.children[j].style.backgroundColor = compareColor;
      container.children[j + 1].style.backgroundColor = compareColor;
      await delay();
      if (arr[j] > arr[j + 1]) {
        updateUI(j, j + 1);
        container.children[j].style.backgroundColor = swapColor;
        container.children[j + 1].style.backgroundColor = swapColor;
        await delay();
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
        await delay();
      }
      container.children[j].style.backgroundColor = defaultColor;
      container.children[j + 1].style.backgroundColor = defaultColor;
      await delay();
    }
    container.children[n - i - 1].style.backgroundColor = sortedColor;
  }
  for (let k = 0; k < n; k++) {
    container.children[k].style.backgroundColor = sortedColor;
  }
  return arr;
}
