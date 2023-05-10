const showInputError = (inputElement, errorElement, errorMessage, form) => {
  inputElement.classList.add(form.inputErrorClass);
  errorElement.classList.add(form.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, errorElement, form) => {
  inputElement.classList.remove(form.inputErrorClass);
  errorElement.classList.remove(form.errorClass);
  errorElement.textContent = '';
}

/* проверка валидности инпута */
const checkInputValidity = (formElement, inputElement, form) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputElement.validationMessage, form);
  } else {
    hideInputError(inputElement, errorElement, form);
  }
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

/* смена состояния кнопки сабмита*/
const toggleButtonState = (inputList, buttonElement, inactiveButton) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButton);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButton);
    buttonElement.removeAttribute('disabled', true);
  }
};

const setEventListeners = (formElement, form) => {
  const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
  const buttonElement = formElement.querySelector(form.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, form.inactiveButtonClass);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, form);
      toggleButtonState(inputList, buttonElement, form.inactiveButtonClass);
    });
  });
};


const enableValidation = (form) => {
  const formList = Array.from(document.querySelectorAll(form.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, form);
  })
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
});
