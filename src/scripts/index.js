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
  popupImage,
  popupSignature,
  galleryCards,
} from "./utils/const.js";





///////////////////
//валидация форм
const validTypeEditProfile = new FormValidator(validationConfig, formTypeEditProfile);
validTypeEditProfile.enableValidation()

const validTypeAddCard = new FormValidator(validationConfig, formTypeAddCard);
validTypeAddCard.enableValidation()




/////////////////////////////////////
//редактирование информации профиля
const userInfoProfile = new UserInfo(profileTitle.textContent, profileSubtitle.textContent, profileTitle, profileSubtitle)

const popupEditProfile = new PopupWithForm(
  popupTypeEditProfile,
  {
    submitEvent: (obj) => {
      userInfoProfile.setUserInfo(obj.name, obj.activity)
      popupEditProfile.close();
    }
  }
)
popupEditProfile.setEventListeners()

profileBtnInfo.addEventListener('click', () => {
  userInfoProfile.getUserInfo(popupTypeEditProfileInputName, popupTypeEditProfileInputActivity)
  validTypeEditProfile.resetValidation()
  popupEditProfile.open()
})



//////////////////////////////////////
// Инициализация карточек по умолчанию
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card', handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, galleryCards)




//////////////////////////
//добавление карточки
const popupAddCard = new PopupWithForm(
  popupTypeAddCard,
  {
    submitEvent: (obj) => {
      cardList.renderItems(obj);
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


///////////////////////////
//увиличение картинки
const popupOpenImage = new PopupWithImage(popupTypeZoomImg);
popupOpenImage.setEventListeners()

//функция обрабатывающая клик по картинки карточки
function handleCardClick(name, link) {
  popupOpenImage.open(name, link, popupImage, popupSignature);
}




//////////////////////////////////
//добавление анимации при открытии
function addPopupAnimation(elem){
  elem.classList.add('popup_animation');
};

popups.forEach(item => addPopupAnimation(item));
