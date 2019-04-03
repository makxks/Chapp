import { User } from '../auth/user.model';
import { Todo } from '../todos/todo.model';
import { Message } from './message.model';

export class Chat {
  name: string;
  owner: User;
  users: User[];
  messages: Message[];
  todos: Todo[];

  constructor(
    name: string,
    owner: User,
    users: User[]) {
      this.name = name;
      this.owner = owner;
      this.users = users;
      this.messages = [];
      this.todos = [];
    }
}
