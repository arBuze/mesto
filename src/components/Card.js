export default class Card {
  constructor(templateSelector, data, handleCardClick) {
    this._templateSelector = templateSelector;
    this._photo = data.link;
    this._description = data.name;
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.querySelector('.photo-feed__item').cloneNode(true);
    return cardElement;
  }

  _handleLike(evt) {
    evt.target.classList.toggle('like');
  }
  _handleDelete() {
    this._element.remove();
  }
  _handlePhotoPopupOpen() {
    this._handleCardClick(this._description, this._photo);
  }
  _setEventListeners() {
    this._element.querySelector('.photo-feed__del-btn').addEventListener('click', evt => {
      this._handleDelete(evt);
    });
    this._element.querySelector('.photo-feed__like-btn').addEventListener('click', evt => {
      this._handleLike(evt);
    });
    this._photoElement.addEventListener('click', () => {
      this._handlePhotoPopupOpen();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photoElement = this._element.querySelector('.photo-feed__image');

    this._setEventListeners();

    this._photoElement.src = this._photo;
    this._photoElement.alt = this._description;
    this._element.querySelector('.photo-feed__heading').textContent = this._description;

    return this._element;
  }
}

