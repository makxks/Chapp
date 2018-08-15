import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  createTodoOccurred = new EventEmitter<Todo>();
  editTodoOccurred = new EventEmitter<Todo>();
  deleteTodoOccurred = new EventEmitter<Todo>();

  addNewContact(todo: Todo){

  }

  handleCreate(todo: Todo){
    this.createTodoOccurred.emit(todo);
  }

  removeContact(todo: Todo){

  }

  handleRemove(todo: Todo){
    this.deleteTodoOccurred.emit(todo);
  }
}
