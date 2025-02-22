import { COLORS } from '../utils/constants.js';
import { visualizer } from '../utils/visualizer.js';

export async function selectionSort() {
  if (visualizer.isRunning) return;
  visualizer.isRunning = true;

  try {
    const n = visualizer.array.length;

    for (let i = 0; i < n - 1 && visualizer.isRunning; i++) {
      let minIdx = i;
      visualizer.updateBarColor(i, COLORS.COMPARE);
      
      for (let j = i + 1; j < n && visualizer.isRunning; j++) {
        visualizer.updateBarColor(j, COLORS.COMPARE);
        await visualizer.delay();
        
        if (visualizer.array[j] < visualizer.array[minIdx]) {
          if (minIdx !== i) {
            visualizer.updateBarColor(minIdx, COLORS.DEFAULT);
          }
          minIdx = j;
          visualizer.updateBarColor(minIdx, COLORS.SWAP);
        } else {
          visualizer.updateBarColor(j, COLORS.DEFAULT);
        }
      }

      if (minIdx !== i && visualizer.isRunning) {
        visualizer.swap(i, minIdx);
        await visualizer.delay();
      }
      
      visualizer.updateBarColor(i, COLORS.SORTED);
      if (minIdx !== i) {
        visualizer.updateBarColor(minIdx, COLORS.DEFAULT);
      }
    }

    if (visualizer.isRunning) {
      visualizer.updateBarColor(n - 1, COLORS.SORTED);
    }
  } catch (error) {
    console.error('Selection Sort Error:', error);
  }

  visualizer.isRunning = false;
}
