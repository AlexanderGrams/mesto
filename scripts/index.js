const profile = document.querySelector('.profile');
const profileBtnInfo = profile.querySelector('.profile__info-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const profileBtnAddCard = profile.querySelector('.profile__button');

const popupTypeEditProfile = document.querySelector('.popup_type_edit-profile');
const popupTypeEditProfileBtnClose = popupTypeEditProfile.querySelector('.popup__close');
const popupTypeEditProfileInputName = popupTypeEditProfile.querySelector('.popup__item_type_name');
const popupTypeEditProfileInputActivity = popupTypeEditProfile.querySelector('.popup__item_type_activity');
const formTypeEditProfile = popupTypeEditProfile.querySelector('.popup__form-admin');

const popupTypeAddCard = document.querySelector('.popup_type_add-card');
const popupTypeAddCardBtnClose = popupTypeAddCard.querySelector('.popup__close');
const popupTypeAddCardInputTitle = popupTypeAddCard.querySelector('.popup__item_type_title');
const popupTypeAddCardInputLink = popupTypeAddCard.querySelector('.popup__item_type_link');
const formTypeAddCard = popupTypeAddCard.querySelector('.popup__form-admin');

const popupTypeZoomImg = document.querySelector('.popup_type_zoom-img');
const popupTypeZoomImgBtnClose = popupTypeZoomImg.querySelector('.popup__close');
const popupImage = popupTypeZoomImg.querySelector('.popup__image');
const popupSignature = popupTypeZoomImg.querySelector('.popup__signature');


const gallery = document.querySelector('.gallery');
const galleryCards = gallery.querySelector('.gallery__cards');

const cardTemplate = document.querySelector('#card').content;

//функция создающая карточку
function createCrad(name, link) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');

  cardImage.src = link;
  cardImage.alt = `изображение: ${name}`;
  card.querySelector('.card__title').textContent = name;

  const cardBtnLike = card.querySelector('.card__like');
  cardBtnLike.addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_active');
  });

  const cardBtnBasket = card.querySelector('.card__basket');
  cardBtnBasket.addEventListener('click', () => card.remove());

  cardImage.addEventListener('click', evt => {
    openPopup(popupTypeZoomImg);
    fillWithImage(evt, name);
  });
  return card;
}

//функция добавляющая карточку
function addCard(name, link){
  const card = createCrad(name, link);
  galleryCards.prepend(card);
};

// функция сохраняющая измененные данные
function handlerFormSubmit(event){
  event.preventDefault();
  profileTitle.textContent = popupTypeEditProfileInputName.value;
  profileSubtitle.textContent = popupTypeEditProfileInputActivity.value;
  closePopup(popupTypeEditProfile);
};

// функция заполняющая текстом значения в полях ввода
function fillWithText(){
  popupTypeEditProfileInputName.value = profileTitle.textContent;
  popupTypeEditProfileInputActivity.value = profileSubtitle.textContent;
};

// функция заполняющая попап картинкой
function fillWithImage(evt, name){
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupSignature.textContent = name;
}

// функция открывающая popup
function openPopup(popup){
  popup.classList.add('popup_opened');
}

// функция закрывающая popup
function closePopup(popup){
  popup.classList.remove('popup_opened');
};

// события открывающее popup
profileBtnInfo.addEventListener('click', () => {
  openPopup(popupTypeEditProfile);
  fillWithText();
});
profileBtnAddCard.addEventListener('click', () => openPopup(popupTypeAddCard));

// события закрывающее popup
popupTypeEditProfileBtnClose.addEventListener('click', () => closePopup(popupTypeEditProfile));
popupTypeAddCardBtnClose.addEventListener('click', () => closePopup(popupTypeAddCard));
popupTypeZoomImgBtnClose.addEventListener('click', () => closePopup(popupTypeZoomImg));

// событие сохраняющее изменненные данные
formTypeEditProfile.addEventListener('submit', handlerFormSubmit);

// событие добавляющее карточку
formTypeAddCard.addEventListener('submit', event => {
  event.preventDefault();
  addCard(popupTypeAddCardInputTitle.value, popupTypeAddCardInputLink.value);
  formTypeAddCard.reset();
  closePopup(popupTypeAddCard);
});

//добавление карточек при загрузки страницы
initialCards.forEach(elem => addCard(elem.name, elem.link));


const popup = document.querySelectorAll('.popup');

function addPopupAnimation(elem){
  elem.style.transition = "visibility 0.2s, opacity ease 0.2s";
};

popup.forEach(item => addPopupAnimation(item));
