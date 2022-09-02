let profile = document.querySelector('.profile');
let profileBtnInfo = profile.querySelector('.profile__info-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let popupBtnClose = popup.querySelector('.popup__close');
let popupInputName = popup.querySelector('.popup__input_type_name');
let popupInputActivity = popup.querySelector('.popup__input_type_activity');
let formElement = popup.querySelector('.popup__form-admin');



// функция сохраняющая измененные данные
function formSubmitHandler(event){
  event.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputActivity.value;
  closePopup();
};

// функция заполняющая текстом значения в полях ввода
function fillingWithText(){
  popupInputName.value = profileTitle.textContent;
  popupInputActivity.value = profileSubtitle.textContent;
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
popupBtnClose.addEventListener('click', closePopup);

// событие сохраняющее изменненные данные
formElement.addEventListener('submit', formSubmitHandler);

