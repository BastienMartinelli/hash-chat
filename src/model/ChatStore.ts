import { observable, computed, action } from "mobx";
import { IMessage } from "./Message";
import { arrayEquals } from "../utils/utils";
import { db } from "../utils/firebase";

import hashtagStore from "./HashtagStore";
import userStore from "./UserStore";

const ADMIN = "#Hash-Chat";

export class ChatStore {
  @observable
  public messages: IMessage[] = [];

  @observable
  private ref: any;

  @computed
  get visibleMessages(): IMessage[] {
    return this.messages.filter(
      (msg: IMessage) =>
        (msg.hashtags && arrayEquals(msg.hashtags, hashtagStore.hashtags)) ||
        // no hashtags = #general
        !msg.hashtags
    );
  }

  @action
  public publishMessage(msg: string) {
    const message: IMessage = {
      admin: false,
      author: userStore.userName,
      content: msg,
      hashtags: hashtagStore.hashtags,
      id: "",
      timestamp: Date.now()
    };

    return this.pushMessage(message);
  }

  @action
  public publishAdminMessage(msg: string) {
    const message: IMessage = {
      admin: true,
      author: ADMIN,
      content: msg,
      hashtags: hashtagStore.hashtags,
      id: "",
      timestamp: Date.now()
    };
    return this.pushMessage(message);
  }

  @action
  public defineRef() {
    // detaching the old listener
    if (this.ref) {
      this.ref.off();
    }

    // cleaning messages
    this.messages = [];

    // Defining a new ref
    this.ref = db.ref("messages/" + hashtagStore.hashtagRef);

    // Inform other users that we join the new chanel
    this.publishAdminMessage(
      `${userStore.userName} joined ${hashtagStore.chanel}`
    ).then(() => {
      // then listen for new messages
      this.ref.on("child_added", (data: any) => {
        this.messages.push(data.val());
      });
    });
  }

  private pushMessage(message: IMessage) {
    const id = db
      .ref("messages")
      .child(hashtagStore.hashtagRef)
      .push(message).key;

    message.id = id || "unknown";

    return this.ref.update({
      [id + ""]: message
    });
  }
}

export default new ChatStore();
