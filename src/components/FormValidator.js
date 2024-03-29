export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = errorMessage;
  }
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }
  /* проверка валидности инпута */
  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  /* смена состояния кнопки сабмита*/
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButton();
    } else {
      this.activateButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });
  }

  disableButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }
  activateButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', true);
  }

  removeValidationErrors() {
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

