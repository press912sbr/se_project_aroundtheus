class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        cardElement.remove();
      });

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
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
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.alt = this.name;

    this._cardImage.src = this._link;

    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
