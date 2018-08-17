import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  createTodoOccurred = new EventEmitter<Todo>();
  editTodoOccurred = new EventEmitter<Todo>();
  deleteTodoOccurred = new EventEmitter<Todo>();

  addNewTodo(todo: Todo){

  }

  handleCreate(todo: Todo){
    this.createTodoOccurred.emit(todo);
  }

  removeTodo(todo: Todo){

  }

  handleRemove(todo: Todo){
    this.deleteTodoOccurred.emit(todo);
  }

  editTodo(todo: Todo){
  }

  handleEdit(todo: Todo){
    this.editTodoOccurred.emit(todo);
  }
}
