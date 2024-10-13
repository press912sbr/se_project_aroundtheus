function closePopup(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", handleEscClose);
}

function openPopup(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", handleEscClose);
}

class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    const _likeButton = this._element.querySelector(".card__like-button");
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        cardElement.remove();
      });

    this._likeButton.addEventListener("click", () => {
      _likeButton.classList.toggle("card__like-button_active");
    });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        openPopup(cardPictureModal);
        enlargePicture.src = cardData.link;
        enlargePicture.alt = cardData.name;
        pictureName.textContent = cardData.name;
      });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
  }
}

export default Card;
