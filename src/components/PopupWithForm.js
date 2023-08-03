import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupElement.querySelectorAll('.popup__item');
    this._submitButton = this._formElement.querySelector('.popup__save-btn');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._submitButton);
    }, false);
  }
}
