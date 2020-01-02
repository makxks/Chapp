import { Todo } from '../todos/todo.model';
import { Chat } from '../chat/chat.model';
import { Notification } from '../notifications/notification.model';

export class BEUser {
  name: string;
  email: string;
  contacts: BEUser[];
  chats: Chat[];
  todos: Todo[];
  notifications: Notification[];

  constructor(
    name: string,
    email: string,
    contacts: BEUser[],
    chats: Chat[],
    todos: Todo[],
    notifications: Notification[]
  ){
    this.name = name;
    this.email = email;
    this.contacts = contacts;
    this.chats = chats;
    this.todos = todos;
    this.notifications = notifications;
  }
}
