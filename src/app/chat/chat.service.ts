import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { Message } from './message.model';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  selectedGroup: string = "";
  openGroups: string[] = [];
  private socketMap: Map<string, any> = new Map();

  selectGroup(groupname){
    this.selectedGroup = groupname;
  }

  selectContact(groupname){
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
    this.selectedGroup = groupname;
  }

  connect(groupname){
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

  getMessages(groupname) {
    if(this.socketMap.get(groupname)){
      let observable = new Observable(observer => {
        this.socketMap.get(groupname).on('message', (data) => {
          observer.next(data);
        });
        return () => {
          this.socketMap.get(groupname).disconnect();
        }
      })
      return observable;
    }
  }
}
