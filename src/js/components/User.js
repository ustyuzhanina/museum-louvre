export default class User {
  constructor() {
    this.name = null;
    this.email = null;
    this.purchase = {};
    this.checkUser = this.checkUser.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  checkUser() {
    if (localStorage.getItem('louvre')) {
      const userData = localStorage.getItem('louvre');
      for (const prop in this) {
        this[prop] = userData[prop];
      }
    }
  }

  saveData(data) {
    localStorage.setItem('louvre', JSON.stringify(data));
  }

  get userData() {
    return {
      name: this.name,
      email: this.email,
      purchase: this.purchase,
    };
  }

  set userData(data) {
    this.name = data.name;
    this.email = data.email;
    this.purchase = data.purchase;
    this.saveData(data);
  }
}
