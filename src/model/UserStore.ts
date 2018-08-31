import { observable, action } from "mobx";
import firebase from "../utils/firebase";

export class UserStore {
  @observable
  public userName: string;

  @action
  public signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.userName = "";
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default new UserStore();
