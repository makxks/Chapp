import { Component, Input } from '@angular/core';

import { ChatService } from '../../chat/chat.service';

@Component ({
	selector: 'tab-component',
	templateUrl: './tab.component.html',
	styleUrls: [String('./tab.component.sass')]
})

export class TabComponent {
  @Input() groupname: string;
	constructor(private chatService: ChatService){}

	changeGroup(){
		this.chatService.selectGroup(this.groupname);
	}

	closeTab(){
		this.chatService.closeGroup(this.groupname);
	}
}
