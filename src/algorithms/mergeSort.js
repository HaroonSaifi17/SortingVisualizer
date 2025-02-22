import { COLORS } from '../utils/constants.js';
import { visualizer } from '../utils/visualizer.js';

async function merge(start, mid, end) {
  const tempArray = [];
  let i = start;
  let j = mid + 1;
  
  for (let k = start; k <= end; k++) {
    visualizer.updateBarColor(k, COLORS.COMPARE);
  }
  await visualizer.delay();

  while (i <= mid && j <= end && visualizer.isRunning) {
    visualizer.updateBarColor(i, COLORS.SWAP);
    visualizer.updateBarColor(j, COLORS.SWAP);
    await visualizer.delay();

    if (visualizer.array[i] <= visualizer.array[j]) {
      tempArray.push(visualizer.array[i++]);
    } else {
      tempArray.push(visualizer.array[j++]);
    }
  }

  while (i <= mid && visualizer.isRunning) {
    visualizer.updateBarColor(i, COLORS.SWAP);
    await visualizer.delay();
    tempArray.push(visualizer.array[i++]);
  }

  while (j <= end && visualizer.isRunning) {
    visualizer.updateBarColor(j, COLORS.SWAP);
    await visualizer.delay();
    tempArray.push(visualizer.array[j++]);
  }

  for (let k = 0; k < tempArray.length; k++) {
    if (!visualizer.isRunning) break;
    visualizer.array[start + k] = tempArray[k];
    visualizer.updateBar(start + k, tempArray[k]);
    visualizer.updateBarColor(start + k, COLORS.DEFAULT);
    await visualizer.delay();
  }
}

async function mergeSortHelper(start, end) {
  if (start < end && visualizer.isRunning) {
    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);
    await merge(start, mid, end);
  }
}

export async function mergeSort() {
  if (visualizer.isRunning) return;
  visualizer.isRunning = true;

  try {
    await mergeSortHelper(0, visualizer.array.length - 1);
    
    if (visualizer.isRunning) {
      for (let i = 0; i < visualizer.array.length; i++) {
        visualizer.updateBarColor(i, COLORS.SORTED);
      }
    }
  } catch (error) {
    console.error('Merge Sort Error:', error);
  }

  visualizer.isRunning = false;
}
