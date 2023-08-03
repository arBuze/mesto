import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector, {handleCardDelete}) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector('.popup__save-btn');
    this._handleCardDelete = handleCardDelete;
  }

  open(cardElement, cardId) {
    super.open();
    this._cardElement = cardElement;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('click', () => {
      this._handleCardDelete(this._cardElement, this._cardId);
      this.close();
    }, false);
  }
}
