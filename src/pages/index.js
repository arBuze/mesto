import './index.css';
import { initialCards, settings, editButton, addButton, photoContainer, popupFormEdit, nameInput, statusInput, popupFormCreate, formList,
  cardListSelector, nameSelector, statusSelector, popupAddCardSelector, popupProfileSelector, popupPhotoSelector } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

/* валидация форм */
formList.forEach(formElement => {
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
  });
})

const popupFormCreateValidation = new FormValidator(settings, popupFormCreate);
popupFormCreateValidation.enableValidation();

const popupFormEditValidation = new FormValidator(settings, popupFormEdit);
popupFormEditValidation.enableValidation();
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
    const card = createCard({name, link});
    const cardElement = card.generateCard();

    photoContainer.prepend(cardElement);
    formCreateCard.close();
  }
});

formCreateCard.setEventListeners();

/* попап с картинкой */
const popupWithPhoto = new PopupWithImage(popupPhotoSelector);
popupWithPhoto.setEventListeners();
/* ------------------------------------------- */

/* добавление начальных карточек */

const createCard = data => {
  return new Card('.photo-feed__item', data, popupWithPhoto.open.bind(popupWithPhoto));
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

cardList.renderItems();
/* ------------------------------------------- */

/* открытие попапов */
function openPopupEdit () {
  formProfile.open();
  const values = userInfo.getUserInfo();
  nameInput.value = values.name;
  statusInput.value = values.status;
  popupFormEditValidation.removeValidationErrors();
  popupFormEditValidation.activateButton();
}

editButton.addEventListener('click', openPopupEdit);

addButton.addEventListener('click', () => {
  formCreateCard.open();

  popupFormCreateValidation.disableButton();
  popupFormCreateValidation.removeValidationErrors();
});
