export default class UserInfo {
  constructor(profileTitle, profileSubtitle, profileBtnAvatar) {
    this._profileTitle = profileTitle;
    this._profileSubtitle = profileSubtitle;
    this._profileBtnAvatar = profileBtnAvatar;
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
      this._profileBtnAvatar.style.backgroundImage = `url(${avatar})`;
    }
  }
}
