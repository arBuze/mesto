export default class UserInfo {
  constructor({nameSelector, statusSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._statusElement = document.querySelector(statusSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._infoValues = {};
    this._infoValues['nickname'] = this._nameElement.textContent;
    this._infoValues['status'] = this._statusElement.textContent;
    return this._infoValues;
  }

  setUserAvatar(avatarLink) {
    this._avatarElement.src = avatarLink;
  }

  setUserInfo(name, status) {
    this._nameElement.textContent = name;
    this._statusElement.textContent = status;
  }
}
