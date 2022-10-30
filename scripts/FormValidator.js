export class FormValidator {
  constructor(obj, form){
    this.inputSelector = obj.inputSelector;
    this.submitButtonSelector = obj.submitButtonSelector;
    this.inactiveButtonClass = obj.inactiveButtonClass;
    this.inputErrorClass = obj.inputErrorClass;
    this.errorClass = obj.errorClass;
    this.form = form;
  }

  enableValidation(){
    this._setEventListeners()
  }

  _enableButton(elem){
    elem.classList.remove(this.inactiveButtonClass);
    elem.removeAttribute('disabled');
  };

  _disableButton(elem){
    elem.classList.add(this.inactiveButtonClass);
    elem.setAttribute('disabled', true);
  };

  _checkInput(inputArray) {
    return inputArray.some(input => {
      return !input.validity.valid;
    });
  };

  _hideInputError(textInput){
    const inputError = this.form.querySelector(`#${textInput.id}-error`);
    textInput.classList.remove(this.inputErrorClass);
    inputError.textContent = '';
  }

  _showInputError(textInput, errorMessage){
    const inputError = this.form.querySelector(`#${textInput.id}-error`);
    textInput.classList.add(this.inputErrorClass);
    inputError.textContent = errorMessage;
  }

  _isValid(textInput){
    if (!textInput.validity.valid) {
      this._showInputError(textInput, textInput.validationMessage);
    } else {
      this._hideInputError(textInput);
    }
  }

  _convertButton(inputArray, buttonElement){
    if (this._checkInput(inputArray)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    };
  }

  _setEventListeners(){
    const inputArray = Array.from(this.form.querySelectorAll(this.inputSelector));
    const buttonElement = this.form.querySelector(this.submitButtonSelector);
    this._convertButton(inputArray, buttonElement);
    inputArray.forEach(elem => {
      elem.addEventListener('input', () => {
        this._isValid(elem);
        this._convertButton(inputArray, buttonElement);
      });
    });
  }
}
