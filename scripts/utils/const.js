export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.popup__form-admin',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
};

export const profile = document.querySelector('.profile');
export const profileBtnInfo = profile.querySelector('.profile__info-button');
export const profileTitle = profile.querySelector('.profile__title');
export const profileSubtitle = profile.querySelector('.profile__subtitle');
export const profileBtnAddCard = profile.querySelector('.profile__button');

export const popups = document.querySelectorAll('.popup');

export const popupTypeEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupTypeEditProfileInputName = popupTypeEditProfile.querySelector('.popup__item_type_name');
export const popupTypeEditProfileInputActivity = popupTypeEditProfile.querySelector('.popup__item_type_activity');
export const formTypeEditProfile = document.forms.formProfile;

export const popupTypeAddCard = document.querySelector('.popup_type_add-card');
export const formTypeAddCard = document.forms.formAdd;

export const popupTypeZoomImg = document.querySelector('.popup_type_zoom-img');
export const popupImage = popupTypeZoomImg.querySelector('.popup__image');
export const popupSignature = popupTypeZoomImg.querySelector('.popup__signature');

export const gallery = document.querySelector('.gallery');
export const galleryCards = gallery.querySelector('.gallery__cards');
