class Card {
  constructor(
    { cardData, handleImageClick, handleCardDeleteSubmit, handleDeleteClick },
    cardSelector
  ) {
    this.name = cardData.name;
    this.link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = cardData._id;
    // this._deleteCardModal = document.querySelector("#card-delete-modal");
    this._handleCardDeleteSubmit = handleCardDeleteSubmit;
    this._handleDeleteClick = handleDeleteClick;
  }

  getID() {
    return this._id;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");

    this._deleteBtn = this._element.querySelector(".card__delete-button");
    this._deleteBtn.addEventListener("click", () => {
      // this._deleteCardModal.open();
      this._handleDeleteClick();
    });

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
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

    this._cardImage.src = this.link;

    this._element.querySelector(".card__title").textContent = this.name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
