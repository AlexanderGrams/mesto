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
  profileTitle,
  profileSubtitle,
  profileBtnAvatar,
  profileBtnAddCard,
  popups,
  popupTypeEditProfile,
  popupTypeEditProfileInputName,
  popupTypeEditProfileInputActivity,
  popupTypeUpdateAvatar,
  btnUpdateAvatar,
  formTypeUpdateAvatar,
  formTypeEditProfile,
  popupTypeAddCard,
  formTypeAddCard,
  popupTypeZoomImg,
  galleryCards,
  popupTypeQuestionRemove
} from "./utils/const.js";

//валидация форм
const validTypeEditProfile = new FormValidator(validationConfig, formTypeEditProfile);
validTypeEditProfile.enableValidation()

const validTypeAddCard = new FormValidator(validationConfig, formTypeAddCard);
validTypeAddCard.enableValidation()

const validTypeUpdateAvatar = new FormValidator(validationConfig, formTypeUpdateAvatar);
validTypeUpdateAvatar.enableValidation()

//редактирование информации профиля
const userInfoProfile = new UserInfo(profileTitle, profileSubtitle, profileBtnAvatar)

const popupEditProfile = new PopupWithForm(
  popupTypeEditProfile,
  {
    submitEvent: (inputData) => {
      api.giveInfoUser(inputData.name, inputData.activity)
        .then (()=> {
          popupEditProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          popupEditProfile.renderLoading(false)
        })

      userInfoProfile.setUserInfo(inputData.name, inputData.activity)
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

const popupQuestionRemove = new PopupWithSubmit(popupTypeQuestionRemove, {
  clickEvent: (userID) => {
    api.deletCard(userID)
      .catch((err) => {
        console.log(err);
      });
  },
})
popupQuestionRemove.setEventListeners()

//функция создания карточки
function createCard(data) {
  const card = new Card(data, '#card', handleCardClick, popupQuestionRemove, {
    giveLike: (cardId) => {
      api.giveLike(cardId)
        .then(data => {
          card.renderLikes(data.likes)
          card._likeArray = data.likes
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletLike: (cardId) => {
      api.deletLike(cardId)
      .then(data => {
        card.renderLikes(data.likes)
        card._likeArray = data.likes
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
  popupTypeAddCard,
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

      validTypeAddCard.resetValidation()
    }
  }
)
popupAddCard.setEventListeners()

profileBtnAddCard.addEventListener('click', () => {
  popupAddCard.open()
})

//обнавление аватара
const popupUpdateAvatar = new PopupWithForm(
  popupTypeUpdateAvatar,
  {
    submitEvent: (inputData) => {
      api.giveAvatar(inputData.link)
        .then(data => {
          profileBtnAvatar.style.backgroundImage = `url(${data.avatar})`;
          popupUpdateAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          popupUpdateAvatar.renderLoading(false)
        });

      validTypeUpdateAvatar.resetValidation()
    }
  }
)
popupUpdateAvatar.setEventListeners()

btnUpdateAvatar.addEventListener('click', () => {
  popupUpdateAvatar.open()
})

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


//ассинхронные запросы
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '2d501c6a-6776-4e0b-86d9-79075000c37d',
    'Content-Type': 'application/json'
  }
});

//наполнение профиля данными
api.getInfoUser()
  .then((data) => {
    userInfoProfile.setUserInfo(data.name, data.about, data.avatar)
    return data
  })
  .catch((err) => {
    console.log(err);
  });

//добавление карточек
api.getInitialCards()
  .then((data) => {
    cardList.renderItems(data);
    return data;
  })
  .catch((err) => {
    console.log(err);
  });
