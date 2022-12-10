export class Card {
  constructor(elem, templateSelector, handleCardClick, userDefaultId, {handleCardRemove, giveLike, deletLike}){
    this._userDefaultId = userDefaultId;
    this._userId = elem.owner._id;
    this._cardId = elem._id;
    this._likeArray = elem.likes;
    this._title = elem.name;
    this._link = elem.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemove = handleCardRemove;
    this._giveLike = giveLike;
    this._deletLike = deletLike;
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
    this._cardLike = this._element.querySelector('.card__like-btn');
    this._cardLikeQuantity = this._element.querySelector('.card__like-number');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardBasket = this._element.querySelector('.card__basket');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = `изображение: ${this._title}`;
    this._cardTitle.textContent = this._title;
    this.renderLikes(this._likeArray)
    if(this._checkLike()){
      this.handleLike()
    }

    if(!(this._userId === this._userDefaultId)){
      this._cardBasket.classList.add('card__basket-hidden')
    }

    return this._element;
  }

  renderLikes(likes){
    this._likeArray = likes;
    this._cardLikeQuantity.textContent = likes.length;
  }

  renderLikeArray(likesArray){
    card._likeArray = likesArray
  }

  //обработчик лайка
  handleLike() {
    this._cardLike.classList.toggle('card__like-btn_active');
  }

  _checkLike(){
    return this._likeArray.some((like) => like._id === this._userDefaultId)
  }

  deletCard(){
    this._element.remove();
    this._element = null;
  }

  //слушатели событий
  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      if(!(this._checkLike())){
        this._giveLike(this._cardId)
      }else{
        this._deletLike(this._cardId)
      }
    });
    this._cardBasket.addEventListener('click', () => {
      this._handleCardRemove(this._cardId)
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link)
    })
  }
}


