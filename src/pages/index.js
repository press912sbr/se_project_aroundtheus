import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Section from "../components/Section.js";
import "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const cardAddButton = document.querySelector("#add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardAddForm = cardAddModal.querySelector("#card-add-form");

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

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});

cardSection.renderItems();

function handleProfileEditSubmit({ title, description }) {
  userInfo.setUserInfo({ title, description });
  profileEditPopup.close();
}

function renderCard(item) {
  const card = createCard(item);
  cardSection.addItem(card);
}

function createCard(item) {
  return new Card(item, cardSelector, handleImageClick).getView();
}

function handleCardAddSubmit({ title, link }) {
  renderCard({ name: title, link: link });

  addCardModal.close();
}

const addCardModal = new PopupWithForm("#card-add-modal", handleCardAddSubmit);
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

profileEditButton.addEventListener("click", () => {
  const { title, description } = userInfo.getUserInfo();
  profileTitleInput.value = title;
  profileDescriptionInput.value = description;
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

cardAddButton.addEventListener("click", () => {
  addCardModal.open();
  addCardModal.setEventListeners();
});
