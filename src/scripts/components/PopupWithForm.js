import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupElement, {submitEvent}){
    super(popupElement);
    this._submitEvent = submitEvent;
    this._formInputs = Array.from(this._popupElement.querySelectorAll(".popup__item"));
    this._buttonSubmit = this._popupElement.querySelector('.popup__button');
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
    this.renderLoading(false);
    this._popupElement.querySelector(".popup__form-admin").reset()
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.value = 'Сохранение...'
    } else {
      this._buttonSubmit.value = 'Сохранить'
    }
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._submitEvent(this._getInputValues());
    })
  }
}
