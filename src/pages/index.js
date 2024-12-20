import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Section from "../components/Section.js";
import "../utils/constants.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

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

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

cardSection.renderItems();

// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closePopup(profileEditModal);
// }

function handleProfileEditSubmit({ title, description }) {
  profileTitle.textContent = title;
  profileDescription.textContent = description;
  profileEditPopup.close();
}

function renderCard(item) {
  const card = createCard(item);
  cardSection.addItem(card);
}

function createCard(item) {
  return new Card(item, cardSelector, handleImageClick).getView();
}

// function handleCardAddSubmit(e) {
//   e.preventDefault();
//   const name = e.target.title.value;
//   const link = e.target.link.value;
//   renderCard({ name: name, link: link });

//   closePopup(cardAddModal);
//   e.target.reset();
//   addFormValidator.toggleButtonState();
// }

function handleCardAddSubmit({ title, link }) {
  renderCard({ name: title, link: link });

  addCardModal.close();
  // e.target.reset();
  // addFormValidator.toggleButtonState();
}

const addCardModal = new PopupWithForm("#card-add-modal", handleCardAddSubmit);
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditPopup.open();
  profileEditPopup.setEventListeners();
});

const previewModal = new PopupWithImage({
  popupSelector: "#card-picture-modal",
});
previewModal.setEventListeners();

function handleImageClick(card) {
  previewModal.open({ name: card.name, link: card.link });
}

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

cardAddButton.addEventListener("click", () => {
  addCardModal.open();
  addCardModal.setEventListeners();
});

// cardAddForm.addEventListener("submit", handleCardAddSubmit);
