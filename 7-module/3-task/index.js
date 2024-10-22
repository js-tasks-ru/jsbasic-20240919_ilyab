export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.renderSlider();
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
    this.stepsElements = this.elem.querySelectorAll(".slider__steps span");

    this.elem.addEventListener("click", (event) => {
      const clickX = event.clientX - this.elem.getBoundingClientRect().left;
      const segmentWidth = this.elem.offsetWidth / (this.steps - 1);
      let newValue = Math.round(clickX / segmentWidth);

      if (newValue < 0) {
        newValue = 0;
      } else if (newValue > this.steps - 1) {
        newValue = this.steps - 1;
      }

      this.setValue(newValue);
      this.emitChangeEvent(newValue);

    });

    this.setValue(this.value);
  }
  
  renderSlider() {
    const slider = document.createElement("div");
    slider.classList.add("slider");
    slider.innerHTML = `
        <div class="slider__thumb"><span class="slider__value">0</span></div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
            ${Array(this.steps).fill("<span></span>").join("")}
        </div>`;
    return slider;
  }

  setValue(newValue) {
    this.value = newValue;
    
    this.thumb.querySelector(".slider__value").textContent = this.value;
    this.stepsElements.forEach((step, index) => {
      step.classList.toggle("slider__step-active", index === this.value);
    });
    
    const leftPercents = (100 * this.value) / (this.steps - 1);
    this.thumb.style.left = `${leftPercents}%`;
    
    this.progress.style.width = `${leftPercents}%`;
  }

  emitChangeEvent(value) {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: value,
        bubbles: true,})
    );
  }
}