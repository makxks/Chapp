import { User } from "../auth/user.model";

export class Todo {
  name: string;
  description: string;
  user: string;
  deadline: string;
  chat: string;
  subTodo: boolean;
  parentTodo: string;
  owner: User;

  constructor(
    name: string,
    description: string,
    user: string,
    deadline: string,
    chat: string,
    subTodo: boolean,
    parentTodo: string,
    owner: User
  ){
    this.name = name;
    this.description = description;
    this.user = user;
    this.deadline = deadline;
    this.chat = chat;
    this.subTodo = subTodo;
    this.parentTodo = parentTodo;
    this.owner = owner;
  }
}
