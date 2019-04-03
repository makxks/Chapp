import { Todo } from '../todos/todo.model';

export class User {
  name: string;
  email: string;
  contactNames: string[];
  chats: string[];
  todos: Todo[];

  constructor(
    name: string,
    email: string,
    contactNames: string[],
    chats: string[],
    todos: Todo[]
  ){
    this.name = name;
    this.email = email;
    this.contactNames = contactNames;
    this.chats = chats;
    //chats is a list of both groups and private chats, so it is named "chats" not "groupNames" or something else
    //private chats will simply be named according to the names of the users
    this.todos = todos;
  }
}
