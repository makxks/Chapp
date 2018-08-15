import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChatService } from './chat.service';

import { Message } from './message.model';

@Component({
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: [String('./chat.component.sass')]
})

export class ChatComponent implements OnInit, OnDestroy {
  @Input() groupname: string;
  //@HostListener('window:keydown', ['$event']);
  messages = [];
  connection;
  message: string = '';
  selected: boolean = false;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
  }

  sendMessage() {
    if(this.message!='')
    {
      this.chatService.sendMessage(new Message(
        this.message,
        new Date().getTime(),
        'Max',
        this.groupname)
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
    this.chatService.connect(this.groupname);
    this.messages = [];

    this.connection = this.chatService.getMessages(this.groupname).subscribe((message: Message) => {
      let newMessage = new Message(message.text, message.time, message.user, message.groupname);
      this.messages.push(newMessage);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
