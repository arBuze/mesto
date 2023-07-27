import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.popup__item');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    this._formElement = this._popupElement.querySelector('.popup__form');
    super.setEventListeners();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
      this.close();
    }, false);
  }
}
