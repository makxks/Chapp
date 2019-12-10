import { User } from '../auth/user.model';
import { Chat } from '../chat/chat.model';
import { Todo } from '../todos/todo.model';

export class Notification {
  sender: User;
  receiver: User;
  chat: Chat;
  isGroup: boolean;
  groupName: string;
  timeSent: number;
  isTask: boolean;
  task: Todo;

  constructor(
    sender: User,
    receiver: User,
    chat: Chat,
    isGroup: boolean,
    groupName: string,
    isTask: boolean = false,
    task: Todo = null) {
      this.sender = sender;
      this.receiver = receiver;
      this.chat = chat;
      this.isGroup = isGroup;
      this.groupName = groupName;
      this.timeSent = new Date().getTime();
      this.isTask = isTask;
      this.task = task;
    }
}
