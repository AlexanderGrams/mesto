import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitEvent}){
    super(popupSelector);
    this._submitEvent = submitEvent;
    this._formInputs = Array.from(this._popupSelector.querySelectorAll(".popup__item"));
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
    this._popupSelector.querySelector(".popup__form-admin").reset()
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitEvent(this._getInputValues());
    })
  }
}
