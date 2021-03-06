export interface IMessage {
  id: string;
  author: string;
  content: string;
  hashtags?: string[];
  admin: boolean;
  timestamp: number;
}
