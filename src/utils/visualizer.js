import { INITIAL_VALUES, SOUND } from "./constants.js";

class Visualizer {
  constructor() {
    this.array = [];
    this.speed = 5;
    this.length = INITIAL_VALUES.SIZE;
    this.container = null;
    this.isRunning = false;
    this.soundEnabled = SOUND.ENABLED;
    this.swapSound = new Audio(SOUND.SWAP_SOUND);
  }

  initialize(containerId) {
    this.container = document.getElementById(containerId);
    this.generateArray();
    this.setupSoundControl();
  }

  setupSoundControl() {
    const soundControl = document.createElement("div");
    soundControl.className = "control-item";

    const label = document.createElement("label");
    label.htmlFor = "soundToggle";
    label.textContent = "Sound:";

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.id = "soundToggle";
    toggle.checked = this.soundEnabled;
    toggle.addEventListener("change", (e) => {
      this.soundEnabled = e.target.checked;
    });

    soundControl.appendChild(label);
    soundControl.appendChild(toggle);

    const controlBox = document.querySelector(".control-box");
    const speedControl = document.querySelector("#speedRange").parentElement;
    controlBox.insertBefore(soundControl, speedControl.nextSibling);
  }

  generateArray() {
    this.array = [];
    this.container.innerHTML = "";

    for (let i = 0; i < this.length; i++) {
      const value =
        Math.floor(
          Math.random() *
            (INITIAL_VALUES.MAX_HEIGHT - INITIAL_VALUES.MIN_HEIGHT + 1),
        ) + INITIAL_VALUES.MIN_HEIGHT;
      this.array.push(value);
      this.createBar(value);
    }
  }

  createBar(height) {
    const element = document.createElement("div");
    element.style.height = height + "vh";
    element.style.width = 70 / this.length + "vw";
    this.container.appendChild(element);
  }

  async delay() {
    return new Promise((resolve) =>
      setTimeout(() => {
        if (this.soundEnabled) {
          try {
            const soundClone = this.swapSound.cloneNode();
            soundClone.volume = 0.01;
            soundClone.currentTime = 0;
            soundClone.play().catch(console.error);
          } catch (error) {
            console.error("Error playing sound:", error);
          }
        }

        return resolve();
      }, this.speed),
    );
  }

  updateSpeed(value) {
    const minSpeed = 0.0001;
    const maxSpeed = 200;
    const normalizedValue = value / 5000;
    const a = minSpeed;
    const b = Math.log(maxSpeed / minSpeed);
    this.speed = a * Math.exp(b * normalizedValue);

    if (this.soundEnabled) {
      this.swapSound.playbackRate = Math.max(
        0.5,
        Math.min(4.0, 1 / (this.speed / 50)),
      );
    }
  }

  updateSize(value) {
    this.length = value;
    this.generateArray();
  }

  updateBar(index, height) {
    if (this.container.children[index]) {
      this.container.children[index].style.height = height + "vh";
    }
  }

  updateBarColor(index, color) {
    if (this.container.children[index]) {
      this.container.children[index].style.backgroundColor = color;
    }
  }

  async swap(i, j) {
    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    this.updateBar(i, this.array[i]);
    this.updateBar(j, this.array[j]);
  }

  reset() {
    this.isRunning = false;
    this.generateArray();
  }
}

export const visualizer = new Visualizer();
