let content = document.querySelector('.content');
let editButton = document.querySelector('.profile__edit-btn');

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__item_el_name');
let statusInput = popup.querySelector('.popup__item_el_status');
let nickname = content.querySelector('.profile__name');
let profileStatus = content.querySelector('.profile__status');

let likeButton = document.querySelectorAll('.photo-feed__like-btn');

/* функция открытия всплывающего окна */
function popupOpen () {
  popup.classList.add('popup_opened');
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
    popup.classList.remove('popup_opened');
  }
}

popup.addEventListener('click', popupClose);

/* функция-обработчик отправки формы */
function profileEdit (evt) {
  evt.preventDefault();

  nickname.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;

  popupClose(evt);
}

popupForm.addEventListener('submit', profileEdit, false);

/* функция установки/отмены лайка */
function like(evt) {
  let post = document.getElementById(evt.target.id);
  post.classList.toggle('like');
}

/* в цикле прослушиваются все кнопки лайка */
for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', like);
}
