export default class Purchase {
  constructor(userClass) {
    this.name = userClass.name || null;
    this.email = userClass.email || null;
    this.purchase = userClass.purchase || null;
    this.id = this.purchase.id || null;
    this.ticketType = this.purchase.ticketType || null;
    this.date = this.purchase.date || null;
    this.time = this.purchase.time || null;
    this.date = this.purchase.date || null;
    this.cost = this.purchase.cost || null;
    this.basicNumber = this.purchase.basicNumber || null;
    this.seniorNumber = this.purchase.seniorNumber || null;
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
