export const validationConfig = {
  formSelector: '.popup__form-admin',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
};

export const profile = document.querySelector('.profile');
export const profileBtnInfo = profile.querySelector('.profile__info-button');
export const selectorProfileTitle = '.profile__title';
export const selectorProfileSubtitle = '.profile__subtitle';
export const selectorProfileBtnAvatar = '.profile__avatar-image';
export const profileBtnAddCard = profile.querySelector('.profile__button');

export const popups = document.querySelectorAll('.popup');

export const selectorTypeEditProfile = '.popup_type_edit-profile';
const popupTypeEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupTypeEditProfileInputName = popupTypeEditProfile.querySelector('.popup__item_type_name');
export const popupTypeEditProfileInputActivity = popupTypeEditProfile.querySelector('.popup__item_type_activity');
export const formTypeEditProfile = document.forms.formProfile;

export const selectorTypeAddCard = '.popup_type_add-card';
export const formTypeAddCard = document.forms.formAdd;

export const selectorTypeZoomImg = '.popup_type_zoom-img';

export const selectorTypeQuestionRemove = '.popup_type_question-remove';

export const selectorTypeUpdateAvatar = '.popup_type_update-avatar';
export const btnUpdateAvatar = profile.querySelector('.profile__btn-avatar');
export const formTypeUpdateAvatar = document.forms.formUpdateAvatar;

export const gallery = document.querySelector('.gallery');
export const galleryCards = gallery.querySelector('.gallery__cards');
