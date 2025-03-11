import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Section from "../components/Section.js";
import "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

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

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, cardAddForm);
addFormValidator.enableValidation();
let cardSection;

// api.getInitialCards().then((res) => {
//   cardSection = new Section(
//     {
//       items: res,
//       renderer: renderCard,
//     },
//     ".cards__list"
//   );
// });

// const cardSection = new Section(
//   {
//     items: getInitialCards,
//     renderer: renderCard,
//   },
//   ".cards__list"
// );

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});

// cardSection.renderItems();

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
  cardAddForm.reset();
  addFormValidator.toggleButtonState();
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f1f344e9-a89a-481f-af65-224244854b8a",
    "Content-Type": "application/json",
  },
});

// api
//   .getInitialCards()
//   .then((result) => {
//     console.log(result);
//     // process the result
//   })
//   .catch((err) => {
//     console.error(err); // log the error to the console
//   });
api.getInitialCards().then((res) => {
  cardSection = new Section(
    {
      items: res,
      renderer: renderCard,
    },
    ".cards__list"
  );
  cardSection.renderItems();
});
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
});
profileEditPopup.setEventListeners();

const previewModal = new PopupWithImage({
  popupSelector: "#card-picture-modal",
});
previewModal.setEventListeners();

function handleImageClick(card) {
  previewModal.open({ name: card.name, link: card.link });
}

cardAddButton.addEventListener("click", () => {
  addCardModal.open();
});
addCardModal.setEventListeners();
