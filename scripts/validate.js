function setEventListeners(formEl, options) {
  const inputs = [...formEl.querySelectorAll(options.formSelector)];
}

function enableValidation(options) {
  const forms = [...document.querySelectorAll(options.formSelector)];
  forms.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
