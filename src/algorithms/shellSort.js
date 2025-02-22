import { COLORS } from '../utils/constants.js';
import { visualizer } from '../utils/visualizer.js';

export async function shellSort() {
  if (visualizer.isRunning) return;
  visualizer.isRunning = true;

  try {
    const n = visualizer.array.length;
    
    for (let gap = Math.floor(n/2); gap > 0 && visualizer.isRunning; gap = Math.floor(gap/2)) {
      for (let i = gap; i < n && visualizer.isRunning; i++) {
        let temp = visualizer.array[i];
        
        visualizer.updateBarColor(i, COLORS.COMPARE);
        await visualizer.delay();
        
        let j;
        for (j = i; j >= gap && visualizer.array[j - gap] > temp && visualizer.isRunning; j -= gap) {
          visualizer.updateBarColor(j, COLORS.SWAP);
          visualizer.updateBarColor(j - gap, COLORS.SWAP);
          await visualizer.delay();
          
          visualizer.array[j] = visualizer.array[j - gap];
          visualizer.updateBar(j, visualizer.array[j]);
          
          visualizer.updateBarColor(j, COLORS.DEFAULT);
          visualizer.updateBarColor(j - gap, COLORS.DEFAULT);
        }
        
        visualizer.array[j] = temp;
        visualizer.updateBar(j, temp);
        visualizer.updateBarColor(i, COLORS.DEFAULT);
      }
    }

    if (visualizer.isRunning) {
      for (let i = 0; i < n; i++) {
        visualizer.updateBarColor(i, COLORS.SORTED);
        await visualizer.delay();
      }
    }
  } catch (error) {
    console.error('Shell Sort Error:', error);
  }

  visualizer.isRunning = false;
}
