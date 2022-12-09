export default class UserInfo {
  constructor(selectorsObject) {
    this._profileTitle = document.querySelector(selectorsObject.title);
    this._profileSubtitle = document.querySelector(selectorsObject.subtitle);
    this._profileBtnAvatar = document.querySelector(selectorsObject.btnAvatar);
  }

  getUserInfo(){
    return {
      name: this._profileTitle.textContent,
      activity: this._profileSubtitle.textContent,
    }
  }

  setUserInfo(name, activity, avatar = false){
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = activity;
    if(avatar){
      this._profileBtnAvatar.src = avatar;
    }
  }
}
