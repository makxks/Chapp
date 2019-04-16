import { Todo } from '../todos/todo.model';

export class User {
  name: string;
  email: string;
  contactNames: string[];
  chatNames: string[];
  todos: Todo[];

  constructor(
    name: string,
    email: string,
    contactNames: string[],
    chatNames: string[],
    todos: Todo[]
  ){
    this.name = name;
    this.email = email;
    this.contactNames = contactNames;
    this.chatNames = chatNames;
    this.todos = todos;
  }
}
