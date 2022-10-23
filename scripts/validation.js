const validationConfig = {
  formSelector: '.popup__form-admin',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__text-error_visible',
};

const enableButton = (elem) => {
  elem.classList.remove(validationConfig.inactiveButtonClass);
  elem.removeAttribute('disabled');
};

const disableButton = (elem) => {
  elem.classList.add(validationConfig.inactiveButtonClass);
  elem.setAttribute('disabled', true);
};

const checkInput = (inputArray) => {
  return inputArray.some(input => {
    return !input.validity.valid;
  });
};

const convertButton = (inputArray, buttonElement, validationConfig) => {
  if (checkInput(inputArray)) {
    disableButton(buttonElement, validationConfig);
  } else {
    enableButton(buttonElement, validationConfig);
  };
};

const hideInputError = (form, textInput, validationConfig) => {
  const inputError = form.querySelector(`#${textInput.id}-error`);
  textInput.classList.remove(validationConfig.inputErrorClass);
  inputError.textContent = '';
};

const showInputError = (form, textInput, errorMessage, validationConfig) => {
  const inputError = form.querySelector(`#${textInput.id}-error`);
  textInput.classList.add(validationConfig.inputErrorClass);
  inputError.textContent = errorMessage;
};

const isValid = (form, textInput, validationConfig) => {
  if (!textInput.validity.valid) {
    showInputError(form, textInput, textInput.validationMessage, validationConfig);
  } else {
    hideInputError(form, textInput, validationConfig);
  }
};

const setEventListeners = (form, validationConfig) => {
  const inputArray = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  convertButton(inputArray, buttonElement, validationConfig);
  inputArray.forEach(elem => {
    elem.addEventListener('input', () => {
      isValid(form, elem, validationConfig);
      convertButton(inputArray, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formArray = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formArray.forEach(elem => setEventListeners(elem, validationConfig));
};

enableValidation(validationConfig);
