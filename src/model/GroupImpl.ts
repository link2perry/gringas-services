import Group from "./Group";

export default class GroupImpl implements Group {
  name: string = "";
  city: string = "";
  state: string = "";
  country: string = "";

  constructor(group?: Group) {
    if(group) {
      this.name = group.name;
      this.city = group.city;
      this.state = group.state;
      this.country = group.country;
    }
  }
}