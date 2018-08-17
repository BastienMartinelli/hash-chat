import { observable, computed, action } from "mobx";
import { IMessage } from "./Message";
import { arrayEquals } from "../utils/utils";
import { db } from "../utils/firebase";

import hashtagStore from "./HashtagStore";
import userStore from "./UserStore";

export class ChatStore {
  @observable
  public messages: IMessage[] = [];

  private ref: any;

  constructor() {
    this.defineRef();
  }

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

    const id = db
      .ref("messages")
      .child(hashtagStore.hashtagRef)
      .push(message).key;

    message.id = id || "unknown";

    return this.ref.update({
      [id + ""]: message
    });
  }

  @action
  public defineRef() {
    // detaching the old listener
    if (this.ref) {
      this.ref.off();
    }

    // cleaning messages
    this.messages = [];

    // Defining a new listener
    this.ref = db.ref("messages/" + hashtagStore.hashtagRef);
    this.ref.on("child_added", (data: any) => {
      this.messages.push(data.val());
    });

    // publishing an informative message to the user
    this.messages.push({
      admin: true,
      author: "Hash-Chat",
      content: `Now on ${hashtagStore.hashtags.join(" ") || "#general"}`,
      hashtags: hashtagStore.hashtags,
      id: Math.random().toString(),
      timestamp: Date.now()
    });
  }
}

export default new ChatStore();
