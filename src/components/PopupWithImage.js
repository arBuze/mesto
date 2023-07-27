import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = this._popupElement.querySelector('.popup__photo');
    this._caption = this._popupElement.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open();
    this._photo.src = link;
    this._photo.alt = name;

    this._caption.textContent = name;
  }
}


