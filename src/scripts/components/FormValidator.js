export class FormValidator {
  constructor(validationConfig, form){
    this.inputSelector = validationConfig.inputSelector;
    this.submitButtonSelector = validationConfig.submitButtonSelector;
    this.inactiveButtonClass = validationConfig.inactiveButtonClass;
    this.inputErrorClass = validationConfig.inputErrorClass;
    this.errorClass = validationConfig.errorClass;
    this.form = form;
  }

  enableValidation(){
    this._setEventListeners()
  }

  _enableButton(){
    this._buttonElement.classList.remove(this.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  _disableButton(){
    this._buttonElement.classList.add(this.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  _checkInput() {
    return this._inputArray.some(input => {
      return !input.validity.valid;
    });
  };

  _hideInputError(textInput){
    const inputError = this.form.querySelector(`#${textInput.id}-error`);
    textInput.classList.remove(this.inputErrorClass);
    inputError.textContent = '';
  }

  _showInputError(textInput){
    const inputError = this.form.querySelector(`#${textInput.id}-error`);
    textInput.classList.add(this.inputErrorClass);
    inputError.textContent = textInput.validationMessage;
  }

  _isValid(textInput){
    if (!textInput.validity.valid) {
      this._showInputError(textInput);
    } else {
      this._hideInputError(textInput);
    }
  }

  _convertButton(){
    if (this._checkInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    };
  }

  resetValidation() {
    this._convertButton();
    this._inputArray.forEach(elem => {
      this._hideInputError(elem);
    })
  }

  _setEventListeners(){
    this._inputArray = Array.from(this.form.querySelectorAll(this.inputSelector));
    this._buttonElement = this.form.querySelector(this.submitButtonSelector);
    this._convertButton();
    this._inputArray.forEach(elem => {
      elem.addEventListener('input', () => {
        this._isValid(elem);
        this._convertButton();
      });
    });
  }
}
