export default class Card {
  constructor(templateSelector, data, handleCardClick,{ handleDeleteBtnClick, handleLikeBtnClick }) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._photo = data.link;
    this._description = data.name;
    this._id = data._id;
    this._owner = data.owner._id;
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleLikeBtnClick = handleLikeBtnClick;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.querySelector('.photo-feed__item').cloneNode(true);
    return cardElement;
  }

  _handleLike() {
    this._handleLikeBtnClick(this._id, this._isLiked());
  }
  _handleDelete() {
    this._handleDeleteBtnClick(this._element, this._id);
  }
  _handlePhotoPopupOpen() {
    this._handleCardClick(this._description, this._photo);
  }
  _setEventListeners() {
    if(this._cardIsMine) {
      this._deleteButton.addEventListener('click', evt => {
        this._handleDelete();
      });
    }
    this._likeButton.addEventListener('click', evt => {
      this._handleLike();
    });
    this._photoElement.addEventListener('click', () => {
      this._handlePhotoPopupOpen();
    });
  }

  _isLiked() {
    return this._likes.find((user) => user._id === 'e9042d29f1da890bf70744e6');
  }

  renderLikes(likes) {
    this._likes = likes;
    this._likesNumberElement.textContent = this._likes.length;
    if(this._isLiked()) {
      this._likeButton.classList.add('like');
    } else {
      this._likeButton.classList.remove('like');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photoElement = this._element.querySelector('.photo-feed__image');
    this._likesNumberElement = this._element.querySelector('.photo-feed__likes-num');
    this._likeButton = this._element.querySelector('.photo-feed__like-btn');
    this._deleteButton = this._element.querySelector('.photo-feed__del-btn');
    this._cardIsMine = (this._owner === 'e9042d29f1da890bf70744e6');

    this._setEventListeners();

    this._photoElement.src = this._photo;
    this._photoElement.alt = this._description;
    this._element.querySelector('.photo-feed__heading').textContent = this._description;
    this.renderLikes(this._data.likes);

    if(!this._cardIsMine) {
      this._deleteButton.remove();
    }
    return this._element;
  }
}

