import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { Notification } from './notification.model';
import { User } from '../auth/user.model';

import { ProfileService } from '../profile/profile.service';

@Injectable()
export class NotificationService {
  private url = 'http://localhost:3000';
  socket: SocketIOClient.Socket = io();

  showing: boolean = false;

  notifications: Notification[] = [];

  constructor(private profileService: ProfileService){}

  connectToOverall(){
    this.socket.on('send-invite', (notification) => {
      if(notification.receiver.name == this.profileService.currentUser.name){
        this.notifications.push(notification);
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

  addNotification(notification: Notification){
    this.notifications.push(notification);
  }

  clearNotification(notification: Notification){
    var foundNotification = this.notifications.findIndex(function(element) {
      return (element.timeSent == notification.timeSent);
    });
    this.notifications.splice(foundNotification);
  }

  agreeToNotification(notification: Notification){
    var foundNotification = this.notifications.findIndex(function(element) {
      return (element.timeSent == notification.timeSent);
    });

    this.notifications.splice(foundNotification);
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
