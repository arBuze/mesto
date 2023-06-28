const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/photo-feed-karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/photo-feed-elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/photo-feed-dombai.jpg'
  },
  {
    name: 'Республика Коми',
    link: './images/photo-feed-komi.jpg'
  },
  {
    name: 'Москва',
    link: './images/photo-feed-church.jpg'
  },
  {
    name: 'Байкал',
    link: './images/photo-feed-baikal.jpg'
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

export {initialCards, settings};
