import './index.css';
import { settings, editButton, addButton, editAvatarButton, formList, formValidators,
  cardListSelector, nameSelector, statusSelector, avatarSelector,
  popupAddCardSelector, popupProfileSelector, popupPhotoSelector, popupEditAvatarSelector, popupDeleteSelector } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js'
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupDelete from '../components/PopupDelete';

/* валидация форм */
const enableValidation = settings => {
  formList.forEach(formElement => {
    const validator = new FormValidator(settings, formElement);

    formValidators[formElement.name] = validator;
    validator.enableValidation();
  })
};

enableValidation(settings);
/* ------------------------------------------- */

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: 'fb607b32-394f-4e87-82a1-6fb68bd11ca1',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({nameSelector, statusSelector, avatarSelector});

/* получение информации о пользователе */
api.getUserInfo()
  .then(result => {
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setUserAvatar(result.avatar);
  })
  .catch( err => {
    console.log(err);
  });
/* ------------------------------------------- */

const renderLoading = (button, text) => {
  button.value = text;
}

/* попапы */
/* попап c формой изменения профиля */
const formProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  handleFormSubmit: (formValues, submitButton) => {
    userInfo.setUserInfo(formValues.nickname, formValues.status);
    renderLoading(submitButton, 'Сохранение...');
    api.saveUserInfo(formValues.nickname, formValues.status)
      .catch( err => {
        console.log(err);
      })
      .finally(() => {
        formProfile.close();
        renderLoading(submitButton, 'Сохранить');
      });
  }
});

formProfile.setEventListeners();

/* попап с формой создания карточки */
const formCreateCard = new PopupWithForm({
  popupSelector: popupAddCardSelector,
  handleFormSubmit: (formValues, submitButton) => {
    const name = formValues.title;
    const link = formValues.link;

    renderLoading(submitButton, 'Создание...');
    api.addNewCard(name, link)
      .then(result => {
        const likes = result.likes;
        const _id = result._id;
        const owner = result.owner;
        const cardElement = createCard({name, link, likes, _id, owner});

        cardList.prependItem(cardElement);
      })
        .catch( err => {
          console.log(err);
        })
        .finally(() => {
          formCreateCard.close();
          renderLoading(submitButton, 'Создать');
        });

    formCreateCard.close();
  }
});

formCreateCard.setEventListeners();

/* попап с формой изменения автара */
const formEditAvatar = new PopupWithForm({
  popupSelector: popupEditAvatarSelector,
  handleFormSubmit: (formValues, submitButton) => {
    const link = formValues.avatar;
    userInfo.setUserAvatar(link);
    renderLoading(submitButton, 'Сохранение...');
    api.saveAvatar(link)
      .catch( err => {
       console.log(err);
      })
      .finally(() => {
        formEditAvatar.close();
        renderLoading(submitButton, 'Сохранить');
      });

    formEditAvatar.close();
  }
});

formEditAvatar.setEventListeners();

/* попап с картинкой */
const popupWithPhoto = new PopupWithImage(popupPhotoSelector);
popupWithPhoto.setEventListeners();

/* попап с подтверждением на удаление карточки */
const popupDelete = new PopupDelete(popupDeleteSelector, {
  handleCardDelete: (cardElement, cardId) => {
    api.deleteCard(cardId)
    .then(cardElement.remove())
    .catch( err => {
      console.log(err);
    });
  }
});

popupDelete.setEventListeners();
/* ------------------------------------------- */

const handleCardClick = (name, link) => {
  popupWithPhoto.open(name, link);
}

const createCard = data => {
  const card = new Card('#photo-card', data, handleCardClick,{
    handleDeleteBtnClick: (cardElement, cardId) => {
      popupDelete.open(cardElement, cardId);
    },
    handleLikeBtnClick: (cardId, isLiked) => {
      if(isLiked) {
        api.unlikeCard(cardId)
          .then(res => {
            card.renderLikes(res.likes);
          })
          .catch( err => {
            console.log(err);
          });
      } else {
        api.likeCard(cardId)
          .then(res => {
            card.renderLikes(res.likes);
          })
          .catch( err => {
            console.log(err);
          });
      }
    }
  });
  return card.generateCard();
}

/* добавление начальных карточек */
const cardList = new Section({
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    }
  }, cardListSelector);

api.getInitialCards()
  .then(result => {
    cardList.renderItems(result);
  })
  .catch( err => {
    console.log(err);
  });
/* ------------------------------------------- */

/* открытие попапов */
function openPopupEdit () {
  formProfile.open();
  const values = userInfo.getUserInfo();
  formProfile.setInputValues(values);
  formValidators['profile-form'].removeValidationErrors();
  formValidators['profile-form'].activateButton();
}

editButton.addEventListener('click', openPopupEdit);

addButton.addEventListener('click', () => {
  formCreateCard.open();

  formValidators['card-form'].disableButton();
  formValidators['card-form'].removeValidationErrors();
});

editAvatarButton.addEventListener('click', () => {
  formEditAvatar.open();

  formValidators['avatar-form'].disableButton();
  formValidators['avatar-form'].removeValidationErrors();
})
