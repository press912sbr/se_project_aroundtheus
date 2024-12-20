import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputsList = this._popupForm.querySelectorAll(".modal__input");
  }
  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputsList.forEach(
      (input) => (this._inputValues[input.name] = input.value)
    );

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      //figure out how to pass your inputs as arguments to form submit
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
export default PopupWithForm;
