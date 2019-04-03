import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { ProfileService } from '../profile/profile.service';

import { Message } from './message.model';
import { Chat } from './chat.model';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';
  socket: SocketIOClient.Socket = io();
  
  selectedGroup: string = "";
  openGroups: string[] = [];
  tabs: Chat[] = [];

  private socketMap: Map<string, any> = new Map();
  private newMessageMap: Map<string, number> = new Map();

  createGroupOccurred = new EventEmitter<Chat>();
  editGroupOccurred = new EventEmitter<Chat>();
  deleteGroupOccurred = new EventEmitter<Chat>();

  constructor(private profileService: ProfileService){}

  connectToOverall(){
    this.socket.on('created-chat-room', (chat) => {
      for(var i=0; i<chat.users.length; i++){
        if(chat.users[i].name == this.profileService.currentUser.name){
          if(!this.profileService.currentUser.chats.includes(chat)){
            this.tabs.push(chat);
            this.selectContact(chat.name);
            console.log(this.tabs);
            chat.users[i].chats.push(chat.name);
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

  selectContact(groupname: string){
    var found = false;
    var group: string;
    for(group of this.openGroups){
      if(groupname == group){
        found = true;
        break;
      }
    }
    if(!found){
      this.openGroups.push(groupname);
    }
    this.selectGroup(groupname);
    this.newMessageMap.set(groupname, 0);
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
    this.socketMap.set(groupname, io(this.url + "/?" + groupname));
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
          var messageNumber;
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
}
