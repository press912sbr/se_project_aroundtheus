import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
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

const enlargePicture = document.querySelector("#enlarge-picture");
const pictureName = document.querySelector(".modal__name");

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
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, cardAddForm);
addFormValidator.enableValidation();

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function renderCard(item) {
  const card = createCard(item);
  cardListEl.prepend(card);
}

function createCard(item) {
  return new Card(item, cardSelector, handleImageClick).getView();
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  renderCard({ name: name, link: link });

  closePopup(cardAddModal);
  e.target.reset();
  addFormValidator.toggleButtonState();
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

function handleImageClick(cardData) {
  openPopup(cardPictureModal);
  enlargePicture.src = cardData.link;
  enlargePicture.alt = cardData.name;
  pictureName.textContent = cardData.name;
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  renderCard(cardData);
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
    const activeModal = document.querySelector(".modal_opened");
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
