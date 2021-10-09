export default class Purchase {
  constructor(purchase, user) {
    this.id = purchase.id;
    this.ticketType = purchase.ticketType;
    this.date = purchase.date;
    this.time = purchase.time;
    this.date = purchase.date;
    this.name = user.name;
    this.email = user.email;
    this.phone = purchase.phone;
    this.phone = purchase.phone;
    this.phone = purchase.phone;
    this.qtyBasic = purchase.qtyBasic;
    this.qtySenior = purchase.qtySenior;
  }

  get purchaseData() {
    return this;
  }

  set purchaseData(input) {
    for (const key in this) {
      this[key] = input[key];
    }
  }
}
