export default class UserInfo {
  constructor(profileTitle, profileSubtitle) {
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
  }

  getUserInfo(){
    return {
      name: this._profileTitle.textContent,
      activity: this._profileSubtitle.textContent,
    }
  }

  setUserInfo(name, activity){
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = activity;
  }
}
