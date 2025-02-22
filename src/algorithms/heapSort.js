import { COLORS } from '../utils/constants.js';
import { visualizer } from '../utils/visualizer.js';

async function heapify(n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  visualizer.updateBarColor(i, COLORS.COMPARE);
  await visualizer.delay();

  if (left < n) {
    visualizer.updateBarColor(left, COLORS.COMPARE);
    await visualizer.delay();
    if (visualizer.array[left] > visualizer.array[largest]) {
      largest = left;
    }
    visualizer.updateBarColor(left, COLORS.DEFAULT);
  }

  if (right < n) {
    visualizer.updateBarColor(right, COLORS.COMPARE);
    await visualizer.delay();
    if (visualizer.array[right] > visualizer.array[largest]) {
      largest = right;
    }
    visualizer.updateBarColor(right, COLORS.DEFAULT);
  }

  if (largest !== i && visualizer.isRunning) {
    visualizer.updateBarColor(i, COLORS.SWAP);
    visualizer.updateBarColor(largest, COLORS.SWAP);
    await visualizer.delay();
    
    visualizer.swap(i, largest);
    
    visualizer.updateBarColor(i, COLORS.DEFAULT);
    visualizer.updateBarColor(largest, COLORS.DEFAULT);
    await visualizer.delay();
    
    await heapify(n, largest);
  }

  visualizer.updateBarColor(i, COLORS.DEFAULT);
}

export async function heapSort() {
  if (visualizer.isRunning) return;
  visualizer.isRunning = true;

  try {
    const n = visualizer.array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0 && visualizer.isRunning; i--) {
      await heapify(n, i);
    }

    for (let i = n - 1; i > 0 && visualizer.isRunning; i--) {
      visualizer.updateBarColor(0, COLORS.SWAP);
      visualizer.updateBarColor(i, COLORS.SWAP);
      await visualizer.delay();
      
      visualizer.swap(0, i);
      visualizer.updateBarColor(i, COLORS.SORTED);
      
      await heapify(i, 0);
    }

    if (visualizer.isRunning) {
      visualizer.updateBarColor(0, COLORS.SORTED);
    }
  } catch (error) {
    console.error('Heap Sort Error:', error);
  }

  visualizer.isRunning = false;
}

