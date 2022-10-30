import {openPopup, popupTypeZoomImg, fillWithImage} from "./index.js"

export class Card {
  constructor(elem, templateSelector){
    this._name = elem.name;
    this._link = elem.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate(){
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = `изображение: ${this._name}`;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  //обработчик лайка
  _handleLike() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  //удаление карточки
  _removeCard(){
    this._element.remove()
  }

  //слушатели событий
  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLike(this._element)
    });
    this._element.querySelector('.card__basket').addEventListener('click', () => {
      this._removeCard(this._element)
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      openPopup(popupTypeZoomImg);
      fillWithImage(this._link, `изображение: ${this._name}`, this._name);
    })
  }
}

