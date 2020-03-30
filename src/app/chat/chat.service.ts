import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import io from 'socket.io-client';

import { HttpClient } from '@angular/common/http';
import { HttpResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { ProfileService } from '../profile/profile.service';

import { User } from '../auth/user.model';
import { Message } from './message.model';
import { Chat } from './chat.model';
import { Todo } from '../todos/todo.model';

var currentBEaddress = "http://localhost:3000";

@Injectable()
export class ChatService {
  //private url = 'http://localhost:3000';
  socket: SocketIOClient.Socket = io.connect();

  selectedGroup: string = "";
  openGroups: string[] = [];
  tabs: Chat[] = [];

  private socketMap: Map<string, any> = new Map();
  private newMessageMap: Map<string, number> = new Map();

  createGroupOccurred = new EventEmitter<Chat>();
  editGroupOccurred = new EventEmitter<Chat>();
  deleteGroupOccurred = new EventEmitter<Chat>();
  showGroupDetailsOccurred = new EventEmitter<Chat>();

  constructor(private http: HttpClient, private profileService: ProfileService){}

  connectToOverall(){
    this.socket.on('created-chat-room', (chat: any) => {
      for(var i=0; i<chat.users.length; i++){
        if(chat.users[i].email == this.profileService.currentUser.email){
          if(!this.profileService.currentUser.chatNames.includes(chat.name)){
            this.profileService.currentUser.chatNames.push(chat.name);
            this.tabs.push(chat);
            this.selectContact(chat.name, chat.isGroup);
            chat.users[i].chatNames.push(chat.name);
            break;
          }
        }
      }
    })
  }

  selectGroup(groupname: string){
    this.newMessageMap.set(groupname, 0);
    this.selectedGroup = groupname;
  }

  selectContact(groupname: string, isGroup: boolean = false){
    var found = false;
    var group: string;
    var foundName:string = "";
    for(group of this.openGroups){
      if(groupname + " and " + this.profileService.currentUser.name == group){
        found = true;
        foundName = groupname + " and " + this.profileService.currentUser.name;
        break;
      }
      else if(this.profileService.currentUser.name + " and " + groupname == group){
        found = true;
        foundName = this.profileService.currentUser.name + " and " + groupname;
        break;
      }
      else if(groupname == group){
        found = true;
        foundName = groupname;
      }
    }
    if(!found){
      if(groupname.includes(" and ") || isGroup){
        foundName = groupname;
      }
      else{
        foundName = groupname + " and " + this.profileService.currentUser.name;
      }
      this.openGroups.push(foundName);
    }
    this.selectGroup(foundName);
    this.newMessageMap.set(foundName, 0);
  }

  closeGroup(groupname: string){
    for(var i=0; i<this.openGroups.length; i++){
      if(this.openGroups[i] == groupname){
        this.openGroups.splice(i,1);
        if(this.openGroups.length > 0){
          if(i<this.openGroups.length - 1)
          {
            this.selectedGroup = this.openGroups[i];
          }
          else if(this.openGroups.length == 1)
          {
            this.selectedGroup = this.openGroups[0];
          }
          else
          {
            this.selectedGroup = this.openGroups[i-1];
          }
        }
        else {
          this.selectedGroup = "";
        }
      }
    }
  }

  connect(groupname: string){
    this.socketMap.set(groupname, io(currentBEaddress + "/?" + groupname));
    if(this.socketMap.get(groupname)){
      this.socketMap.get(groupname).on('connect', () => {

        var params = {
          groupname: groupname
        }

        this.socketMap.get(groupname).emit('join', params, function(){
          console.log('User has joined ' + params.groupname);
        });
      });
    }
  }

  sendMessage(message: Message) {
    if(this.socketMap.get(message.chat)){
      this.socketMap.get(message.chat).emit('add-message', {
        message: message.text,
        groupname: message.chat,
        user: message.user,
        time: message.time
      });
    }
  }

  getMessages(groupname: string) {
    if(this.socketMap.get(groupname)){
      let observable = new Observable(observer => {
        this.socketMap.get(groupname).on('message', (data: any) => {
          observer.next(data);
          var messageNumber: number;
          if(this.selectedGroup!=groupname){
            if(this.newMessageMap.get(groupname)){
              messageNumber = this.newMessageMap.get(groupname);
            }
            else
            {
              messageNumber = 0;
            }
            this.newMessageMap.set(groupname, messageNumber+1);
          }
        });
        return () => {
          this.socketMap.get(groupname).disconnect();
        }
      })
      return observable;
    }
  }

  createChat(chat: Chat){
    this.socket.emit('chat-creation', chat);
  }

  handleCreate(chat: Chat){
    this.createGroupOccurred.emit(chat);
  }

  editChat(chat: Chat){

  }

  handleEdit(chat: Chat){
    this.editGroupOccurred.emit(chat);
  }

  deleteChat(chat: Chat){

  }

  handleDelete(chat: Chat){
    this.deleteGroupOccurred.emit(chat);
  }

  getSelectedChat(){
    for(var i=0; i<this.tabs.length; i++){
      if(this.tabs[i].name == this.selectedGroup){
        return this.tabs[i];
      }
    }
    return new Chat("", null, [], false, [], "");
  }

  addNewChat(chat: Chat){
    const url = currentBEaddress + '/chat';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('email', chat.owner.email)
    };
    return this.http.post<any>(url, chat, httpOptions)
    .subscribe(resp => {
      console.log("added a chat: " + resp);
    })
  }

  addIndChatToSecondUser(chat: Chat, user2: User){
    const url = currentBEaddress + '/chat/2ndUser';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('email', user2.email)
    };
    return this.http.post<any>(url, chat, httpOptions)
    .subscribe(resp => {
      console.log("added a chat: " + resp);
    })
  }

  addUserToGroupChat(chat: Chat, user: User){

  }

  removeChat(){

  }

  populateGroupChat(chat: Chat, id: string, owner: string){
    // get all users in group
    const url = currentBEaddress + '/user/groupUsers/' + id;
    return this.http.get<any>(url, { observe: 'response' })
    .subscribe(resp => {
        var users = resp.body.obj;
        for(var i = 0; i < users.length; i++){
          var newUser = new User(users[i].name, users[i].email, [], [], []);
          chat.users.push(newUser);
          this.getGroupChatOwner(chat, owner);
        }
      })
  }

  getGroupChatOwner(chat: Chat, owner: string){
    // get group owner
    const url = currentBEaddress + '/user/' + owner;
    return this.http.get<any>(url, { observe: 'response' })
    .subscribe(resp => {
      var owner = new User(resp.body.name, resp.body.email, [], [], []);
      chat.owner = owner;
      this.getMessagesOnLogin(chat);
    })
  }

  getMessagesOnLogin(chat:Chat){
    const url = currentBEaddress + '/message';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body',
      params: new HttpParams().set('email', this.profileService.currentUser.email)
      .set('owner', chat.owner.email)
      .set('chatName', chat.name)
    };
    return this.http.get<any>(url, httpOptions)
    .subscribe(resp => {
      var messages = resp.body.obj;
      for (var i = 0; i < messages.length; i++){
        var message = new Message(messages[i].text, messages[i].time, messages[i].user, chat.name);
        chat.messages.push(message);
      }
      chat.messages.sort(function(a,b){
        return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);
      });
      this.createChat(chat);
    })

  }

  addTodosToChat(todos: Todo[]){
    for(var i=0; i<todos.length; i++){
      for(var j=0; j<this.tabs.length; j++){
        if(todos[i].chat)
      }
    }
  }
}
