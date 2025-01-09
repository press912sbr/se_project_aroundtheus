export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileDescription = document.querySelector(profileDescription);
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._profileTitle.textContent = title;
    this._profileDescription.textContent = description;
  }
}
