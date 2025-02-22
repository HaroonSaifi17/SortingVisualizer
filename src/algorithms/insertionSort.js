import { COLORS } from '../utils/constants.js';
import { visualizer } from '../utils/visualizer.js';

export async function insertionSort() {
  if (visualizer.isRunning) return;
  visualizer.isRunning = true;

  const n = visualizer.array.length;
  try {
    for (let i = 1; i < n && visualizer.isRunning; i++) {
      let key = visualizer.array[i];
      let j = i - 1;
      
      visualizer.updateBarColor(i, COLORS.COMPARE);
      await visualizer.delay();

      while (j >= 0 && visualizer.array[j] > key && visualizer.isRunning) {
        visualizer.updateBarColor(j, COLORS.SWAP);
        visualizer.updateBarColor(j + 1, COLORS.SWAP);
        await visualizer.delay();

        visualizer.swap(j + 1, j);
        
        visualizer.updateBarColor(j, COLORS.DEFAULT);
        visualizer.updateBarColor(j + 1, COLORS.DEFAULT);
        j--;
        await visualizer.delay();
      }
      
      visualizer.updateBarColor(j + 1, COLORS.SORTED);
    }

    if (visualizer.isRunning) {
      for (let i = 0; i < n; i++) {
        visualizer.updateBarColor(i, COLORS.SORTED);
      }
    }
  } catch (error) {
    console.error('Insertion Sort Error:', error);
  }

  visualizer.isRunning = false;
}
