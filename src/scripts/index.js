import '../pages/index.css';

import {Card} from "./components/Card.js";
import {initialCards, validationConfig} from './utils/const.js';
import {FormValidator} from "./components/FormValidator.js";
import {Section} from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import {
  profileBtnInfo,
  profileTitle,
  profileSubtitle,
  profileBtnAddCard,
  popups,
  popupTypeEditProfile,
  popupTypeEditProfileInputName,
  popupTypeEditProfileInputActivity,
  formTypeEditProfile,
  popupTypeAddCard,
  formTypeAddCard,
  popupTypeZoomImg,
  galleryCards,
} from "./utils/const.js";

//валидация форм
const validTypeEditProfile = new FormValidator(validationConfig, formTypeEditProfile);
validTypeEditProfile.enableValidation()

const validTypeAddCard = new FormValidator(validationConfig, formTypeAddCard);
validTypeAddCard.enableValidation()

//редактирование информации профиля
const userInfoProfile = new UserInfo(profileTitle, profileSubtitle)

const popupEditProfile = new PopupWithForm(
  popupTypeEditProfile,
  {
    submitEvent: (inputData) => {
      userInfoProfile.setUserInfo(inputData.name, inputData.activity)
      popupEditProfile.close();
    }
  }
)
popupEditProfile.setEventListeners()

profileBtnInfo.addEventListener('click', () => {
  const inputData = userInfoProfile.getUserInfo()
  popupTypeEditProfileInputName.value = inputData.name
  popupTypeEditProfileInputActivity.value = inputData.activity
  validTypeEditProfile.resetValidation()
  popupEditProfile.open()
})

//функция создания карточки
function createCard(data) {
  const card = new Card(data, '#card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

// Инициализация карточек по умолчанию
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, galleryCards)

//добавление карточки
const popupAddCard = new PopupWithForm(
  popupTypeAddCard,
  {
    submitEvent: (inputData) => {
      cardList.addItem(createCard(inputData));

      popupAddCard.close();
      validTypeAddCard.resetValidation()
    }
  }
)
popupAddCard.setEventListeners()

profileBtnAddCard.addEventListener('click', () => {
  popupAddCard.open()
})

cardList.renderItems();

//увиличение картинки
const popupOpenImage = new PopupWithImage(popupTypeZoomImg);
popupOpenImage.setEventListeners()

//функция обрабатывающая клик по картинки карточки
function handleCardClick(name, link) {
  popupOpenImage.open(name, link);
}

//добавление анимации при открытии
function addPopupAnimation(elem){
  elem.classList.add('popup_animation');
};

popups.forEach(item => addPopupAnimation(item));
