/* import { initialCards } from './constants'; */

const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/photo-feed-karachaevsk.jpg',
  },
  {
    name: 'Гора Эльбрус',
    link: '../images/photo-feed-elbrus.jpg',
  },
  {
    name: 'Домбай',
    link: '../images/photo-feed-dombai.jpg',
  },
  {
    name: 'Республика Коми',
    link: '../images/photo-feed-komi.jpg',
  },
  {
    name: 'Москва',
    link: './images/photo-feed-church.jpg',
  },
  {
    name: 'Байкал',
    link: './images/photo-feed-baikal.jpg',
  }
];

const content = document.querySelector('.content');
const editButton = document.querySelector('.profile__edit-btn');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupFormEdit = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__item_el_name');
const statusInput = popupEditProfile.querySelector('.popup__item_el_status');
const nickname = content.querySelector('.profile__name');
const profileStatus = content.querySelector('.profile__status');

const photoContainer = content.querySelector('.photo-feed__list');
/* const likeButton = document.querySelectorAll('.photo-feed__like-btn');
const deleteButton = 11; */

const cardTemplate = document.querySelector('#photo-card').content;

const createCard = (photo, description) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.photo-feed__image').src = photo;
  cardElement.querySelector('.photo-feed__heading').textContent = description;

  cardElement.querySelector('.photo-feed__like-btn').addEventListener('click', evt => {
    evt.target.classList.toggle('like');
  });
  cardElement.querySelector('.photo-feed__del-btn').addEventListener('click', evt => {
    evt.target.parentElement.remove();
  });

  photoContainer.append(cardElement);
}

initialCards.forEach(function(info) {
  const photo = info.link;
  const description = info.name;
  createCard(photo, description);
});

/* функция открытия всплывающего окна */
function popupOpen () {
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = nickname.textContent;
  statusInput.value = profileStatus.textContent;
}

editButton.addEventListener('click', popupOpen);

/* функция закрытия всплывающего окна */
function popupClose(evt) {
  const isOverlay = evt.target.classList.contains('popup');
  const isCloseBtn = evt.target.classList.contains('popup__close-btn');
  const isSaveBtn = evt.target.classList.contains('popup__save-btn');

  if (isOverlay || isCloseBtn || isSaveBtn) {
    popupEditProfile.classList.remove('popup_opened');
  }
}

popupEditProfile.addEventListener('click', popupClose);

/* функция-обработчик отправки формы */
function profileEdit (evt) {
  evt.preventDefault();

  nickname.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;

  popupClose(evt);
}

popupFormEdit.addEventListener('submit', profileEdit, false);

/* функция установки/отмены лайка */
/* function like(evt) {
  let post = document.getElementById(evt.target.id);
  post.classList.toggle('like');
} */

/* в цикле прослушиваются все кнопки лайка */
/* for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', like);
} */
