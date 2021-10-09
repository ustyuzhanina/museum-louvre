export default class Purchase {
  constructor(purchaseData) {
    this.id = purchaseData.id;
    this.ticketType = purchaseData.ticketType;
    this.date = purchaseData.date;
    this.time = purchaseData.time;
    this.date = purchaseData.date;
    this.name = purchaseData.name;
    this.email = purchaseData.email;
    this.phone = purchaseData.phone;
    this.phone = purchaseData.phone;
    this.phone = purchaseData.phone;
    this.qtyBasic = purchaseData.qtyBasic;
    this.qtySenior = purchaseData.qtySenior;
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
