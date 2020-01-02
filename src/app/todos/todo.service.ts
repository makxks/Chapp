import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/Operators';
import * as io from 'socket.io-client';

import { HttpClient } from '@angular/common/http';
import { HttpResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { ProfileService } from '../profile/profile.service';
import { ChatService } from '../chat/chat.service';

import { Todo } from './todo.model';
import { Chat } from '../chat/chat.model';
import { User } from '../auth/user.model';
import { Notification } from '../notifications/notification.model';

var currentBEaddress = "http://localhost:3000";

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

  constructor(private http: Http, private profileService: ProfileService, private chatService: ChatService){}

  connectToOverall(){
    this.socket.on('todo-added', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.email == todo.users[i].email){
          this.profileService.currentUser.todos.push(todo);
        }
      }

      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          this.chatService.tabs[i].todos.push(todo);
        }
      }
    })

    this.socket.on('sub-todo-added', (todo) => {
      //in user profile find parent todo, push sub todo into todo
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.email == todo.users[i].email){
          for(var j=0; j<this.profileService.currentUser.todos.length; j++){
            if(this.profileService.currentUser.todos[j].name == todo.parentTodo.name){
              this.profileService.currentUser.todos[j].subTodos.push(todo);
            }
          }
        }
      }
      //in chatService tabs, find parent todo, push sub todo into parent todo
      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          for(var j=0; j<this.chatService.tabs[i].todos.length; j++){
            if(this.chatService.tabs[i].todos[j].name == todo.parentTodo.name){
              this.chatService.tabs[i].todos[j].subTodos.push(todo)
            }
          }
        }
      }
    })

    this.socket.on('todo-deleted', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.email == todo.users[i].email){
          for(var j=0; j<this.profileService.currentUser.todos.length; j++){
            if(todo.name == this.profileService.currentUser.todos[j].name &&
            todo.chat.name == this.profileService.currentUser.todos[j].chat.name){
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

    this.socket.on('sub-todo-deleted', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.email == todo.users[i].email){
          for(var j=0; j<this.profileService.currentUser.todos.length; j++){
            if(todo.parentTodo.name == this.profileService.currentUser.todos[j].name &&
            todo.parentTodo.chat == this.profileService.currentUser.todos[j].chat.name){
              for(var k=0; k<this.profileService.currentUser.todos[j].subTodos.length; k++){
                if(todo.name = this.profileService.currentUser.todos[j].subTodos[k].name &&
                todo.chat == this.profileService.currentUser.todos[j].subTodos[k].chat.name){
                  this.profileService.currentUser.todos[j].subTodos.splice(k,1);
                }
              }
            }
          }
        }
      }

      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          for(var j=0; j<this.chatService.tabs[i].todos.length; j++){
            if(todo.parentTodo.name == this.chatService.tabs[i].todos[j].name){
              for(var k=0; k<this.chatService.tabs[i].todos[j].subTodos.length; k++){
                if(todo.name == this.chatService.tabs[i].todos[j].subTodos[k].name &&
                todo.chat.name == this.chatService.tabs[i].todos[j].subTodos[k].chat.name){
                  this.chatService.tabs[i].todos[j].subTodos.splice(k,1);
                }
              }
            }
          }
        }
      }
    })

    this.socket.on('todo-edited', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.email == todo.users[i].email){
          for(var j=0; j<this.profileService.currentUser.todos.length; j++){
            if(todo.name == this.profileService.currentUser.todos[j].name &&
            todo.chat.name == this.profileService.currentUser.todos[j].chat.name){

              this.profileService.currentUser.todos[j].name = todo.name;
              this.profileService.currentUser.todos[j].description = todo.description;
              this.profileService.currentUser.todos[j].users = todo.users;
              this.profileService.currentUser.todos[j].deadline = todo.deadline;
              this.profileService.currentUser.todos[j].importance = todo.importance;

              if(this.profileService.currentUser.todos[j].subTodos.length > 0){
                for(var k=0; k<this.profileService.currentUser.todos[j].subTodos.length; k++){
                  this.profileService.currentUser.todos[j].subTodos[k].parentTodo = this.profileService.currentUser.todos[j];
                }
              }
            }
          }
        }
      }

      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          for(var j=0; j<this.chatService.tabs[i].todos.length; j++){
            if(todo.name == this.chatService.tabs[i].todos[j].name){

              this.chatService.tabs[i].todos[j].name = todo.name;
              this.chatService.tabs[i].todos[j].description = todo.description;
              this.chatService.tabs[i].todos[j].users = todo.users;
              this.chatService.tabs[i].todos[j].deadline = todo.deadline;
              this.chatService.tabs[i].todos[j].importance = todo.importance;

              if(this.chatService.tabs[i].todos[j].subTodos.length > 0){
                for(var k=0; k<this.chatService.tabs[i].todos[j].subTodos.length; k++){
                  this.chatService.tabs[i].todos[j].subTodos[k].parentTodo = this.chatService.tabs[i].todos[j];
                }
              }
            }
          }
        }
      }
    })

    this.socket.on('sub-todo-edited', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.email == todo.users[i].email){
          for(var j=0; j<this.profileService.currentUser.todos.length; j++){
            if(todo.parentTodo.name == this.profileService.currentUser.todos[j].name &&
            todo.parentTodo.chat == this.profileService.currentUser.todos[j].chat.name){
              for(var k=0; k<this.profileService.currentUser.todos[j].subTodos.length; k++){
                if(todo.name = this.profileService.currentUser.todos[j].subTodos[k].name &&
                todo.chat == this.profileService.currentUser.todos[j].subTodos[k].chat.name){

                  this.profileService.currentUser.todos[j].subTodos[k].name = todo.name;
                  this.profileService.currentUser.todos[j].subTodos[k].description = todo.description;
                  this.profileService.currentUser.todos[j].subTodos[k].users = todo.users;
                  this.profileService.currentUser.todos[j].subTodos[k].deadline = todo.deadline;
                  this.profileService.currentUser.todos[j].subTodos[k].importance = todo.importance;

                }
              }
            }
          }
        }
      }

      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          for(var j=0; j<this.chatService.tabs[i].todos.length; j++){
            if(todo.parentTodo.name == this.chatService.tabs[i].todos[j].name){
              for(var k=0; k<this.chatService.tabs[i].todos[j].subTodos.length; k++){
                if(todo.name == this.chatService.tabs[i].todos[j].subTodos[k].name &&
                todo.chat.name == this.chatService.tabs[i].todos[j].subTodos[k].chat.name){

                  this.chatService.tabs[i].todos[j].subTodos[k].name = todo.name;
                  this.chatService.tabs[i].todos[j].subTodos[k].description = todo.description;
                  this.chatService.tabs[i].todos[j].subTodos[k].users = todo.users;
                  this.chatService.tabs[i].todos[j].subTodos[k].deadline = todo.deadline;
                  this.chatService.tabs[i].todos[j].subTodos[k].importance = todo.importance;

                }
              }
            }
          }
        }
      }
    })

    this.socket.on('todo-completed', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.email == todo.users[i].email){
          for(var j=0; j<this.profileService.currentUser.todos.length; j++){
            if(todo.name == this.profileService.currentUser.todos[j].name &&
            todo.chat.name == this.profileService.currentUser.todos[j].chat.name){
              this.profileService.currentUser.todos[j].complete = true;
            }
          }
        }
      }

      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          for(var j=0; j<this.chatService.tabs[i].todos.length; j++){
            if(todo.name == this.chatService.tabs[i].todos[j].name){
              this.chatService.tabs[i].todos[j].complete = true;
            }
          }
        }
      }
    })

    this.socket.on('todo-uncompleted', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.email == todo.users[i].email){
          for(var j=0; j<this.profileService.currentUser.todos.length; j++){
            if(todo.name == this.profileService.currentUser.todos[j].name &&
            todo.chat.name == this.profileService.currentUser.todos[j].chat.name){
              this.profileService.currentUser.todos[j].complete = false;
            }
          }
        }
      }

      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          for(var j=0; j<this.chatService.tabs[i].todos.length; j++){
            if(todo.name == this.chatService.tabs[i].todos[j].name){
              this.chatService.tabs[i].todos[j].complete = false;
            }
          }
        }
      }
    })

    this.socket.on('sub-todo-completed', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.email == todo.users[i].email){
          for(var j=0; j<this.profileService.currentUser.todos.length; j++){
            if(todo.parentTodo.name == this.profileService.currentUser.todos[j].name &&
            todo.parentTodo.chat == this.profileService.currentUser.todos[j].chat.name){
              for(var k=0; k<this.profileService.currentUser.todos[j].subTodos.length; k++){
                if(todo.name = this.profileService.currentUser.todos[j].subTodos[k].name &&
                todo.chat == this.profileService.currentUser.todos[j].subTodos[k].chat.name){
                  this.profileService.currentUser.todos[j].subTodos[k].complete = true;
                }
              }
            }
          }
        }
      }

      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          for(var j=0; j<this.chatService.tabs[i].todos.length; j++){
            if(todo.parentTodo.name == this.chatService.tabs[i].todos[j].name){
              for(var k=0; k<this.chatService.tabs[i].todos[j].subTodos.length; k++){
                if(todo.name == this.chatService.tabs[i].todos[j].subTodos[k].name &&
                todo.chat.name == this.chatService.tabs[i].todos[j].subTodos[k].chat.name){
                  this.chatService.tabs[i].todos[j].subTodos[k].complete = true;
                }
              }
            }
          }
        }
      }
    })

    this.socket.on('sub-todo-uncompleted', (todo) => {
      for(var i=0; i<todo.users.length; i++){
        if(this.profileService.currentUser.email == todo.users[i].email){
          for(var j=0; j<this.profileService.currentUser.todos.length; j++){
            if(todo.parentTodo.name == this.profileService.currentUser.todos[j].name &&
            todo.parentTodo.chat == this.profileService.currentUser.todos[j].chat.name){
              for(var k=0; k<this.profileService.currentUser.todos[j].subTodos.length; k++){
                if(todo.name = this.profileService.currentUser.todos[j].subTodos[k].name &&
                todo.chat == this.profileService.currentUser.todos[j].subTodos[k].chat.name){
                  this.profileService.currentUser.todos[j].subTodos[k].complete = false;
                }
              }
            }
          }
        }
      }

      for(var i=0; i<this.chatService.tabs.length; i++){
        if(todo.chat.name == this.chatService.tabs[i].name){
          for(var j=0; j<this.chatService.tabs[i].todos.length; j++){
            if(todo.parentTodo.name == this.chatService.tabs[i].todos[j].name){
              for(var k=0; k<this.chatService.tabs[i].todos[j].subTodos.length; k++){
                if(todo.name == this.chatService.tabs[i].todos[j].subTodos[k].name &&
                todo.chat.name == this.chatService.tabs[i].todos[j].subTodos[k].chat.name){
                  this.chatService.tabs[i].todos[j].subTodos[k].complete = false;
                }
              }
            }
          }
        }
      }
    })
  }

  addNewTodo(todo: Todo){
    this.socket.emit('add-todo', todo);
    for(var i=0; i<todo.users.length; i++){
      var newNotification = new Notification(this.profileService.currentUser, todo.users[i], todo.chat, false, todo.chat.name, true, todo);
      this.socket.emit('add-todo-notification', newNotification);
    }
  }

  handleCreate(chat: Chat){
    this.createTodoOccurred.emit(chat);
  }

  addSubTodo(todo:Todo){
    this.socket.emit('add-sub-todo', todo);
    for(var i=0; i<todo.users.length; i++){
      var newNotification = new Notification(this.profileService.currentUser, todo.users[i], todo.chat, false, todo.chat.name, true, todo);
      this.socket.emit('add-todo-notification', newNotification);
    }
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
    this.socket.emit('delete-sub-todo', todo);
  }

  handleRemoveSub(todo:Todo){
    this.deleteSubTodoOccurred.emit(todo);
  }

  editTodo(todo: Todo){
    this.socket.emit('edit-todo', todo);
  }

  handleEdit(todo: Todo){
    this.editTodoOccurred.emit(todo);
  }

  editSubTodo(todo: Todo){
    this.socket.emit('edit-sub-todo', todo);
  }

  handleEditSub(todo: Todo){
    this.editSubTodoOccurred.emit(todo);
  }

  handleComplete(todo: Todo){
    this.socket.emit('complete-todo', todo);
  }

  handleUncomplete(todo: Todo){
    this.socket.emit('uncomplete-todo', todo);
  }

  handleCompleteSub(todo:Todo){
    this.socket.emit('complete-sub-todo', todo);
  }

  handleUncompleteSub(todo: Todo){
    this.socket.emit('uncomplete-sub-todo', todo);
  }

  getTodosOnLogin(chat:Chat, user: User){
    //get Todos for chat
    //if this user is targetted, add to user profile todos as well
    let params = '';
    let options = new RequestOptions({
      search: new URLSearchParams('email='+ user.email)
    })
    const url = currentBEaddress + '/todo';
    this.http.get(url, options)
    .map((response: Response) => {
      var todos = response.json().obj;
      for(var i=0; i<todos.length; i++){
        if(todos[i].chat.name == chat.name){
          chat.todos.push(todos[i]);
        }
        for(var k=0; i<todos[i].users.length; k++){
          if(this.profileService.currentUser.email == todos[i].users[i].email){
            this.profileService.currentUser.todos.push(todos[i]);
          }
        }
      }
    });
  }
}
