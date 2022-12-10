import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup {
  constructor(popupElement){
    super(popupElement);
    this._popupButton = this._popupElement.querySelector('.popup__button');
  }

  open(){
    super.open();
    this._setEventListeners()
  }

  changeSubmitHandler(newSubmitHandler) {
    this._clickEvent = newSubmitHandler;
  }

  _setEventListeners(){
    super.setEventListeners();
    this._popupButton.addEventListener("click", () => {
      this._clickEvent()
    })
  }
}
