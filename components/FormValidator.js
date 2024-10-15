class FormValidator {
  constructor(settings, formSelector) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formSelector;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#$(inputElement.id)-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {}

  _checkInputValidity() {}

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._form, inputElement);
        this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  }

  enableValidation(formSelector, rest) {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefalt();
    });

    this._setEventListeners(formSelector, rest);
  }
}

export default FormValidator;
