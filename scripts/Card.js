export default class Card {
  constructor(templateSelector, data, openPopupPhoto) {
    this._templateSelector = templateSelector;
    this._photo = data.link;
    this._description = data.name;
    this._cardTemplate = document.querySelector('#photo-card').content;
    this._openPopupPhoto = openPopupPhoto;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.querySelector(this._templateSelector).cloneNode(true);
    return cardElement;
  }

  _handleLike(evt) {
    evt.target.classList.toggle('like');
  }
  _handleDelete(evt) {
    evt.target.parentElement.remove();
  }
  _handlePhotoPopupOpen(evt) {
    this._openPopupPhoto(evt);
  }
  _setEventListeners() {
    this._element.querySelector('.photo-feed__del-btn').addEventListener('click', evt => {
      this._handleDelete(evt);
    });
    this._element.querySelector('.photo-feed__like-btn').addEventListener('click', evt => {
      this._handleLike(evt);
    });
    this._element.querySelector('.photo-feed__image').addEventListener('click', evt => {
      this._handlePhotoPopupOpen(evt);
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

