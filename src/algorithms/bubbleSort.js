import { COLORS } from '../utils/constants.js';
import { visualizer } from '../utils/visualizer.js';

export async function bubbleSort() {
  if (visualizer.isRunning) return;
  visualizer.isRunning = true;

  const n = visualizer.array.length;
  try {
    for (let i = 0; i < n - 1 && visualizer.isRunning; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1 && visualizer.isRunning; j++) {
        visualizer.updateBarColor(j, COLORS.COMPARE);
        visualizer.updateBarColor(j + 1, COLORS.COMPARE);
        await visualizer.delay();

        if (visualizer.array[j] > visualizer.array[j + 1]) {
          visualizer.updateBarColor(j, COLORS.SWAP);
          visualizer.updateBarColor(j + 1, COLORS.SWAP);
          await visualizer.delay();
          
          visualizer.swap(j, j + 1);
          swapped = true;
          await visualizer.delay();
        }

        visualizer.updateBarColor(j, COLORS.DEFAULT);
        visualizer.updateBarColor(j + 1, COLORS.DEFAULT);
        await visualizer.delay();
      }

      visualizer.updateBarColor(n - i - 1, COLORS.SORTED);
      if (!swapped) break;
    }

    if (visualizer.isRunning) {
      for (let k = 0; k < n; k++) {
        visualizer.updateBarColor(k, COLORS.SORTED);
      }
    }
  } catch (error) {
    console.error('Bubble Sort Error:', error);
  }
  
  visualizer.isRunning = false;
}
