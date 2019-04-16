import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { Notification } from './notification.model';
import { User } from '../auth/user.model';
import { Chat } from '../chat/chat.model';

import { ProfileService } from '../profile/profile.service';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class NotificationService {
  private url = 'http://localhost:3000';
  socket: SocketIOClient.Socket = io();

  showing: boolean = false;

  notifications: Notification[] = [];

  groupNotifications: Notification[] = [];

  constructor(private profileService: ProfileService, private chatService: ChatService){}

  connectToOverall(){
    this.socket.on('send-invite', (notification) => {
      if(notification.receiver.name == this.profileService.currentUser.name){
        this.notifications.push(notification);
      }
    })

    this.socket.on('send-group-invite', (notification) => {
      if(notification.receiver.name == this.profileService.currentUser.name){
        this.groupNotifications.push(notification);
      }
    })
  }

  addNewContact(user: User){
    //send a contact request
    var notification = this.createNotification(this.profileService.currentUser, user, null, false, "");
    this.socket.emit('invite-created', notification);
    //this will send a notification to the requested user
    //they can accept or decline
  }

  addNewGroup(users: User[], groupName: string){
    for(var i=0; i<users.length; i++){
      var newChat = new Chat(groupName, this.profileService.currentUser, [this.profileService.currentUser], true, []);
      var notification = this.createNotification(this.profileService.currentUser, users[i], newChat, true, groupName);
      this.chatService.createChat(newChat);
      this.socket.emit('group-invite-created', notification);
    }
  }

  editGroup(groupName: string, newUsers: User[]){
    for(var i=0; i<newUsers.length; i++){
      var newChat = new Chat(groupName, this.profileService.currentUser, [this.profileService.currentUser], true, []);
      var notification = this.createNotification(this.profileService.currentUser, newUsers[i], newChat, true, groupName);
      this.chatService.createChat(newChat);
      this.socket.emit('group-invite-created', notification);
    }
  }

  addNotification(notification: Notification){
    this.notifications.push(notification);
  }

  clearNotification(notification: Notification){
    var foundNotification = this.notifications.findIndex(function(element) {
      return (element.timeSent == notification.timeSent);
    });
    this.notifications.splice(foundNotification,1);
    if(this.notifications.length == 0){
      this.hide();
    }
  }

  agreeToNotification(notification: Notification){
    var foundNotification = this.notifications.findIndex(function(element) {
      return (element.timeSent == notification.timeSent);
    });

    this.notifications.splice(foundNotification,1);
    if(this.notifications.length == 0){
      this.hide();
    }
  }

  agreeToGroupNotification(notification: Notification){
    var foundNotification = this.groupNotifications.findIndex(function(element) {
      return (element.timeSent == notification.timeSent);
    });

    this.groupNotifications.splice(foundNotification,1);
    if(this.groupNotifications.length == 0){
      this.hide();
    }
  }

  createNotification(sender, receiver, chat, isGroup, groupName){
    return new Notification(sender, receiver, chat, isGroup, groupName);
  }

  showHide(){
    this.showing = !this.showing;
  }

  hide(){
    this.showing = false;
  }

}
