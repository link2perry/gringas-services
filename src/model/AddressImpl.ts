import Address from "./Address";

export default class AddressImpl implements Address {
  line1: string = "";
  line2: string = "";
  city: string = "";
  state: string = "";
  zipCode: string = "";
  country: string = "";

  constructor(address?:Address) {
    if(address) {
      this.line1 = address.line1;
      this.line2 = address.line2;
      this.city = address.city;
      this.state = address.state;
      this.zipCode = address.zipCode;
      this.country = address.country;
    }
  }
}