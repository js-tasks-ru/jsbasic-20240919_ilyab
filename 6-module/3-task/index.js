import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this.render();
    this.initCarousel();
  }


render() {
  this.elem = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" style="display: none;">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.slides
          .map(
            (slide) => `
          <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${
              slide.image
            }" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `);
}

initCarousel() {
  let switchTool = this.elem.querySelector(".carousel__inner");
  let arrowright = this.elem.querySelector(".carousel__arrow_right");
  let arrowleft = this.elem.querySelector(".carousel__arrow_left");
  let totalWidth = switchTool.offsetWidth;
  let Offset = 0;
  let maxOffset = -(totalWidth * (this.slides.length - 1));

  arrowright.addEventListener("click", () => {
    Offset -= this.elem.offsetWidth;
    switchTool.style.transform = `translateX(${Offset}px)`;
    if (Offset !== 0) {
      arrowleft.style.display = "";
    }
    if (Offset <= maxOffset) {
      arrowright.style.display = "none";
    }
  });

  arrowleft.addEventListener("click", () => {
    Offset += this.elem.offsetWidth;
    switchTool.style.transform = `translateX(${Offset}px)`;
    if (Offset !== 0) {
      arrowright.style.display = "";
    }
    if (Offset === 0) {
      arrowleft.style.display = "none";
    }
  });

  this.elem.addEventListener("click", (event) => {
    if (event.target.closest(".carousel__button")) {
      let slideId = event.target.closest(".carousel__slide").dataset.id;
      this.elem.dispatchEvent(
        new CustomEvent("product-add", {
          detail: slideId,
          bubbles: true,
        })
      );
    }
  });
}
}