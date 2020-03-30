import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as io from 'socket.io-client';

import { HttpClient } from '@angular/common/http';
import { HttpResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { Notification } from './notification.model';
import { User } from '../auth/user.model';
import { Chat } from '../chat/chat.model';

import { ProfileService } from '../profile/profile.service';
import { ChatService } from '../chat/chat.service';

var currentBEaddress = "http://localhost:3000";

@Injectable()
export class NotificationService {
  //private url = 'http://localhost:3000';
  socket: SocketIOClient.Socket = io.connect();

  showing: boolean = false;

  notifications: Notification[] = [];

  groupNotifications: Notification[] = [];

  constructor(private profileService: ProfileService, private chatService: ChatService, private http: HttpClient){}

  connectToOverall(){
    this.socket.on('send-invite', (notification) => {
      if(notification.receiverEmail == this.profileService.currentUser.email){
        this.notifications.push(notification);
      }
    })

    this.socket.on('send-group-invite', (notification) => {
      if(notification.receiverEmail == this.profileService.currentUser.email){
        this.groupNotifications.push(notification);
      }
    })

    this.socket.on('todo-notification-received', (notification) => {
      if(notification.receiverEmail == this.profileService.currentUser.email){
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
    this.sendNotification(user, notification);
  }

  addNewGroup(users: User[], groupName: string){
    for(var i=0; i<users.length; i++){
      var newChat = new Chat(groupName, this.profileService.currentUser, [this.profileService.currentUser], true, [], "");
      var notification = this.createNotification(this.profileService.currentUser, users[i], newChat, true, groupName);
      this.chatService.addNewChat(newChat);
      this.chatService.createChat(newChat);
      this.socket.emit('group-invite-created', notification);
      this.sendNotification(users[i], notification);
    }
  }

  editGroup(groupName: string, newUsers: User[]){
    for(var i=0; i<newUsers.length; i++){
      var newChat = new Chat(groupName, this.profileService.currentUser, [this.profileService.currentUser], true, [], "");
      var notification = this.createNotification(this.profileService.currentUser, newUsers[i], newChat, true, groupName);
      this.chatService.createChat(newChat);
      this.socket.emit('group-invite-created', notification);
      this.sendNotification(newUsers[i], notification);
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

    this.deleteNotification(notification);
  }

  agreeToNotification(notification: Notification){
    var foundNotification = this.notifications.findIndex(function(element) {
      return (element.timeSent == notification.timeSent);
    });

    this.notifications.splice(foundNotification,1);
    if(this.notifications.length == 0){
      this.hide();
    }

    this.deleteNotification(notification);
  }

  agreeToGroupNotification(notification: Notification){
    var foundNotification = this.groupNotifications.findIndex(function(element) {
      return (element.timeSent == notification.timeSent);
    });

    this.groupNotifications.splice(foundNotification,1);
    if(this.groupNotifications.length == 0){
      this.hide();
    }

    this.deleteNotification(notification);
  }

  createNotification(sender, receiver, chat, isGroup, groupName){
    return new Notification(sender, receiver, chat, isGroup, groupName);
  }

  deleteTaskNotification(notification: Notification){
    var foundNotification = this.notifications.findIndex(function(element) {
      return(element.timeSent == notification.timeSent);
    })

    this.notifications.splice(foundNotification,1);
    if(this.notifications.length == 0){
      this.hide();
    }
  }

  showHide(){
    this.showing = !this.showing;
  }

  hide(){
    this.showing = false;
  }

  getNotificationsOnLogin(user: User){
    //get notifications for user
    const url = currentBEaddress + '/notification/' + user.email;
    return this.http.get<any>(url, { observe: 'response' })
    .subscribe(resp => {
      var notifications = resp.body.obj;
      console.log(resp);
      for(var i=0; i<notifications.length; i++){
        if(notifications[i].isGroup){
          this.groupNotifications.push(notifications[i]);
        }
        else{
          this.notifications.push(notifications[i]);
        }
      }
    });
  }

  sendNotification(user: User, notification: Notification){
    const url = currentBEaddress + '/notification/' + user.email;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, notification, httpOptions)
    .subscribe(resp => {
      console.log("created a notification " + resp);
    })
  }

  deleteNotification(notification: Notification){
    const url = currentBEaddress + '/notification/' + notification.receiver.email + "/" + notification.sender.email + "/" + notification.timeSent;
    return this.http.delete<any>(url)
    .subscribe(resp => {
      console.log("deleted a notification " + resp);
    })
  }

}
