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
const popupTypeEditProfileInputName = popupTypeEditProfile.querySelector('.popup__item_type_name');
const popupTypeEditProfileInputActivity = popupTypeEditProfile.querySelector('.popup__item_type_activity');
const formTypeEditProfile = document.forms.formProfile;

const popupTypeAddCard = document.querySelector('.popup_type_add-card');
const popupTypeAddCardInputTitle = popupTypeAddCard.querySelector('.popup__item_type_title');
const popupTypeAddCardInputLink = popupTypeAddCard.querySelector('.popup__item_type_link');
const formTypeAddCard = document.forms.formAdd;

const popupTypeZoomImg = document.querySelector('.popup_type_zoom-img');
const popupImage = popupTypeZoomImg.querySelector('.popup__image');
const popupSignature = popupTypeZoomImg.querySelector('.popup__signature');

const gallery = document.querySelector('.gallery');
const galleryCards = gallery.querySelector('.gallery__cards');


//функция обрабатывающая клик по картинки карточки
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = `изображение: ${name}`;
  popupSignature.textContent = name;
  openPopup(popupTypeZoomImg);
}


//валидация форм
const validTypeEditProfile = new FormValidator(validationConfig, formTypeEditProfile);
validTypeEditProfile.enableValidation()

const validTypeAddCard = new FormValidator(validationConfig, formTypeAddCard);
validTypeAddCard.enableValidation()

//функция создающая карточку
function createCard(obj) {
  const card = new Card(obj, '#card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//функция добавляющая карточку
function addCard(obj){
  const card = createCard(obj)
  galleryCards.prepend(card);
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

//событие закрытия попапа по клику на оверлей и крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
})


// события открывающее popup
profileBtnInfo.addEventListener('click', () => {
  openPopup(popupTypeEditProfile);
  fillWithText();
  validTypeEditProfile.resetValidation()
});
profileBtnAddCard.addEventListener('click', () => {
  formTypeAddCard.reset();
  validTypeAddCard.resetValidation()
  openPopup(popupTypeAddCard)
});

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
  closePopup(popupTypeAddCard);
});

//добавление карточек при загрузки страницы
initialCards.forEach(elem => addCard(elem));

//добавление анимации при открытии
function addPopupAnimation(elem){
  elem.classList.add('popup_animation');
};

popups.forEach(item => addPopupAnimation(item));
