import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  createTodoOccurred = new EventEmitter<Todo>();
  editTodoOccurred = new EventEmitter<Todo>();
  deleteTodoOccurred = new EventEmitter<Todo>();

  addNewContact(todo){

  }

  handleCreate(todo){
    this.createTodoOccurred.emit(todo);
  }

  removeContact(todo){

  }

  handleRemove(todo){
    this.deleteTodoOccurred.emit(todo);
  }
}
