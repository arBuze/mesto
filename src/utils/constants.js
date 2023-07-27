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

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
};

const content = document.querySelector('.content');
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

const photoContainer = content.querySelector('.photo-feed__list');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupFormEdit = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__item_el_name');
const statusInput = popupEditProfile.querySelector('.popup__item_el_status');

const popupCreateCard = document.querySelector('.popup_type_add-place');
const popupFormCreate = popupCreateCard.querySelector('.popup__form');

const formList = Array.from(document.querySelectorAll(settings.formSelector));

const cardListSelector = '.photo-feed__list';
const nameSelector = '.profile__name';
const statusSelector = '.profile__status';
const popupAddCardSelector = '.popup_type_add-place';
const popupProfileSelector = '.popup_type_edit-profile';
const popupPhotoSelector = '.popup_type_photo';

export { initialCards, settings, editButton, addButton, photoContainer, popupFormEdit, nameInput, statusInput, popupFormCreate, formList,
   cardListSelector, nameSelector, statusSelector, popupAddCardSelector, popupProfileSelector, popupPhotoSelector };
