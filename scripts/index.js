import { initialCards, settings } from './constants.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

const content = document.querySelector('.content');
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

const photoContainer = content.querySelector('.photo-feed__list');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupFormEdit = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__item_el_name');
const statusInput = popupEditProfile.querySelector('.popup__item_el_status');
const nickname = content.querySelector('.profile__name');
const profileStatus = content.querySelector('.profile__status');
const popupEditSaveBtn = popupEditProfile.querySelector('.popup__save-btn');

const popupCreateCard = document.querySelector('.popup_type_add-place');
const popupFormCreate = popupCreateCard.querySelector('.popup__form');
const titleInput = popupCreateCard.querySelector('.popup__item_el_title');
const linkInput = popupCreateCard.querySelector('.popup__item_el_link');
const popupCreateSaveBtn = popupCreateCard.querySelector('.popup__save-btn');

const popupShowPhoto = document.querySelector('.popup_type_photo');
const photo = popupShowPhoto.querySelector('.popup__photo');
const caption = popupShowPhoto.querySelector('.popup__caption');

const popupList = Array.from(document.querySelectorAll('.popup'));

const createCard = data => {
  return new Card('.photo-feed__item', data, openPopupPhoto);
}

/* добавление начальных карточек */
initialCards.forEach( info => {
  const card = createCard(info);
  const cardElement = card.generateCard();

  photoContainer.append(cardElement);
});

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

/* функция открытия всплывающего окна */
function openPopup(popupType) {
  document.addEventListener('keydown', closeByEscape);
  popupType.classList.add('popup_opened');
}

/* валидация форм */
const formList = Array.from(document.querySelectorAll(settings.formSelector));
formList.forEach(formElement => {
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
  });
})

const popupFormCreateValidation = new FormValidator(settings, popupFormCreate);
popupFormCreateValidation.enableValidation();

const popupFormEditValidation = new FormValidator(settings, popupFormEdit);
popupFormEditValidation.enableValidation();

const deleteError = form => {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  inputList.forEach(inputElement => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  });
};

function openPopupEdit () {
  openPopup(popupEditProfile);
  nameInput.value = nickname.textContent;
  statusInput.value = profileStatus.textContent;
  popupFormEditValidation.removeValidationErrors();
  popupFormEditValidation.activateButton();
/*   popupEditSaveBtn.classList.remove(settings.inactiveButtonClass);
  popupEditSaveBtn.removeAttribute('disabled', true); */
}

function openPopupPhoto(evt) {
  openPopup(popupShowPhoto);
  photo.src = evt.target.src;
  photo.alt = evt.target.alt;

  caption.textContent = evt.target.parentElement.querySelector('.photo-feed__heading').textContent;
}

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', () => {
  openPopup(popupCreateCard);
  popupFormCreate.reset();

  popupFormCreateValidation.disableButton();
  popupFormCreateValidation.removeValidationErrors();
});

/* функция закрытия всплывающего окна */
function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

popupList.forEach(popupElement => {
  popupElement.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup__close-btn') || evt.target.classList.contains('popup__save-btn') || evt.target.classList.contains('popup')) {
      closePopup(popupElement);
    }
  });
});

/* функция-обработчик отправки формы */
function editProfile (evt) {
  evt.preventDefault();

  nickname.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
}

popupFormEdit.addEventListener('submit', editProfile, false);

function addCard(evt) {
  evt.preventDefault();

  const link = linkInput.value;
  const name = titleInput.value;
  const card = createCard({name, link});
  const cardElement = card.generateCard();

  photoContainer.prepend(cardElement);
  popupCreateCard.reset();
}

popupFormCreate.addEventListener('submit', addCard, false);
