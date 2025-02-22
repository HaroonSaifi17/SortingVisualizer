import { INITIAL_VALUES } from "./constants.js";

class Visualizer {
  constructor() {
    this.array = [];
    this.speed = 5;
    this.length = INITIAL_VALUES.SIZE;
    this.container = null;
    this.isRunning = false;
  }

  initialize(containerId) {
    this.container = document.getElementById(containerId);
    this.generateArray();
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
    element.style.width = 80 / this.length + "vw";
    this.container.appendChild(element);
  }

  async delay() {
    return new Promise((resolve) => setTimeout(resolve, this.speed));
  }

  updateSpeed(value) {
    const minSpeed = 0.0001;
    const maxSpeed = 200;
    const normalizedValue = value / 5000;

    const a = minSpeed;
    const b = Math.log(maxSpeed / minSpeed);

    this.speed = a * Math.exp(b * normalizedValue);
    console.log(this.speed);
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

  swap(i, j) {
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
