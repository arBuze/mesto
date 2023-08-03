import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector, {handleCardDelete}) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector('.popup__save-btn');
    this._handleCardDelete = handleCardDelete;
  }

  open(item, itemId) {
    super.open();
    this._item = item;
    this._itemId = itemId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('click', () => {
      this._handleCardDelete(this._item, this._itemId);
    }, false);
  }
}
