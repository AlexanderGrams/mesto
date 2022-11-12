import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupElement){
    super(popupElement);
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupSignature = this._popupElement.querySelector('.popup__signature');
  }

  open(name, link){
    this._popupImage.src = link;
    this._popupImage.alt = `изображение: ${name}`;
    this._popupSignature.textContent = name;
    super.open()
  }
}
