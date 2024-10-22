import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.createModalElement();
    this.closeButton = this.modal.querySelector(".modal__close");
    this.keydownHandler = this.keydownHandler;
  }

  createModalElement = () => {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const overlay = document.createElement("div");
    overlay.classList.add("modal__overlay");

    const inner = document.createElement("div");
    inner.classList.add("modal__inner");
    inner.innerHTML = `
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    `;

    modal.appendChild(overlay);
    modal.appendChild(inner);

    return modal;
  };

  //открытие окна
  open = () => {
    document.body.append(this.modal);
    document.body.classList.add("is-modal-open");
    this.closeButton.addEventListener("click", this.close);
    document.addEventListener("keydown", this.keydownHandler);
  };

  //запись заголовка
  setTitle = (title) => {
    const titleElement = this.modal.querySelector(".modal__title");
    titleElement.textContent = title;
  };

  //вставка содержимого модального окна
  setBody = (node) => {
    const bodyElement = this.modal.querySelector(".modal__body");
    bodyElement.innerHTML = "";
    bodyElement.appendChild(node);
  };

  //закрытие окна
  close = () => {
    document.body.classList.remove("is-modal-open");
    this.modal.remove();
    this.closeButton.removeEventListener("click", this.close);
    document.removeEventListener("keydown", this.keydownHandler);
  };

  keydownHandler = (event) => {
    if (event.code === "Escape") {
      this.close();
    }
  };
}
