import { User } from '../auth/user.model';
import { Chat } from '../chat/chat.model';

export class Notification {
  sender: User;
  receiver: User;
  chat: Chat;
  isGroup: boolean;
  groupName: string;
  timeSent: number;

  constructor(
    sender: User,
    receiver: User,
    chat: Chat,
    isGroup: boolean,
    groupName: string) {
      this.sender = sender;
      this.receiver = receiver;
      this.chat = chat;
      this.isGroup = isGroup;
      this.groupName = groupName;
      this.timeSent = new Date().getTime();
    }
}
