import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  open(name, link, popupImage, popupSignature){
    popupImage.src = link;
    popupImage.alt = `изображение: ${name}`;
    popupSignature.textContent = name;
    super.open()
  }
}
