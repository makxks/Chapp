import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { Message } from './message.model';
import { Chat } from './chat.model';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';
  private socket: any;
  selectedGroup: string = "";
  openGroups: string[] = [];
  private socketMap: Map<string, any> = new Map();
  private newMessageMap: Map<string, number> = new Map();
  createGroupOccurred = new EventEmitter<Chat>();
  editGroupOccurred = new EventEmitter<Chat>();
  deleteGroupOccurred = new EventEmitter<Chat>();

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
    if(this.socketMap.get(message.groupname)){
      this.socketMap.get(message.groupname).emit('add-message', {
        message: message.text,
        groupname: message.groupname,
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

  createGroup(chat: Chat){

  }

  handleCreate(chat: Chat){
    this.createGroupOccurred.emit(chat);
  }

  editGroup(chat: Chat){

  }

  handleEdit(chat: Chat){
    this.editGroupOccurred.emit(chat);
  }

  deleteGroup(chat: Chat){

  }

  handleDelete(chat: Chat){
    this.deleteGroupOccurred.emit(chat);
  }
}
