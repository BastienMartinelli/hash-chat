import { observable } from "mobx";

export class UserStore {
  @observable
  public userName: string;
}

export default new UserStore();
