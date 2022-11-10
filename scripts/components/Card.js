export class Card {
  constructor(elem, templateSelector, handleCardClick){
    this._name = elem.name;
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
    this._cardImage.alt = `изображение: ${this._name}`;
    this._cardTitle.textContent = this._name;

    return this._element;
  }

  //обработчик лайка
  _handleLike() {
    this._cardLike.classList.toggle('card__like_active');
  }

  //удаление карточки
  _removeCard(){
    this._element.remove()
  }

  //слушатели событий
  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handleLike(this._element)
    });
    this._cardBasket.addEventListener('click', () => {
      this._removeCard(this._element)
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }
}

