const content = document.querySelector('.content');
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

const photoContainer = content.querySelector('.photo-feed__list');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupFormEdit = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__item_el_name');
const statusInput = popupEditProfile.querySelector('.popup__item_el_status');
const nickname = content.querySelector('.profile__name');
const profileStatus = content.querySelector('.profile__status');
const editCloseBtn = popupEditProfile.querySelector('.popup__close-btn');

const popupCreateCard = document.querySelector('.popup_type_add-place');
const popupFormCreate = popupCreateCard.querySelector('.popup__form');
const titleInput = popupCreateCard.querySelector('.popup__item_el_title');
const linkInput = popupCreateCard.querySelector('.popup__item_el_link');
const createCloseBtn = popupCreateCard.querySelector('.popup__close-btn');

const popupShowPhoto = document.querySelector('.popup_type_photo');
const photo = popupShowPhoto.querySelector('.popup__photo');
const caption = popupShowPhoto.querySelector('.popup__caption');
const photoCloseBtn = popupShowPhoto.querySelector('.popup__close-btn');

const popupList = Array.from(document.querySelectorAll('.popup'));
const cardTemplate = document.querySelector('#photo-card').content;

/* функция создания карточки */
const createCard = (photo, description) => {
  const cardElement = cardTemplate.querySelector('.photo-feed__item').cloneNode(true);
  const photoElement = cardElement.querySelector('.photo-feed__image');

  photoElement.src = photo;
  photoElement.alt = description;
  cardElement.querySelector('.photo-feed__heading').textContent = description;

  return cardElement;
}

/* вешаем обработчики событий */
photoContainer.addEventListener('click', evt => {
  if (evt.target.classList.contains('photo-feed__image')) {
    popupOpenPhoto(evt);
  }
  if (evt.target.classList.contains('photo-feed__like-btn')) {
    evt.target.classList.toggle('like');
  }
  if (evt.target.classList.contains('photo-feed__del-btn')) {
    evt.target.parentElement.remove();
  }
});

initialCards.forEach( info => {
  const photo = info.link;
  const description = info.name;
  photoContainer.append(createCard(photo, description));
});

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    popupClose(document.querySelector('.popup_opened'));
  }
}

/* функция открытия всплывающего окна */
function popupOpen(popupType) {
  document.addEventListener('keydown', keyHandler);
  popupType.classList.add('popup_opened');
}

function popupOpenEdit () {
  popupOpen(popupEditProfile);
  nameInput.value = nickname.textContent;
  statusInput.value = profileStatus.textContent;
}

function popupOpenPhoto (evt) {
  popupOpen(popupShowPhoto);
  photo.src = evt.target.src;
  photo.alt = evt.target.alt;

  caption.textContent = evt.target.parentElement.querySelector('.photo-feed__heading').textContent;
}

editButton.addEventListener('click', popupOpenEdit);
addButton.addEventListener('click', () => {
  popupOpen(popupCreateCard);
  titleInput.value = '';
  linkInput.value = '';
});

/* функция закрытия всплывающего окна */
function popupClose(popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

popupList.forEach(popupElement => {
  popupElement.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup__close-btn') || evt.target.classList.contains('popup__save-btn') || evt.target.classList.contains('popup')) {
      popupClose(popupElement);
    }
  });
});

/* функция-обработчик отправки формы */
function profileEdit (evt) {
  evt.preventDefault();

  nickname.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;
}

popupFormEdit.addEventListener('submit', profileEdit, false);

function cardAdd(evt) {
  evt.preventDefault();

  const photo = linkInput.value;
  const description = titleInput.value;

  photoContainer.prepend(createCard(photo, description));

  titleInput.value = '';
  linkInput.value = '';
}

popupFormCreate.addEventListener('submit', cardAdd, false);
