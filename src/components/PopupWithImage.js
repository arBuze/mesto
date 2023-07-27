import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    super.open();
    this._photo = this._popupElement.querySelector('.popup__photo');
    this._photo.src = evt.target.src;
    this._photo.alt = evt.target.alt;

    this._caption = this._popupElement.querySelector('.popup__caption');
    this._caption.textContent = evt.target.parentElement.querySelector('.photo-feed__heading').textContent;
  }
}


