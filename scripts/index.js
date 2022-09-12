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
const popupTitleTypeZoomImg = popupTypeZoomImg.querySelector('.popup__title_type_zoom-img');


const gallery = document.querySelector('.gallery');
const galleryCards = gallery.querySelector('.gallery__cards');

const cardTemplate = document.querySelector('#card').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//функция создающая карточку
function addCard(name, link){
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = `изображение: ${name}`;
  card.querySelector('.card__title').textContent = name;

  const cardBtnLike = card.querySelector('.card__like');
  cardBtnLike.addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_active');
  });

  const cardBtnBasket = card.querySelector('.card__basket');
  cardBtnBasket.addEventListener('click', () => card.remove());

  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', evt => {
    openPopup(popupTypeZoomImg);
    fillingWithImage(evt, name);
  });

  galleryCards.prepend(card);
};

// функция сохраняющая измененные данные
function formSubmitHandler(event){
  event.preventDefault();
  profileTitle.textContent = popupTypeEditProfileInputName.value;
  profileSubtitle.textContent = popupTypeEditProfileInputActivity.value;
  closePopup();
};

// функция заполняющая текстом значения в полях ввода
function fillingWithText(){
  popupTypeEditProfileInputName.value = profileTitle.textContent;
  popupTypeEditProfileInputActivity.value = profileSubtitle.textContent;
};

// функция заполняющая попап картинкой
function fillingWithImage(evt, name){
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupTitleTypeZoomImg.textContent = name;
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
  fillingWithText();
});
profileBtnAddCard.addEventListener('click', () => openPopup(popupTypeAddCard));

// события закрывающее popup
popupTypeEditProfileBtnClose.addEventListener('click', () => closePopup(popupTypeEditProfile));
popupTypeAddCardBtnClose.addEventListener('click', () => closePopup(popupTypeAddCard));
popupTypeZoomImgBtnClose.addEventListener('click', () => closePopup(popupTypeZoomImg));

// событие сохраняющее изменненные данные
formTypeEditProfile.addEventListener('submit', formSubmitHandler);

formTypeAddCard.addEventListener('submit', event => {
  event.preventDefault();
  addCard(popupTypeAddCardInputTitle.value, popupTypeAddCardInputLink.value);
  popupTypeAddCardInputTitle.value = '';
  popupTypeAddCardInputLink.value = '';
  closePopup(popupTypeAddCard);
});

//добавление карточек при загрузки страницы
initialCards.forEach(elem => addCard(elem.name, elem.link));
