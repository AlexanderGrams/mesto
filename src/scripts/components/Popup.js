export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  };

  open(){
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBind);
  };

  close(){
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBind);
  };

  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    };
  };

  setEventListeners(){
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      };
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      };
    });
  };
};
