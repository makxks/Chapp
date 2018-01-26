import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChatService } from '../chat.service';

import { Chat } from '../chat.model';

@Component ({
	selector: 'delete-group-chat',
	templateUrl: './delete-group-chat.component.html',
	styleUrls: [String('./delete-group-chat.component.sass')]
})

export class DeleteGroupChatComponent implements OnInit {
  display = 'none';

  constructor(private chatService: ChatService) {
  }

  modalCancelled() {
		this.display = 'none';
	}

  onDeleteAccepted(chat: Chat) {
    /*this.chatService.deleteGroup(chat)
      .subscribe(
        (result: any) => {
					console.log(result);
				});
		this.display = 'none';*/
	}

	ngOnInit(){
    this.chatService.deleteGroupOccurred
      .subscribe(
        (result: any) => {
          this.display = 'block';
        });
	}
}
