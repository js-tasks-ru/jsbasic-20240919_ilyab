import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement("div");
    this.elem.className = "ribbon";
    // создание меню
    this.createRibbonMenu(); 

    // обработчик вправо-влево и скролл
    this.arrowRight.addEventListener("click", () => this.scrollRight()); 
    this.arrowLeft.addEventListener("click", () => this.scrollLeft()); 
    this.elem.addEventListener("scroll", () => this.toggleArrows()); 
  }

  createRibbonMenu() {
    this.ribbonInner = document.createElement("div");
    this.ribbonInner.className = "ribbon__inner";

    this.categories.forEach((category) => {
      const categoryLink = document.createElement("a");
      categoryLink.href = "#";
      categoryLink.className = "ribbon__item";
      categoryLink.dataset.id = category.id;
      categoryLink.textContent = category.name;

// обработчик события клик
      categoryLink.addEventListener(
        "click",
        (event) => this.onCategoryClick(event)
      );

      this.ribbonInner.appendChild(categoryLink); 
    });

    this.elem.appendChild(this.ribbonInner);

  //создание кнопки вправо
    this.arrowRight = document.createElement("button");
    this.arrowRight.className = "ribbon__arrow ribbon__arrow_right";

  //создание кнопки влево
    this.arrowLeft = document.createElement("button");
    this.arrowLeft.className = "ribbon__arrow ribbon__arrow_left";

    this.elem.appendChild(this.arrowRight); // Добавляем кнопку стрелки вправо в основной элемент
    this.elem.appendChild(this.arrowLeft); // Добавляем кнопку стрелки влево в основной элемент
  }

  //скролл ленты вправо
  scrollRight() {
    this.ribbonInner.scrollBy(350, 0);
  }
 //скролл ленты влево
  scrollLeft() {
    this.ribbonInner.scrollBy(-350, 0);
  }

  toggleArrows() {
    const scrollLeft = this.ribbonInner.scrollLeft;
    const scrollWidth = this.ribbonInner.scrollWidth;
    const clientWidth = this.ribbonInner.clientWidth;

    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    //сокрытие/отображение стрелки влево
    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove("ribbon__arrow_visible");
    } else {
      this.arrowLeft.classList.add("ribbon__arrow_visible"); 
    }

    //сокрытие/отображение стрелки вправо
    if (scrollRight === 0) {
      this.arrowRight.classList.remove("ribbon__arrow_visible");
    } else {
      this.arrowRight.classList.add("ribbon__arrow_visible");
    }
  }

  onCategoryClick(event) {
    event.preventDefault();

    const categoryLink = event.target;
    const categoryId = categoryLink.dataset.id;

    const activeCategory = this.elem.querySelector(".ribbon__item_active");
    if (activeCategory) {
      activeCategory.classList.remove("ribbon__item_active");
    }

    categoryLink.classList.add("ribbon__item_active");

    this.elem.dispatchEvent(
      new CustomEvent("ribbon-select", {
        detail: categoryId,
        bubbles: true,
      })
    );
  }
}
