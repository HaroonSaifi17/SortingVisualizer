import { COLORS } from '../utils/constants.js';
import { visualizer } from '../utils/visualizer.js';

async function partition(low, high) {
  const pivot = visualizer.array[high];
  visualizer.updateBarColor(high, COLORS.COMPARE);
  await visualizer.delay();

  let i = low - 1;

  for (let j = low; j < high && visualizer.isRunning; j++) {
    visualizer.updateBarColor(j, COLORS.COMPARE);
    await visualizer.delay();

    if (visualizer.array[j] < pivot) {
      i++;
      visualizer.updateBarColor(i, COLORS.SWAP);
      visualizer.updateBarColor(j, COLORS.SWAP);
      await visualizer.delay();
      
      visualizer.swap(i, j);
      
      visualizer.updateBarColor(i, COLORS.DEFAULT);
      visualizer.updateBarColor(j, COLORS.DEFAULT);
      await visualizer.delay();
    } else {
      visualizer.updateBarColor(j, COLORS.DEFAULT);
    }
  }

  visualizer.updateBarColor(i + 1, COLORS.SWAP);
  visualizer.updateBarColor(high, COLORS.SWAP);
  await visualizer.delay();
  
  visualizer.swap(i + 1, high);
  
  visualizer.updateBarColor(i + 1, COLORS.DEFAULT);
  visualizer.updateBarColor(high, COLORS.DEFAULT);
  await visualizer.delay();

  return i + 1;
}

async function quickSortHelper(low, high) {
  if (low < high && visualizer.isRunning) {
    const pi = await partition(low, high);
    await quickSortHelper(low, pi - 1);
    await quickSortHelper(pi + 1, high);
  }
}

export async function quickSort() {
  if (visualizer.isRunning) return;
  visualizer.isRunning = true;

  try {
    await quickSortHelper(0, visualizer.array.length - 1);
    
    if (visualizer.isRunning) {
      for (let i = 0; i < visualizer.array.length; i++) {
        visualizer.updateBarColor(i, COLORS.SORTED);
      }
    }
  } catch (error) {
    console.error('Quick Sort Error:', error);
  }

  visualizer.isRunning = false;
}
