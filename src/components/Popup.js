class Popup {
  constructor({ popupSelector }) {
    console.log(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      // const activeModal = document.querySelector(".modal_opened");
      // if (activeModal) {
      this.close();
      // }
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}

export default Popup;
