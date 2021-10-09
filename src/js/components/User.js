export default class User {
  constructor() {
    this.name = null;
    this.email = null;
    this.checkUser = this.checkUser.bind(this);
    this.setNewUser = this.setNewUser.bind(this);
  }

  checkUser() {
    if (localStorage.getItem('louvre')) {
      const userData = localStorage.getItem('louvre');
      for (const prop in this) {
        this[prop] = userData[prop];
      }
    }
  }

  setNewUser(data) {
    localStorage.setItem(`louvre-for-${data.name}`, JSON.stringify(data));
  }

  get userData() {
    return {
      name: this.name,
      email: this.email,
    };
  }

  set userData(data) {
    this.name = data.name;
    this.email = data.email;
    this.setNewUser(data);
  }
}
