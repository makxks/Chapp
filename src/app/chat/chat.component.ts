import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChatService } from './chat.service';

import { Message } from './message.model';

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: [String('./chat.component.sass')]
})

export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message: string = '';
  selected: boolean = false;
  @Input() groupname: string;
  @HostListener('window:keydown', ['$event'])

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
  }

  sendMessage() {
    if(this.message!='')
    {
      this.chatService.sendMessage({
        text: this.message,
        groupname: this.groupname,
        time: new Date().getTime(),
        user: 'Max'
      });
    }
    this.message = '';
  }

  sendMessageByKey($event) {
    if(event.keyCode==13){
      this.sendMessage();
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.chatService.connect(this.groupname);
    this.messages = [];

    this.connection = this.chatService.getMessages(this.groupname).subscribe(message => {
      let newMessage = new Message(message.text, message.time, message.user, message.groupname);
      this.messages.push(newMessage);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
