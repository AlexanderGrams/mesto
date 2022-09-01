let profile = document.querySelector('.profile');
let profileBtnInfo = profile.querySelector('.profile__info-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupBtnCloce = popup.querySelector('.popup__close');
let popupItemName = popup.querySelector('.popup__item_name');
let popupItemActivity = popup.querySelector('.popup__item_activity');
let popupBtnSave = popup.querySelector('.popup__form-admin');



// функция сохраняющая измененные данные
function formSubmitHandler(event){
  event.preventDefault();
  profileTitle.textContent = popupItemName.value;
  profileSubtitle.textContent = popupItemActivity.value;
  closePopup();
};

// функция заполняющая текстом значения в полях ввода
function fillingWithText(){
  popupItemName.value = profileTitle.textContent;
  popupItemActivity.value = profileSubtitle.textContent;
};

// функция открывающая popup
function openPopup(){
  popup.classList.add('popup_opened');
  fillingWithText();
};

// функция закрывающая popup
function closePopup(){
  popup.classList.remove('popup_opened');
};



// событие открывающее popup
profileBtnInfo.addEventListener('click', openPopup);

// событие закрывающее popup
popupBtnCloce.addEventListener('click', closePopup);

// событие сохраняющее изменненные данные
popupBtnSave.addEventListener('submit', formSubmitHandler);

