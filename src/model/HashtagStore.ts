import { observable, computed, action } from "mobx";

import chatStore from "./ChatStore";

const HASH_SEPARATOR = "+";

export class HashtagStore {
  @observable
  public hashtags: string[] = [];

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
    this.hashtags.push(hashtag);
    window.location.hash = this.hashtags.join(HASH_SEPARATOR);
    chatStore.defineRef();
  }

  @action
  public clearHashtags = () => {
    this.hashtags = [];
    window.location.hash = this.hashtags.join(HASH_SEPARATOR);
    chatStore.defineRef();
  };

  @action
  public deleteHashtag = (hashtag: string) => {
    this.hashtags.splice(this.hashtags.indexOf(hashtag), 1);
    chatStore.defineRef();
  };
}

export default new HashtagStore();
