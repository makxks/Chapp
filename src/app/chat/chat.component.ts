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
  message: string;
  selected: boolean = false;
  @Input() groupname: string;

  constructor(private chatService: ChatService, private route: ActivatedRoute) {
  }

  sendMessage() {
    this.chatService.sendMessage({
      text: this.message,
      groupname: this.groupname,
      time: new Date().getTime(),
      user: 'Max'
    });
    this.message = '';
  }

  ngOnInit() {
    this.chatService.connect(this.groupname);
    this.messages = [];

    this.connection = this.chatService.getMessages(this.groupname).subscribe(message => {
      //message.time = new Date(message.time);
      this.messages.push(message);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
