export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.renderSlider();
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
    this.stepsElements = this.elem.querySelectorAll(".slider__steps span");

    this.thumb.addEventListener("pointerdown", this.onThumbPointerDown);
    this.elem.addEventListener("click", this.onSliderClick);

    this.setValue(this.value);
  }

  renderSlider() {
    const slider = document.createElement("div");
    slider.className = "slider";
    slider.innerHTML = `
        <div class="slider__thumb" draggable="true"><span class="slider__value">${
          this.value
        }</span></div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
            ${Array(this.steps).fill("<span></span>").join("")}
        </div>
    `;
    return slider;
  }

  setValue(newValue) {
    this.value = newValue;
    
    const leftPercents = (100 * this.value) / (this.steps - 1);

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    this.thumb.querySelector(".slider__value").textContent = this.value;

    this.stepsElements.forEach((step, index) => {
      step.classList.toggle("slider__step-active", index === this.value);
    });

    this.emitChangeEvent(this.value);
  }

  emitChangeEvent(value) {
    const event = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  }

  onThumbPointerDown = (event) => {
    event.preventDefault();

    this.elem.classList.add("slider_dragging");

    const moveThumb = (event) => {
      const sliderRect = this.elem.getBoundingClientRect();
      let newLeft = event.clientX - sliderRect.left;

      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft > this.elem.offsetWidth) {
        newLeft = this.elem.offsetWidth;
      }

      this.thumb.style.left = `${(newLeft / this.elem.offsetWidth) * 100}%`;
      this.progress.style.width = this.thumb.style.left;
    };

    const stopMoveThumb = () => {
      this.elem.classList.remove("slider_dragging");
      document.removeEventListener("pointermove", moveThumb);
      document.removeEventListener("pointerup", stopMoveThumb);

      const leftPercents = parseInt(this.thumb.style.left);
      const newValue = Math.round(leftPercents / (100 / (this.steps - 1)));
      this.setValue(newValue);
    };

    document.addEventListener("pointermove", moveThumb);
    document.addEventListener("pointerup", stopMoveThumb);
  };

  onSliderClick = (event) => {
    if (!event.target.classList.contains("slider__thumb")) {
      const newValue = Math.round(
        ((event.clientX - this.elem.getBoundingClientRect().left) /
          this.elem.offsetWidth) *
          (this.steps - 1)
      );
      this.setValue(newValue);
    }
  };
}