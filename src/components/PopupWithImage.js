import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this.previewModalImage = this._popupElement.querySelector(".modal__image");
    this.previewModalTitle = this._popupElement.querySelector(".modal__name");
  }

  open(card) {
    this.previewModalImage.src = card.link;
    this.previewModalImage.alt = card.name;
    this.previewModalTitle.textContent = card.name;

    super.open();
  }
}

export default PopupWithImage;
