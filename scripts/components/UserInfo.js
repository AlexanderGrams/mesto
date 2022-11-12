export default class UserInfo {
  constructor(name, activity, profileTitle, profileSubtitle) {
    this._name = name;
    this._activity = activity;
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
  }

  getUserInfo(nameInput, activityInput){
    nameInput.value = this._name;
    activityInput.value = this._activity;
  }

  setUserInfo(name, activity){
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = activity;
    this._name = name;
    this._activity = activity;
  }
}
