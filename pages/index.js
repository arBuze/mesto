let content = document.querySelector('.content');
let editButton = document.querySelector('.profile__edit-btn');

let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__item_el_name');
let statusInput = popup.querySelector('.popup__item_el_status');

let likeButton = document.querySelectorAll('.photo-feed__like-btn');

/* функция открытия всплывающего окна */
function popupOpen () {
  popup.classList.add('popup_opened');
  nameInput.value = content.querySelector('.profile__name').textContent;
  statusInput.value = content.querySelector('.profile__status').textContent;
}

editButton.addEventListener('click', popupOpen);

/* функция закрытия всплывающего окна */
function popupClose(evt) {
  const isOverlay = evt.target.classList.contains('popup');
  const isCloseBtn = evt.target.classList.contains('popup__close-btn');

  if (isOverlay || isCloseBtn) {
    popup.classList.remove('popup_opened');
  }
}

popup.addEventListener('click', popupClose);

/* функция-обработчик отправки формы */
function profileEdit (evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let status = statusInput.value;

  let nickname = content.querySelector('.profile__name');
  let profileStatus = content.querySelector('.profile__status');
  nickname.textContent = name;
  profileStatus.textContent = status;

  popup.classList.remove('popup_opened');
}

popupContainer.addEventListener('submit', profileEdit, false);

/* функция установки/отмены лайка */
function like(evt) {
  let post = document.getElementById(evt.target.id);
  console.log(post);
  post.classList.toggle('like');
}

/* в цикле прослушиваются все кнопки лайка */
for (let i = 0; i < likeButton.length; i++) {
  likeButton[i].addEventListener('click', like);
}
