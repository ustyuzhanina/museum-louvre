export default class User {
  constructor() {
    this.name = null;
    this.email = null;
    this.phone = null;
    this.purchase = {};
    this.checkUser = this.checkUser.bind(this);
    this.save = this.save.bind(this);
    this.storeData = this.storeData.bind(this);
  }

  checkUser() {
    if (localStorage.getItem('louvre')) {
      const userData = JSON.parse(localStorage.getItem('louvre'));

      for (const prop in userData) {
        this[prop] = userData[prop];
      }
      return true;
    }
  }

  save(data) {
    if (localStorage.getItem('louvre')) {
      localStorage.removeItem('louvre');
    }
    localStorage.setItem('louvre', JSON.stringify(data));
  }

  get userData() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      purchase: this.purchase,
    };
  }

  storeData(data) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.purchase = data.purchase;
    this.save(data);
  }
}
