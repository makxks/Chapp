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

  addNewContactOccurred = new EventEmitter<User>();
  removeContactOccurred = new EventEmitter<User>();

	contactGroups: string[] = [];

	contactUsers: string[] = [];

  constructor(private profileService: ProfileService, private chatService: ChatService, private notificationService: NotificationService){}

  connectToOverall(){
    this.socket.on('received', (notification) => {
      if(notification.receiver.name == this.profileService.currentUser.name || notification.sender.name == this.profileService.currentUser.name){
        this.acceptNotification(notification);
      }
    })
  }

  emitAccept(notification: Notification){
    this.socket.emit('accepted-invite', notification);
  }

  acceptNotification(notification: Notification){
    //this will be done when the user accepts a contact request
    // instead of this, emit a function to the sender and the receiver so both can use this function to add the other user to their contacts
    console.log(this.profileService.currentUser.email == notification.receiver.email);
    console.log(this.profileService.currentUser.email == notification.sender.email);
    console.log(this.profileService.currentUser.email);
    console.log(notification.receiver.email);
    if(this.profileService.currentUser.email == notification.sender.email){
      console.log("reached sender part");
      if(!this.profileService.currentUser.contactNames.includes(notification.receiver.name)){
        this.contactUsers.push(notification.receiver.name);
        console.log(this.contactUsers);
        this.profileService.currentUser.contactNames.push(notification.receiver.name);
        var chat = new Chat(notification.receiver.name, notification.sender, [notification.receiver, this.profileService.currentUser]);
        console.log(chat);
        this.chatService.createChat(chat);
      }
    }
    else if(this.profileService.currentUser.email == notification.receiver.email){
      console.log("reached receiver part");
      if(!this.profileService.currentUser.contactNames.includes(notification.sender.name)){
        this.contactUsers.push(notification.sender.name);
        console.log(this.contactUsers);
        this.profileService.currentUser.contactNames.push(notification.sender.name);
      }
    }
  }

  declineContactRequest(user: User){

  }

  handleAddContact(){
    this.addNewContactOccurred.emit();
  }

  removeContact(user: User){

  }

  handleRemove(user: User){
    this.removeContactOccurred.emit(user);
  }
}
