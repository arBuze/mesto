const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
};

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

const disableButton = (button, inactiveButton) => {
  button.classList.add(inactiveButton);
  button.setAttribute('disabled', true);
};

const activateButton = (button, inactiveButton) => {
  button.classList.remove(inactiveButton);
  button.removeAttribute('disabled', true);
};

/* смена состояния кнопки сабмита*/
const toggleButtonState = (inputList, buttonElement, inactiveButton) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButton);
  } else {
    activateButton(buttonElement, inactiveButton);
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

enableValidation(settings);

const deleteError = form => {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  inputList.forEach(inputElement => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    hideInputError(inputElement, errorElement, settings);
  });
};
