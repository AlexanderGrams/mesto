export class Card {
  constructor(elem, templateSelector, handleCardClick){
    this._title = elem.title;
    this._link = elem.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

    this._cardImage = this._element.querySelector('.card__image');
    this._cardLike = this._element.querySelector('.card__like');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardBasket = this._element.querySelector('.card__basket');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = `изображение: ${this._title}`;
    this._cardTitle.textContent = this._title;

    return this._element;
  }

  //обработчик лайка
  _handleLike() {
    this._cardLike.classList.toggle('card__like_active');
  }

  //удаление карточки
  _removeCard(){
    this._element.remove();
    this._element = null;
  }

  //слушатели событий
  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handleLike()
    });
    this._cardBasket.addEventListener('click', () => {
      this._removeCard()
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link)
    })
  }
}


