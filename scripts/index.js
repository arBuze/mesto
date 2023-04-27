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

const cardTemplate = document.querySelector('#photo-card').content;

/* функция создания карточки */
const createCard = (photo, description) => {
  const cardElement = cardTemplate.querySelector('.photo-feed__item').cloneNode(true);
  const photoElement = cardElement.querySelector('.photo-feed__image');
  photoElement.src = photo;
  photoElement.alt = description;
  cardElement.querySelector('.photo-feed__heading').textContent = description;

  cardElement.querySelector('.photo-feed__image').addEventListener('click', evt => {
    popupOpenPhoto(evt);
  });
  cardElement.querySelector('.photo-feed__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('like');
  });
  cardElement.querySelector('.photo-feed__del-btn').addEventListener('click', evt => {
    evt.target.parentElement.remove();
  });

  return cardElement;
}

initialCards.forEach( info => {
  const photo = info.link;
  const description = info.name;
  photoContainer.append(createCard(photo, description));
});

/* функция открытия всплывающего окна */
function popupOpen(popupType) {
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
});

/* функция закрытия всплывающего окна */
function popupClose(popupType) {
  popupType.classList.remove('popup_opened');
}

editCloseBtn.addEventListener('click', () => {
  popupClose(popupEditProfile);
});
createCloseBtn.addEventListener('click', () => {
  popupClose(popupCreateCard);
});
photoCloseBtn.addEventListener('click', () => {
  popupClose(popupShowPhoto);
});

/* функция-обработчик отправки формы */
function profileEdit (evt) {
  evt.preventDefault();

  nickname.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;

  popupClose(popupEditProfile);
}

popupFormEdit.addEventListener('submit', profileEdit, false);

function cardAdd(evt) {
  evt.preventDefault();

  const photo = linkInput.value;
  const description = titleInput.value;

  photoContainer.prepend(createCard(photo, description));

  titleInput.value = '';
  linkInput.value = '';

  popupClose(popupCreateCard);
}

popupFormCreate.addEventListener('submit', cardAdd, false);
