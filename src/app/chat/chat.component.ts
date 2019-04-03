import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChatService } from './chat.service';
import { ProfileService } from '../profile/profile.service';

import { Message } from './message.model';
import { User } from '../auth/user.model';
import { Chat } from './chat.model';

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: [String('./chat.component.sass')]
})

export class ChatComponent implements OnInit, OnDestroy {
  @Input() chat: Chat;
  //@HostListener('window:keydown', ['$event']);
  messages: Message[] = [];
  users: string[] = [];
  connection: any;
  message: string = '';
  selected: boolean = false;

  constructor(private chatService: ChatService, private route: ActivatedRoute, private profileService: ProfileService) {
  }

  sendMessage() {
    if(this.message!='')
    {
      this.chatService.sendMessage(new Message(
        this.message,
        new Date().getTime(),
        this.profileService.currentUser.name,
        this.chat.name)
      );
    }
    this.message = '';
  }

  sendMessageByKey(/*$event*/) {
    /*if(event.keyCode==13){
      if(event.shiftKey){
        this.sendMessage();
        event.preventDefault();
      }
    }*/
  }

  ngOnInit() {
    for(var i=0; i<this.chat.users.length; i++){
      this.users.push(this.chat.users[i].name);
    }
    if(this.users.includes(this.profileService.currentUser.name)){
      this.chatService.connect(this.chat.name);
      this.messages = [];

      this.connection = this.chatService.getMessages(this.chat.name).subscribe((message: Message) => {
        let newMessage = new Message(message.text, message.time, message.user, message.chat);
        this.messages.push(newMessage);
      })
    }
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
