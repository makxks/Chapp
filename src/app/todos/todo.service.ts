import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { ProfileService } from '../profile/profile.service';
import { ChatService } from '../chat/chat.service';

import { Todo } from './todo.model';
import { Chat } from '../chat/chat.model';

@Injectable()
export class TodoService {
  private url = 'http://localhost:3000';
  socket: SocketIOClient.Socket = io();

  createTodoOccurred = new EventEmitter<Chat>();
  createSubTodoOccurred = new EventEmitter<Todo>();
  editTodoOccurred = new EventEmitter<Todo>();
  editSubTodoOccurred = new EventEmitter<Todo>();
  deleteTodoOccurred = new EventEmitter<Todo>();
  deleteSubTodoOccurred = new EventEmitter<Todo>();

  constructor(private profileService: ProfileService, private chatService: ChatService){}

  connectToOverall(){
    this.socket.on('todo-added', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.name == todo.users[i].name){
          this.profileService.currentUser.todos.push(todo);
        }
      }

      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          this.chatService.tabs[i].todos.push(todo);
        }
      }
    })

    this.socket.on('todo-deleted', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.name == todo.users[i].name){
          for(var j=0; j<this.profileService.currentUser.todos.length; j++){
            if(todo[i].name == this.profileService.currentUser.todos[j].name &&
            todo[i].chat == this.profileService.currentUser.todos[j].chat){
              this.profileService.currentUser.todos.splice(j,1);
            }
          }
        }
      }

      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          for(var j=0; j<this.chatService.tabs[i].todos.length; j++){
            if(todo.name == this.chatService.tabs[i].todos[j].name){
              this.chatService.tabs[i].todos.splice(j,1);
            }
          }
        }
      }
    })
  }

  addNewTodo(todo: Todo){
    this.socket.emit('add-todo', todo);
  }

  handleCreate(chat: Chat){
    //open todo create form with parameter chat as target group
    this.createTodoOccurred.emit(chat);
  }

  handleCreateSubTodo(parentTodo: Todo){
    this.createSubTodoOccurred.emit(parentTodo);
  }

  removeTodo(todo: Todo){
    this.socket.emit('delete-todo', todo);
  }

  handleRemove(todo: Todo){
    this.deleteTodoOccurred.emit(todo);
  }

  removeSubTodo(todo: Todo){
    this.socket.emit('delete-sub-todo');
  }

  handleRemoveSub(todo:Todo){
    this.deleteSubTodoOccurred.emit(todo);
  }

  editTodo(todo: Todo){
    this.socket.emit('edit-todo');
  }

  handleEdit(todo: Todo){
    this.editTodoOccurred.emit(todo);
  }

  editSubTodo(todo: Todo){
    this.socket.emit('edit-sub-todo');
  }

  handleEditSub(todo: Todo){
    this.editSubTodoOccurred.emit(todo);
  }
}
