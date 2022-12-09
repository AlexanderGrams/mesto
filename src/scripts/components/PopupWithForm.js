import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupElement, {submitEvent}){
    super(popupElement);
    this._submitEvent = submitEvent;
    this._form = this._popupElement.querySelector(".popup__form-admin")
    this._formInputs = Array.from(this._popupElement.querySelectorAll(".popup__item"));
    this._buttonSubmit = this._popupElement.querySelector('.popup__button');
    this._buttonSubmitValue = this._buttonSubmit.value;
  }

  _getInputValues(){
    this._formInputValues = {}
    this._formInputs.forEach(input => {
      this._formInputValues[input.name] = input.value;
    })
    return this._formInputValues
  }

  close(){
    super.close()
    this._form.reset()
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._buttonSubmit.value = loadingText;
    } else {
      this._buttonSubmit.value = this._buttonSubmitValue;
    }
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._submitEvent(this._getInputValues());
    })
  }
}
