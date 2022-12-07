import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup {
  constructor(popupElement, {clickEvent} ){
    super(popupElement);
    this._popupButton = this._popupElement.querySelector('.popup__button');
    this._clickEvent = clickEvent;
  }

  open(userId, card){
    super.open();
    this._userId = userId;
    this._element = card;
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupButton.addEventListener("click", () => {
      this._clickEvent(this._userId)
      this._element.remove();
      this._element = null;
      this.close();
    })
  }
}
