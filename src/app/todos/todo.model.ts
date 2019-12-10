import { User } from "../auth/user.model";
import { Chat } from '../chat/chat.model';

export class Todo {
  name: string;
  description: string;
  users: User[];
  deadline: number;
  chat: Chat;
  subTodo: boolean;
  parentTodo: Todo;
  owner: User;
  importance: string;
  subTodos: Todo[];
  complete: boolean

  constructor(
    name: string,
    description: string,
    users: User[],
    deadline: number,
    chat: Chat,
    subTodo: boolean,
    parentTodo: Todo,
    owner: User,
    importance: string
  ){
    this.name = name;
    this.description = description;
    this.users = users;
    this.deadline = deadline;
    this.chat = chat;
    this.subTodo = subTodo;
    this.parentTodo = parentTodo;
    this.owner = owner;
    this.importance = importance;
    this.subTodos = [];
  }
}
