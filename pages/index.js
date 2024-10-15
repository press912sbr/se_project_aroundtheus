import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardAddButton = document.querySelector("#add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = cardAddModal.querySelector("#card-add-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const closeButtons = document.querySelectorAll(".modal__close");
const cardPictureModal = document.querySelector("#card-picture-modal");
const cardSelector = "#card-template";
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, cardAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function closePopup(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", handleEscClose);
}

function openPopup(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", handleEscClose);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const title = e.target.title.value;
  const link = e.target.link.value;
  const cardElement = getCardElement({
    name: title,
    link: link,
  });
  const card = new Card(cardData, cardSelector);
  cardListEl.prepend(card.getView);
  closePopup(cardAddModal);
  e.target.reset();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const enlargePicture = document.querySelector("#enlarge-picture");
  const pictureName = document.querySelector(".modal__name");

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(cardPictureModal);
    enlargePicture.src = cardData.link;
    enlargePicture.alt = cardData.name;
    pictureName.textContent = cardData.name;
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  cardListEl.append(cardElement);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddModal);
});

cardAddForm.addEventListener("submit", handleCardAddSubmit);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => {
    closePopup(modal);
  });
});

function handleEscClose(event) {
  if (event.key === "Escape") {
    const activeModal = document.querySelector(".modal__opened");
    if (activeModal) {
      closePopup(activeModal);
    }
  }
}

const modalOverlays = document.querySelectorAll(".modal");

modalOverlays.forEach(function (overlay) {
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closePopup(overlay);
    }
  });
});
