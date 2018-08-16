import { observable, computed, action } from "mobx";

import chatStore from "./ChatStore";

const HASH_SEPARATOR = "+";
const MAX_HISTORY = 5;

export class HashtagStore {
  @observable
  public hashtags: string[] = [];

  @observable
  public history: string[][] = [];

  constructor() {
    const url: URL = new URL(window.location.href);
    const tagsUrl: string = url.hash;
    if (tagsUrl) {
      this.hashtags = tagsUrl.split(HASH_SEPARATOR);
    }
  }

  @computed
  get hashtagRef(): string {
    return (
      this.hashtags
        .map(tag => {
          const tagId = tag.replace("#", "");
          return tagId.toUpperCase();
        })
        .join("") || "GENERAL"
    );
  }

  @action
  public addHashtag(hashtag: string) {
    this.historize();
    this.hashtags.push(hashtag);
    window.location.hash = this.hashtags.join(HASH_SEPARATOR);
    chatStore.defineRef();
  }

  @action
  public clearHashtags = () => {
    this.historize();
    this.hashtags = [];
    window.location.hash = this.hashtags.join(HASH_SEPARATOR);
    chatStore.defineRef();
  };

  @action
  public deleteHashtag = (hashtag: string) => {
    this.historize();
    this.hashtags.splice(this.hashtags.indexOf(hashtag), 1);
    window.location.hash = this.hashtags.join(HASH_SEPARATOR);
    chatStore.defineRef();
  };

  @action
  public changeChanel = (hashtags: string[]) => {
    this.historize();
    this.hashtags = hashtags;
    window.location.hash = this.hashtags.join(HASH_SEPARATOR);
    chatStore.defineRef();
  };

  private historize() {
    if (!!this.hashtags.length) {
      this.history.unshift(this.hashtags.slice());
    }
    if (this.history.length > MAX_HISTORY) {
      this.history = this.history.slice(0, MAX_HISTORY);
    }
  }
}

export default new HashtagStore();
