import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import * as io from 'socket.io-client';

import { HttpClient } from '@angular/common/http';
import { HttpResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { ProfileService } from '../profile/profile.service';

import { User } from '../auth/user.model';
import { Message } from './message.model';
import { Chat } from './chat.model';

var currentBEaddress = "http://localhost:3000";

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';
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
    this.socket.on('created-chat-room', (chat) => {
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

  getSelectedChat(){
    for(var i=0; i<this.tabs.length; i++){
      if(this.tabs[i].name == this.selectedGroup){
        return this.tabs[i];
      }
    }
    return new Chat("", null, [], false, []);
  }

  /*getChatsOnLogin(user:User){
    let params = '';
    let options = new RequestOptions({
      search: new URLSearchParams('email='+user.email)
    })
    const url = currentBEaddress + '/chat';
    this.http.get(url, options)
    .map((response: Response) => {
      this.tabs = response.json().obj;
      for(var i=0; i<this.tabs.length; i++){
        this.profileService.currentUser.chatNames.push(this.tabs[i].name);
        this.selectContact(this.tabs[i].name, this.tabs[i].isGroup);
        this.openGroups.push(this.tabs[i].name);
      }

      // set to open groups, to tabs or to both //*should work
    })
  }

  getMessagesOnLogin(chat:Chat, user:User){
    var transformedMessages: Message[];
    let params = '';
    let options = new RequestOptions({
      search: new URLSearchParams('email=' + user.name +'/chatName=' + chat.name + '/owner=' + chat.owner.name)
    });
    const url = currentBEaddress + '/message';
    this.http.get(url, options)
    .map((response: Response) => {
      var messages = response.json().obj;

      for(var i=0; i<messages.length; i++){
        var newMessage = new Message(
          messages[i].text,
          messages[i].time,
          messages[i].user,
          messages[i].chat.name
        )
        transformedMessages.push(newMessage);
        //sort by time
        transformedMessages = transformedMessages.sort(function (a, b) { return a.time - b.time });
        //add targetted user //*later
      }
    })
    return transformedMessages;
  }*/
}
