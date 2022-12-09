import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup {
  constructor(popupElement, {clickEvent} ){
    super(popupElement);
    this._popupButton = this._popupElement.querySelector('.popup__button');
    this._clickEvent = clickEvent;
  }

  open(cardId, card){
    super.open();
    this._setEventListeners(cardId, card)
  }

  _setEventListeners(cardId, card){
    super.setEventListeners();
    this._popupButton.addEventListener("click", () => {
      this._clickEvent(cardId, card)
    })
  }
}
