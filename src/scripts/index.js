import '../pages/index.css';

import {Card} from "./components/Card.js";
import {validationConfig} from './utils/const.js';
import {FormValidator} from "./components/FormValidator.js";
import {Section} from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithSubmit from "./components/PopupWithSubmit.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";
import {
  profileBtnInfo,
  profileBtnAddCard,
  selectorProfileTitle,
  selectorProfileSubtitle,
  selectorProfileBtnAvatar,
  popups,
  selectorTypeEditProfile,
  popupTypeEditProfileInputName,
  popupTypeEditProfileInputActivity,
  selectorTypeUpdateAvatar,
  btnUpdateAvatar,
  formTypeUpdateAvatar,
  formTypeEditProfile,
  selectorTypeAddCard,
  formTypeAddCard,
  selectorTypeZoomImg,
  galleryCards,
  selectorTypeQuestionRemove,
} from "./utils/const.js";

//ассинхронные запросы
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '2d501c6a-6776-4e0b-86d9-79075000c37d',
    'Content-Type': 'application/json'
  }
});

let userId

//инициализация информации о пользователе
const initialUserInfo = api.getInfoUser()
                          .then((data) => {
                            userId = data._id
                            userInfoProfile.setUserInfo(data.name, data.about, data.avatar)
                          })

//инициализация карточек
const initialCards = api.getInitialCards()
                      .then((data) => {
                        cardList.renderItems(data);
                      })

//отрисовка инициализации
Promise.all([initialUserInfo, initialCards])
  .catch((err) => {
    console.log(err);
  });

//валидация форм
const validTypeEditProfile = new FormValidator(validationConfig, formTypeEditProfile);
validTypeEditProfile.enableValidation()

const validTypeAddCard = new FormValidator(validationConfig, formTypeAddCard);
validTypeAddCard.enableValidation()

const validTypeUpdateAvatar = new FormValidator(validationConfig, formTypeUpdateAvatar);
validTypeUpdateAvatar.enableValidation()

//редактирование информации профиля
const userInfoProfile = new UserInfo({
  title: selectorProfileTitle,
  subtitle: selectorProfileSubtitle,
  btnAvatar: selectorProfileBtnAvatar,
})

const popupEditProfile = new PopupWithForm(
  selectorTypeEditProfile,
  {
    submitEvent: (inputData) => {
      api.giveInfoUser(inputData.name, inputData.activity)
        .then (()=> {
          userInfoProfile.setUserInfo(inputData.name, inputData.activity)
          popupEditProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          popupEditProfile.renderLoading(false)
        })
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

const popupQuestionRemove = new PopupWithSubmit(selectorTypeQuestionRemove, {
  clickEvent: (cardID, card) => {
    api.deletCard(cardID)
      .then(() => {
        card.remove();
        card = null;
        popupQuestionRemove.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
})

//функция создания карточки
function createCard(data) {
  const card = new Card(data, '#card', handleCardClick, popupQuestionRemove, userId, {
    giveLike: (cardId) => {
      api.giveLike(cardId)
        .then(data => {
          card.renderLikes(data.likes);
          card.handleLike();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletLike: (cardId) => {
      api.deletLike(cardId)
      .then(data => {
        card.renderLikes(data.likes);
        card.handleLike();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });
  const cardElement = card.generateCard();
  return cardElement
}

// Инициализация карточек по умолчанию
const cardList = new Section({
  renderer: (item) => {
    cardList.addInitialItem(createCard(item));
  }
}, galleryCards)

//добавление карточки
const popupAddCard = new PopupWithForm(
  selectorTypeAddCard,
  {
    submitEvent: (inputData) => {
      api.giveCard(inputData.name, inputData.link)
        .then(data => {
          cardList.addItem(createCard(data))
          popupAddCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          popupAddCard.renderLoading(false)
        });
    }
  }
)
popupAddCard.setEventListeners()

profileBtnAddCard.addEventListener('click', () => {
  validTypeAddCard.resetValidation()
  popupAddCard.open()
})

//обнавление аватара
const popupUpdateAvatar = new PopupWithForm(
  selectorTypeUpdateAvatar,
  {
    submitEvent: (inputData) => {
      api.giveAvatar(inputData.link)
        .then(data => {
          userInfoProfile.setUserInfo(data.name, data.activity, data.avatar)
          popupUpdateAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          popupUpdateAvatar.renderLoading(false)
        });
    }
  }
)
popupUpdateAvatar.setEventListeners()

btnUpdateAvatar.addEventListener('click', () => {
  validTypeUpdateAvatar.resetValidation()
  popupUpdateAvatar.open()
})

//увиличение картинки
const popupOpenImage = new PopupWithImage(selectorTypeZoomImg);
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
