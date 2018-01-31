import { Component, OnInit } from '@angular/core';

import { ChatService } from '../chat.service';

import { Chat } from '../chat.model';

@Component ({
	selector: 'create-group-chat',
	templateUrl: './create-group-chat.component.html',
	styleUrls: [String('./create-group-chat.component.sass')]
})

export class CreateGroupChatComponent implements OnInit {
  display = 'none';

  constructor(private chatService: ChatService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  onCreateAccepted(chat: Chat) {
    /*this.chatService.createGroup(chat)
      .subscribe(
        (result: any) => {
					console.log(result);
				});
		this.display = 'none';*/
	}

	ngOnInit(){
    this.chatService.createGroupOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
				});
	}
}
