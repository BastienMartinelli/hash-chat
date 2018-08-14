import { observable, computed, action } from "mobx";

import chatStore from "./ChatStore";

export class HashtagStore {
  @observable
  public hashtags: string[] = [];

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
    chatStore.defineRef();
  }

  @action
  public deleteHashtag = (hashtag: string) => {
    this.hashtags.splice(this.hashtags.indexOf(hashtag), 1);
    chatStore.defineRef();
  };
}

export default new HashtagStore();
