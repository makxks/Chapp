import { Component, OnInit } from '@angular/core';

import { ChatService } from '../chat.service';

import { Chat } from '../chat.model';

@Component ({
	selector: 'edit-group-chat',
	templateUrl: './edit-group-chat.component.html',
	styleUrls: [String('./edit-group-chat.component.sass')]
})

export class EditGroupChatComponent implements OnInit {
  display = 'none';

  constructor(private chatService: ChatService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  onEditAccepted(chat: Chat) {
    /*this.chatService.editGroup(chat)
      .subscribe(
        (result: any) => {
					console.log(result);
				});
		this.display = 'none';*/
	}

	ngOnInit(){
    this.chatService.editGroupOccurred
      .subscribe(
        (result: any) => {
					this.display = 'block';
        });
	}
}
