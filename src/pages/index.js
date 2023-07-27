import './index.css';
import { initialCards, settings, editButton, addButton, formList, formValidators,
  cardListSelector, nameSelector, statusSelector, popupAddCardSelector, popupProfileSelector, popupPhotoSelector } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

/* валидация форм */
const enableValidation = settings => {
  formList.forEach(formElement => {
    const validator = new FormValidator(settings, formElement);

    formValidators[formElement.name] = validator;
    validator.enableValidation();
  })
};

enableValidation(settings);
/* ------------------------------------------- */

const userInfo = new UserInfo({nameSelector, statusSelector});

/* попапы */
/* попап c формой изменения профиля */
const formProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: (formValues) => {
    userInfo.setUserInfo(formValues.nickname, formValues.status);
  }
});

formProfile.setEventListeners();

/* попап с формой создания карточки */
const formCreateCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: (formValues) => {
    const name = formValues.title;
    const link = formValues.link;
    const cardElement = createCard({name, link});

    cardList.prependItem(cardElement);
    formCreateCard.close();
  }
});

formCreateCard.setEventListeners();

/* попап с картинкой */
const popupWithPhoto = new PopupWithImage(popupPhotoSelector);
popupWithPhoto.setEventListeners();
/* ------------------------------------------- */

/* добавление начальных карточек */

const handleCardClick = (name, link) => {
  popupWithPhoto.open(name, link);
}

const createCard = data => {
  const card = new Card('#photo-card', data, handleCardClick);
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, cardListSelector);

cardList.renderItems();

/* ------------------------------------------- */

/* открытие попапов */
function openPopupEdit () {
  formProfile.open();
  const values = userInfo.getUserInfo();
  formProfile.setInputValues(values);
  formValidators['profile-form'].removeValidationErrors();
  formValidators['profile-form'].activateButton();
}

editButton.addEventListener('click', openPopupEdit);

addButton.addEventListener('click', () => {
  formCreateCard.open();

  formValidators['card-form'].disableButton();
  formValidators['card-form'].removeValidationErrors();
});
