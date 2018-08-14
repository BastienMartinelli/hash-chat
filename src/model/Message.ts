export interface IMessage {
  id: string;
  author: string;
  content: string;
  hashTags?: string[];
  admin: boolean;
}
