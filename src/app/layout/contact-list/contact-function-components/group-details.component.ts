import { Component, Input, OnInit } from '@angular/core';

import { User } from '../../../auth/user.model';
import { Chat } from '../../../chat/chat.model';

import { ChatService } from '../../../chat/chat.service';

@Component ({
	selector: 'group-details',
	templateUrl: './group-details.component.html',
	styleUrls: [String('./group-details.component.sass')]
})

export class GroupDetailsComponent implements OnInit {
  chat: Chat = new Chat("",null,[],false,[]);

  display = 'none';

  constructor(private chatService: ChatService){}

	modalCancelled(){
		this.display = 'none';
	}

	editGroup(chat: Chat){
		this.display = "none";
		this.chatService.handleEdit(chat);
	}

	ngOnInit() {
		this.chatService.showGroupDetailsOccurred
      .subscribe(
				(result: any) => {
					this.display = 'block';
					this.chat = result;
					//also do on back end
				});
		}
}
