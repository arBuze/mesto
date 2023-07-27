export default class UserInfo {
  constructor({nameSelector, statusSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._statusElement = document.querySelector(statusSelector);
  }

  getUserInfo() {
    this._infoValues = {};
    this._infoValues['name'] = this._nameElement.textContent;
    this._infoValues['status'] = this._statusElement.textContent;
    return this._infoValues;
  }

  setUserInfo(name, status) {
    this._nameElement.textContent = name;
    this._statusElement.textContent = status;
  }
}
