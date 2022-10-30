import {Card} from "./Card.js"
import {initialCards, validationConfig} from './const.js'
import {FormValidator} from "./FormValidator.js"

const profile = document.querySelector('.profile');
const profileBtnInfo = profile.querySelector('.profile__info-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const profileBtnAddCard = profile.querySelector('.profile__button');

const popups = document.querySelectorAll('.popup');

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


//валидация форм
const validTypeEditProfile = new FormValidator(validationConfig, document.forms.formProfile);
validTypeEditProfile.enableValidation()

const validTypeAddCard = new FormValidator(validationConfig, document.forms.formAdd);
validTypeAddCard.enableValidation()




//функция добавляющая карточку
function addCard(obj){
  const card = new Card(obj, '#card');
  const cardElement = card.generateCard();
  galleryCards.prepend(cardElement);
};

// функция сохраняющая измененные данные
function handleFormSubmit(event){
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
function fillWithImage(src, alt, name){
  popupImage.src = src;
  popupImage.alt = alt;
  popupSignature.textContent = name;
}

// функция открывающая popup
function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnButtonEscape);
}

// функция закрывающая popup
function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnButtonEscape);
};

// функция закрывающая открытый попап по нажатию Esc
function closeOnButtonEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened)
  }
}

// функция закрывающая открытый попап нажадием мыши на задний фон
popups.forEach(elem => {
  elem.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(elem);
    };
  });
});

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
formTypeEditProfile.addEventListener('submit', handleFormSubmit);

// событие добавляющее карточку
formTypeAddCard.addEventListener('submit', event => {
  event.preventDefault();
  const obj = {
    name: popupTypeAddCardInputTitle.value,
    link: popupTypeAddCardInputLink.value,
  }
  addCard(obj);
  formTypeAddCard.reset();
  validTypeAddCard.enableValidation()
  closePopup(popupTypeAddCard);
});

//добавление карточек при загрузки страницы
initialCards.forEach(elem => addCard(elem));

//добавление анимации при открытии
function addPopupAnimation(elem){
  elem.classList.add('popup_animation');
};

popups.forEach(item => addPopupAnimation(item));



export {openPopup, popupTypeZoomImg, fillWithImage}
