export default class User {
  constructor(obj) {
    this.name = obj.name;
    this.email = obj.email;
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
  }
}
