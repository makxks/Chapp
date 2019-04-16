import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { User } from '../../auth/user.model';
import { Chat } from '../../chat/chat.model';
import { Notification } from '../../notifications/notification.model';

import { ProfileService } from '../../profile/profile.service';
import { NotificationService } from '../../notifications/notification.service';
import { ChatService } from '../../chat/chat.service';

@Injectable()
export class ContactService {
  private url = 'http://localhost:3000';
  socket: SocketIOClient.Socket = io();

  addNewContactOccurred = new EventEmitter<void>();
  removeContactOccurred = new EventEmitter<User>();
  addGroupOccurred = new EventEmitter<void>();
  leaveGroupOccurred = new EventEmitter<Chat>();

	contactGroups: string[] = [];

	contactUsers: User[] = [];

  constructor(private profileService: ProfileService, private chatService: ChatService, private notificationService: NotificationService){}

  connectToOverall(){
    this.socket.on('received', (notification) => {
      if(notification.receiver.name == this.profileService.currentUser.name || notification.sender.name == this.profileService.currentUser.name){
        this.acceptNotification(notification);
      }
    });

    this.socket.on('received-group', (notification) => {
      if(notification.receiver.name == this.profileService.currentUser.name){
        this.acceptGroupNotification(notification);
      }

      if(notification.isGroup && notification.chat){
        for(var i=0; i<this.chatService.tabs.length; i++){
          if(this.chatService.tabs[i].name == notification.chat.name
            && this.chatService.tabs[i].owner.email == notification.chat.owner.email){
              this.chatService.tabs[i].users.push(notification.receiver);
            }
        }
      }
    })

    this.socket.on('remove-contact-from-list', (users) => {
      if(users.remove.name == this.profileService.currentUser.name){
        for(var i=0; i<this.contactUsers.length; i++){
          if(this.contactUsers[i].name == users.sender.name){
            this.contactUsers.splice(i,1);
          }
        }
        for(var i=0; i<this.profileService.currentUser.contactNames.length; i++){
          if(this.profileService.currentUser.contactNames[i] == users.sender.name){
            this.profileService.currentUser.contactNames.splice(i,1);
          }
        }

        for(var i=0; i<this.chatService.tabs.length; i++){
          if(
            (this.chatService.tabs[i].name == users.sender.name + " and " + users.remove.name && this.chatService.tabs[i].owner.name == users.remove.name)||
            (this.chatService.tabs[i].name == users.remove.name + " and " + users.sender.name && this.chatService.tabs[i].owner.name == users.remove.name)||
            (this.chatService.tabs[i].name == users.sender.name + " and " + users.remove.name && this.chatService.tabs[i].owner.name == users.sender.name)||
            (this.chatService.tabs[i].name == users.remove.name + " and " + users.sender.name && this.chatService.tabs[i].owner.name == users.sender.name)){
            this.chatService.tabs.splice(i,1);
            this.chatService.openGroups.splice(i,1);
          }
        }
      }
      else if(users.sender.name == this.profileService.currentUser.name){
        for(var i=0; i<this.contactUsers.length; i++){
          if(this.contactUsers[i].name == users.remove.name){
            this.contactUsers.splice(i,1);
          }
        }
        for(var i=0; i<this.profileService.currentUser.contactNames.length; i++){
          if(this.profileService.currentUser.contactNames[i] == users.remove.name){
            this.profileService.currentUser.contactNames.splice(i,1);
          }
        }

        for(var i=0; i<this.chatService.tabs.length; i++){
          if(
            (this.chatService.tabs[i].name == users.sender.name + " and " + users.remove.name && this.chatService.tabs[i].owner.name == users.remove.name)||
            (this.chatService.tabs[i].name == users.remove.name + " and " + users.sender.name && this.chatService.tabs[i].owner.name == users.remove.name)||
            (this.chatService.tabs[i].name == users.sender.name + " and " + users.remove.name && this.chatService.tabs[i].owner.name == users.sender.name)||
            (this.chatService.tabs[i].name == users.remove.name + " and " + users.sender.name && this.chatService.tabs[i].owner.name == users.sender.name)){
            this.chatService.tabs.splice(i,1);
            this.chatService.openGroups.splice(i,1);
          }
        }
      }
    })

    this.socket.on('group-edited', (group, newGroupName) => {
      for(var i=0; i<this.chatService.tabs.length; i++){
        if(this.chatService.tabs[i].name == group.name
          && this.chatService.tabs[i].owner.email == group.owner.email){
            var chat = this.chatService.tabs[i];
            this.chatService.tabs.splice(i,1);
            chat.name = newGroupName;
            this.chatService.tabs.push(chat);
          }
      }

      for(var i=0; i<this.chatService.openGroups.length; i++){
        if(this.chatService.openGroups[i] == group.name){
          this.chatService.openGroups.splice(i,1);
          if(!this.chatService.openGroups.includes(newGroupName)){
            this.chatService.selectContact(newGroupName, true);
          }
        }
      }

      for(var i=0; i<this.contactGroups.length; i++){
        if(this.contactGroups[i] == group.name){
            this.contactGroups[i] = newGroupName;
          }
      }

      for(var i=0; i<this.profileService.currentUser.chatNames.length; i++){
        if(this.profileService.currentUser.chatNames == group.name){
          this.profileService.currentUser.chatNames = newGroupName;
        }
      }
    })
  }

  emitAccept(notification: Notification){
    this.socket.emit('accepted-invite', notification);
  }

  emitGroupAccept(notification: Notification){
    this.socket.emit('accepted-group-invite', notification);
  }

  emitRemoveContact(users: any){
    this.socket.emit('remove-contact', users);
  }

  emitEditGroup(group: Chat, newGroupName: string){
    this.socket.emit('edit-group', group, newGroupName);
  }

  acceptNotification(notification: Notification){
    if(this.profileService.currentUser.email == notification.sender.email){
      if(!this.profileService.currentUser.contactNames.includes(notification.receiver.name)){
        this.contactUsers.push(notification.receiver);
        this.profileService.currentUser.contactNames.push(notification.receiver.name);
        var chat = new Chat(notification.receiver.name + " and " + this.profileService.currentUser.name, notification.sender, [notification.receiver, this.profileService.currentUser], notification.isGroup, []);
        this.chatService.createChat(chat);
      }
    }
    else if(this.profileService.currentUser.email == notification.receiver.email){
      if(!this.profileService.currentUser.contactNames.includes(notification.sender.name)){
        this.contactUsers.push(notification.sender);
        this.profileService.currentUser.contactNames.push(notification.sender.name);
      }
    }
  }

  acceptGroupNotification(notification: Notification){
    if(this.profileService.currentUser.email == notification.receiver.email){
      if(!this.profileService.currentUser.chatNames.includes(notification.chat.name)){
        this.contactGroups.push(notification.chat.name);
        notification.chat.users.push(this.profileService.currentUser);
        this.chatService.createChat(notification.chat);
      }
    }
  }

  addGroupToOwner(chatName: string){
    this.contactGroups.push(chatName);
  }

  handleAddContact(){
    this.addNewContactOccurred.emit();
  }

  handleRemove(user: User){
    this.removeContactOccurred.emit(user);
  }

  handleAddGroup(){
    this.addGroupOccurred.emit();
  }

  handleLeaveGroup(group: Chat){
    this.leaveGroupOccurred.emit(group);
  }
}
